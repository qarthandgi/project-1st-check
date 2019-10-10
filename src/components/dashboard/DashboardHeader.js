import React from 'react'
import { navigate } from '@reach/router'

import './DashboardHeader.sass'
import logo from 'assets/images/project_1st_check-v3-without_name.png'

function DashboardHeader() {

    /* Quick Note:

    - I think event handlers are a great use case of function expressions. Since function expressions (like the
      one below) can only be used once they're encountered in the code, it enforces the flow of logic in the React
      component.
      - This function will only ever be called after the return has rendered, thus it'll never be something called
        in preparation of the return JSX because it's an event handler
    */
    const handleToIntro = () => {
        navigate('/')
    }
    return (
        <div data-sscope='dashhead'>
            <div className="logo">
                <img src={logo} alt="Project 1st Check Logo"/>
            </div>
            <div
                className="to-intro"
                onClick={() => handleToIntro()}
            >Replay Intro</div>
        </div>
    )
}

export default DashboardHeader;