import React from 'react'
import { connect } from 'react-redux'

function DcSunriseSunset(props) {
  if (!props.sunriseSunset) {
    return null
  }

  return (
    <div data-sscope='dcsunsun'>
      <div className="title">Sunrise</div>
      <div className="value" style={{marginBottom: '30px'}}>{ props.sunriseSunset.sunrise }</div>
      <div className="title">Sunset</div>
      <div className="value">{ props.sunriseSunset.sunset }</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sunriseSunset: state.dashboard.selectedAddress.sunriseSunset
  }
}

export default connect(mapStateToProps)(DcSunriseSunset);
