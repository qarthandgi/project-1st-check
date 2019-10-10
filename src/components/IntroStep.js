import React, { useState, useEffect } from 'react'

import './IntroStep.sass'

function IntroStep(props) {

    // Here we want to have a delayed availability because of the time taken for React to create the initial
    // component in the `Intro` component. This makes the animation run that much smoother.
    const [available, setAvailable] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setAvailable(true)
        }, 8)
    }, [available])

    const content = (
        <>
            <img src={props.step.logo} alt='a logo' />
            <div className="content-wrap">
                <div className="title">{props.step.title}</div>
                <div className="description">{props.step.description}</div>
            </div>
        </>
    )
    return (
        <div data-sscope="inst" className={`${available ? 'available' : ''}`}>
            {( available
                ? content
                : null
            )}
        </div>
    )
}

export default IntroStep