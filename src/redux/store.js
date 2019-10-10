import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

/* Niles' Notes

- The reason I'm creating a separate file for the store is to prepare for app growth.
- The index.js file can easily get bloated with setup from many libraries if we don't take this approach.

*/

// We're including the `thunkMiddleware` to be able to create async action creator flows.
// It's incredibly beneficial because we can still synchronously dispatch actions during our async action flow.
export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
