import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'

/*
Niles' Thoughts on imports

- By default, React supports relative imports but I find absolute imports equally necessary throughout the project.
- I've created `jsconfig.json` with a `baseUrl` that defines a starting point for absolute paths.
  - This is incredibly helpful for assets, services, and modules.
  - I find `js` components and their associated style files `.sass` are the only things that should be so tightly
    coupled with relative imports
*/
// Also, This is just a quick logo I put together in Photoshop
import logo from 'assets/images/project_1st_check-v3-with_name.png'

import stepsData from 'data/steps'
import IntroStep from './IntroStep'

/*
Niles' Thoughts on SASS/CSS:

- I have a liking towards sass-format styles as it's just less verbose and removes
any cruft that I feel is unnecessary for a stylesheet.
- I also like to have a separate sass file for each component named the same as the component.
  - This gives the illusion (but same security) of scoped styling
  - I use an attribute named `data-sscope` on the root element of every component to scope the styles
- I don't prefer using many of the CSS-in-JS (or JSS) tools as I think it's an unnecessary layer
  that doesn't need to be added.
*/
import './Intro.sass'

function Intro() {
  /*
  Niles' Notes on Hooks:

  - While we can obviously use a class for this component (since it benefits from state), I find
    tremendous benefit and conciseness of using hooks within a function component.
  - While there's tons of documentation and articles on the pros & cons, being able to group like-minded functionality
    together instead of grouping them within different cyles (componentDidMount, componentDidUpdate...) is a huge
    organizational benefit (not even mentioning the bug-saving benefits, especially from `useEffects`).
  */

  // I want to display a pre-intro "splash" welcome screen before the tutorial __if__ the user has never visited us
  // before. We'll store a simple item in `localStorage` to determine whether this is their first time here.
  const needsWelcome = !localStorage.getItem('hasVisited')

  // I'm also using a `useState` hook as this is a variable state I'd want to survive across re-renders as we add
  // more interactivity to the intro page in the future (such as sign up or auth).
  const [mode, setMode] = useState(needsWelcome ? 'welcome' : 'intro')
  const [introStep, setIntroStep] = useState(-1)

  // Here, we're going to use the `useEffect` hook to check if the step is `-1`. We're using a "-1th" step to indicate
  // when we should start the animation to bring the state to the "0th" step.
  // eslint-disable-next-line
  useEffect(() => {
    if (introStep === -1 && mode === 'intro') {
      setTimeout(() => { setIntroStep(0) }, 1000)
    }
  })


  // action button for the welcome/intro main panel
  let actionButtonText
  if (mode === 'welcome') {
    actionButtonText = 'GET STARTED'
  } else if (mode === 'intro' && introStep !== 4) {
    actionButtonText = 'NEXT'
  } else {
    actionButtonText = 'GO'
  }
  const handleIntroNext = () => {
    if (mode === 'welcome') {
      setMode('intro')
    } else if (introStep === 4) {
      navigate('/dashboard')
    } else {
      setIntroStep(introStep + 1)
    }
  }
  const actionButtonEl = <div onClick={() => handleIntroNext()} className="action-button">{actionButtonText}</div>

  // welcome/intro main panel
  const mainPanelEl = (
    <div className={`main-panel ${mode === 'intro' ? 'intro' : ''}`}>
      <div className='logo'>
        <img src={logo} alt='Project 1st Check Logo' />
      </div>
      <div className="main-title">A Pre-Screening Service for Contractors Everywhere.</div>
      {actionButtonEl}
    </div>
  )

  const stepsEl = stepsData.filter((step, idx) => idx <= introStep).map(step => (
    <IntroStep key={step.title} step={step} />
  ))

  return (
    <div data-sscope='intro'>
      <div className="panel-wrapper">
        {mainPanelEl}
        <div className={`tutorial-panel ${mode === 'welcome' ? 'hidden' : ''}`}>
          {stepsEl}
        </div>
      </div>
    </div>
  )
}

export default Intro
