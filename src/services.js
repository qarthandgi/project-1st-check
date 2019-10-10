import { geocodeByAddress } from 'react-places-autocomplete'
import axios from 'axios'
import Fuse from 'fuse.js'

import addressData from 'data/addresses'

/*
Niles' Notes on this file

- My intention here is to have a `services` file that does the heavy lifting of finding the data for the Redux
  action creators.
- Anything that deals wtih API calls, or fuzzy searching, or geocoding should be handled in this file
- Any API keys that you see laying around are here for simplicity and aren't tied to any project/system that could be
  compromised.

- A note on the API library. I've decided to use `axios`. It's by FAR my favorite API library and one I always turn to,
  even opposed to the standardized `fetch`. One of the BIGGEST shortcomings of `fetch` is that you can not pass in
  params via an object, which I believe should be included.
*/

// This service is meant to grab the address object from the google maps api which will have all the components
// of the address that we need to build out any other API call.
export function getGeocodedObject(addressInput) {
  return new Promise(async (resolve) => {
    const obj = {geocoded: await geocodeByAddress(addressInput)}
    return resolve(obj)
  })
}

// This service will grab a current street view screenshot for the provided address.
export function getStaticStreetView(geocodedAddress) {
  return new Promise(async (resolve) => {

    // Note here that I'm requesting back a `blob` (only available on browser, not a server), so that I can easily
    // turn it into an image url via the `createObjectURL` method.
    const resp = await axios.get('https://maps.googleapis.com/maps/api/streetview', {
      params: {
        location: geocodedAddress.geocoded[0].formatted_address,
        size: '350x260',
        key: 'AIzaSyB2wE8JSp2DZ6jakbqBCJTImHQ359nvy78'
      },
      responseType: 'blob'
    })
    const imgUrl = window.URL.createObjectURL(resp.data)
    return resolve({streetView: imgUrl})
  })
}

// Here, I've included a subset of historically-recognized locations in the US. I'll be doing a fuzzy search on that
// list, using the searched address as the pattern. The parameters of the fuzzy search have been adjusted to weed
// out as many false postiives as possible.
export function getHistoricSite(geocodedAddress) {
  return new Promise(async (resolve) => {
    const [number, street] = geocodedAddress.geocoded[0].address_components
    const pattern = `${number.short_name} ${street.short_name}`

    const options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "address",
      ]
    };

    const fuse = new Fuse(addressData, options); // "list" is the item array
    const result = fuse.search(pattern);

    return resolve({historicSite: result})
  })
}

// Here, we're using the weatherbit API to get access to the air quality for the requested destination
export function getAirQuality(geocodedAddress) {
  return new Promise(async (resolve) => {

    const { location } = geocodedAddress.geocoded[0].geometry
    const lat = location.lat()
    const lng = location.lng()

    const airQualityUrl = 'https://api.weatherbit.io/v2.0/current/airquality'
    const resp = await axios.get(airQualityUrl, {
      params: {
        key: '21ffe57f8b8545cb9cd093507455ef54',
        lat,
        lon: lng
      }
    })
    return resolve({airQuality: resp.data.data[0].aqi})
  })
}

// This service will also use the weatherbit api to get the sunrise and sunset time
export function getSunriseSunset(geocodedAddress) {
  return new Promise(async (resolve) => {
    const { location } = geocodedAddress.geocoded[0].geometry
    const lat = location.lat()
    const lng = location.lng()

    const weatherUrl = 'https://api.weatherbit.io/v2.0/current'
    const resp = await axios.get(weatherUrl, {
      params: {
        key: '21ffe57f8b8545cb9cd093507455ef54',
        lat,
        lon: lng
      }
    })

    return resolve({sunriseSunset: {
      sunrise: resp.data.data[0].sunrise,
      sunset: resp.data.data[0].sunset
    }})

  })
}
