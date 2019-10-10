import { combineReducers } from 'redux'

/*
- These reducers make the up the entire state of the React app. As the app grows, we should certainly
  be splitting out these reducers into their own files.

- Also, I included an `addressHistory` reducer for future implementations as I can see adding features such as,
  viewing history, choosing a past address, and even pulling data from the Redux cache intead of processing
  the address again.
*/

const dashboardInitial = {
  selectedAddress: {},
  isProcessing: false
}

function dashboard(state = dashboardInitial, action) {
  switch (action.type) {
    case 'ADDRESS_PROCESSED': {
      const { processedAddress } = action.payload
      return {
        ...state,
        isProcessing: false,
        selectedAddress: processedAddress
      }
    }
    case 'ADDRESS_PROCESSING': {
      return {
        ...state,
        isProcessing: true,
        selectedAddress: {}
      }
    }
    default:
      return state
  }
}

function addressHistory(state = [], action) {
  switch (action.type) {
    case 'ADDRESS_PROCESSED': {
      const processedAddress = action.payload
      return [...state, processedAddress]
    }
    default:
      return state
  }
}

export default combineReducers({
  dashboard,
  addressHistory
})
