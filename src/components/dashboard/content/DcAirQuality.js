import React from 'react'
import { connect } from 'react-redux'

function DcAirQuality(props) {

  if (!props.airQuality) {
    return null
  }

  return (
    <div data-sscope='dcairq'>
      <div className="title">Air Quality (AQI)</div>
      <div className="value">{ props.airQuality }</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    airQuality: state.dashboard.selectedAddress.airQuality
  }
}

export default connect(mapStateToProps)(DcAirQuality);
