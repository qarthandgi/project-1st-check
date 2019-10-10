import React from 'react'
import { connect } from 'react-redux'

function DcStreetView(props) {
  return (
    <div style={{textAlign: 'center', marginTop: '4px'}}>
      <img src={props.streetView} alt=""/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    streetView: state.dashboard.selectedAddress.streetView
  }
}

export default connect(mapStateToProps)(DcStreetView);
