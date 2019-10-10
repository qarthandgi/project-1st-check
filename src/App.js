import React from 'react';
import Loadable from 'react-loadable'

/*
Niles' Notes on `@reach/router` vs `react-router-dom`

- While I certainly find `react-router-dom` much more popular than the chosen `@reach/router` here, there are
  significant benefits in going with the latter.
- `react-router-dom` has said __themselves__ that a large change will be coming to the library, and it'll
  be looking **much** more like `@reach/router` because of these benefits.
  - https://reacttraining.com/blog/reach-react-router-future/
- Using `@reach/router`, I find the most significant benefits to be the relative paths (without a need to reconstruct
  urls unnecessarily), and it's focus management for accessible users (especially blind).
- These two points are enough to align one's project with this library considering the migration will
  be consideraly be easier when the time comes.
*/
import { Router } from '@reach/router'

import Intro from 'components/Intro.js'

/*
Niles' Notes on `react-loadable`

- This library offers a huge performance gain, especially as your app grows bigger, by easily code-splitting the project
- I like to include this optimization at the beginning of the dev process, rather than implementing lazy-loading down
  the road. I simply think it's straightforward enough & essential enough to do from the jump.
*/
const DashboardLoadable = Loadable({
  loader: () => import('components/dashboard/Dashboard'),
  loading: () => <div></div>
})

function App() {
  // Normally, we've NEVER put the API key in the string like this. This is simply for simplicity sake right now.
  // useScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2wE8JSp2DZ6jakbqBCJTImHQ359nvy78&libraries=places')

  return (
    <Router>
      <Intro path="/" />
      <DashboardLoadable path="/dashboard" />
    </Router>
  );
}

export default App;
