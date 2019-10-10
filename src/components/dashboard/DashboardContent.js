import React from 'react'
import { connect } from 'react-redux'

import './DashboardContent.sass'
import stepsData from 'data/steps'
import loadingImage from 'assets/images/loading-colors.gif'

function DashboardContent({ isProcessing, selectedAddress }) { // Object destructuring in props makes accessing props more concise

  const showOverlay = isProcessing || !selectedAddress.timestamp

  return (
    <div data-sscope="dashcon">

      {/* Here we're going to map over the steps in `steps.js`. That data file *must* be considered
          the source of truth for content-related items in the code. That's why we're using it to map over and create
          elements from.

          Also, you'll notice in `step.js` that we added `spanningContent` property to the step that we want to span
          over 2 rows. This way, we don't have to hardcode a certain ID that should span, but keep it centralized in
          the data file (keeping it the source-of-truth as stated above). */}
      {stepsData.map(step => (
        <div key={step.title} className={`grid-item ${step.spanningContent ? 'spanning' : ''}`}>

          {/* This (conditional) element will be the overlay that either shows a static overlay or loading view. */}
          {( showOverlay
            ? <div className={`content-overlay ${isProcessing ? 'is-processing' : ''}`}>
                <img className='logo' src={step.logo} alt=""/>
                <img className='loading' src={loadingImage} alt=""/>
              </div>
            : null
          )}

          {/* This will be the header on top of every content item. The header doesn't need to be a part of the
              custom components so we put it here instead. */}
          <header className="item-header">
            <div className="logo">
              <img src={step.logo} alt=""/>
            </div>
            <div className="content">
              <div className="title">{step.title}</div>
              <div className="description">{step.description}</div>
            </div>
          </header>

          { step.component ? step.component : null }
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isProcessing: state.dashboard.isProcessing,
    selectedAddress: state.dashboard.selectedAddress
  }
}

export default connect(mapStateToProps)(DashboardContent)
