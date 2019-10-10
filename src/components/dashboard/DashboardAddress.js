import React, { useState } from 'react'
import { connect } from 'react-redux'
import PlacesAutocomplete from 'react-places-autocomplete'

import { processAddress } from 'redux/actions'
import './DashboardAddress.sass'

function DashboardAddress({ dispatch }) {

  const [addressInput, setAddressInput] = useState('')

  const handleSelect = async (selected) => {
    dispatch(processAddress(selected))
  }

  return (
      <div data-sscope='dashadd'>

        {/* Here we're about to use the `PlacesAutocomplete` component to quickly get suggestions from our
            fuzzy search input, and then send the chosen address off to Redux action creators to come back
            with data for the selected location. */}
        <PlacesAutocomplete
          onChange={(e) => setAddressInput(e)}
          value={addressInput}
          onSelect={(e) => handleSelect(e)}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div className='search-container'>
              <input
                {...getInputProps({
                  placeholder: 'Search places ...',
                  className: 'address-input'
                })}
              />
              <div className="suggestions-dropdown">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item active' : 'suggestion-item'
                  const style = (suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  )
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
  )
}

export default connect()(DashboardAddress)
