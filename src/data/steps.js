import React from 'react'

import AirQualityLogo from 'assets/images/steps/step-icon_air-quality.png'
import HistoricSiteLogo from 'assets/images/steps/step-icon_historic-site.svg'
import MapLogo from 'assets/images/steps/step-icon_map.png'
import SunriseSunsetLogo from 'assets/images/steps/step-icon_sunrise-sunset.png'
import StreetViewLogo from 'assets/images/steps/step-icon_street-view.png'


import DcAirQuality from 'components/dashboard/content/DcAirQuality'
import DcHistoricLocation from 'components/dashboard/content/DcHistoricLocation'
import DcMap from 'components/dashboard/content/DcMap'
import DcSunriseSunset from 'components/dashboard/content/DcSunriseSunset'
import DcStreetView from 'components/dashboard/content/DcStreetView'

/*
- As stated in a few other places, this file is THE source of truth for categories that are supported in the app.
- Everything from the intro features, to content grid on the main page, to the listing of those components are dictated
  by this file. Being able to also dynmically indicate the component that should be used here via JSX is a HUGE benefit.
*/
export default [
  {
    'id': 1,
    'title': 'Air Quality',
    'description': 'Instantly see the real-time air quality of the location for the safety of you and your team.',
    'logo': AirQualityLogo,
    'component': <DcAirQuality />
  },
  {
    'id': 2,
    'title': 'Historic Site Check',
    'description': 'Access a quick check to see if the provided address is a federally-recognized historic site.',
    'logo': HistoricSiteLogo,
    'component': <DcHistoricLocation />
  },
  {
    'id': 3,
    'title': 'Quick Map',
    'description': 'Quickly look at a map of the inquiring address and asses the terrain for your project.',
    'logo': MapLogo,
    'spanningContent': true,
    'component': <DcMap />
  },
  {
    'id': 4,
    'title': 'Sunrise & Sunet',
    'description': 'Quickly see the sunrise & sunset times for your prospecting location to better plan for your team.',
    'logo': SunriseSunsetLogo,
    'component': <DcSunriseSunset />
  },
  {
    'id': 5,
    'title': 'Street View Grab',
    'description': 'Quickly view a preview of the intended location for you and your team.',
    'logo': StreetViewLogo,
    'component': <DcStreetView />
  }
]
