import * as services from 'services'

// This action carries a type to indicate that the processing of the address is to commence.
// This is useful for a loading state in the dashboard.
function startAddressComputation() {
  return {
    type: 'ADDRESS_PROCESSING'
  }
}

function finishAddressComputation(processedAddress) {
  return {
    type: 'ADDRESS_PROCESSED',
    payload: {
      processedAddress: { ...processedAddress, timestamp: Date.now() }
    }
  }
}

export function processAddress(addressInput) {
  return async (dispatch) => {
    dispatch(startAddressComputation())

    // We're actually going to `await` on this service because other services
    // require the geocoded object that we're getting back. The rest don't need to
    // be awaited and will be resolved in the `Promise.all`
    const geocodedPromise = await services.getGeocodedObject(addressInput)
    const staticStreetViewPromise = services.getStaticStreetView(geocodedPromise)
    const historicSitePromise = services.getHistoricSite(geocodedPromise)
    const airQualityPromise = services.getAirQuality(geocodedPromise)
    const sunriseSunsetPromise = services.getSunriseSunset(geocodedPromise)

    // Again, we'll wait for all promises to finish before continuing.
    const resolvedAddress = await Promise.all([
      geocodedPromise,
      staticStreetViewPromise,
      historicSitePromise,
      airQualityPromise,
      sunriseSunsetPromise
    ])

    // Here we'll wrap up all the processed data into object that can be made into an action to be sent to a reducer
    const reducedAddress = resolvedAddress.reduce((acc, obj) => {
      return {...acc, ...obj}
    }, {})

    dispatch(finishAddressComputation(reducedAddress))
  }
}
