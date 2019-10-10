import React from 'react'
import { connect } from 'react-redux'

function DcMap(props) {

  if (!props.geocoded) {
    return null
  }
  const location = props.geocoded[0].formatted_address
  const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB2wE8JSp2DZ6jakbqBCJTImHQ359nvy78&q=${location}`

  return (
    <div>
      {/* Redux sending the new address via the props on each selection will automatically cause the map to update.
          Again, the API key would never be stored here in actuality, just for simplicity sake right now.
      */}
      <iframe
        title='Google Maps Map'
        width="100%"
        height="100%"
        frameBorder="0" style={{border: '0'}}
        src={src}
        allowFullScreen
      ></iframe>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    geocoded: state.dashboard.selectedAddress.geocoded
  }
}

export default connect(mapStateToProps)(DcMap);
