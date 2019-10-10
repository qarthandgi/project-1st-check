import React from 'react'
import { connect } from 'react-redux'

function DcStreetView(props) {

  if (!props.historicSite) {
    return null
  }

  const isHistoricSite = (props.historicSite.length > 0
    ? 'Extremely likely that this location is a federally-recognized historical site.'
    : 'No locations found indiciating that this would be a historical site.')

  return (
    <div data-sscope='dchistoric'>
      {isHistoricSite}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    historicSite: state.dashboard.selectedAddress.historicSite
  }
}

export default connect(mapStateToProps)(DcStreetView);
