import React, { useState } from 'react'

import './Intro.sass'
/*
Niles' Thoughts on SASS/CSS:

- I have a liking towards sass-format styles as it's just less verbose and removes
any cruft that I feel is unnecessary for a stylesheet.
- I also like to have separate files for the sass file of the component.
*/

function Intro() {
  const [value, setValue] = useState(0)

  return (
    <div data-sscope='intro'>
      <b>{ value }</b>
      <button onClick={() => setValue(value + 1)}>Upgrade</button>
    </div>
  )
}

export default Intro
