import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Even though this app is minimal, I want to create the infrastructure for growth in the future.
// Thus we'll use redux, even it's only containing a history of the searched addresses and the current one.
import { Provider } from 'react-redux'
import store from 'redux/store'

// Here we're creating a script tag for the google maps script
const googleMapsScript = document.createElement('script')
googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB2wE8JSp2DZ6jakbqBCJTImHQ359nvy78&libraries=places'

// I specifically want `async` to be false so that the library is loaded before the app is
googleMapsScript.async = false
document.body.appendChild(googleMapsScript)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
