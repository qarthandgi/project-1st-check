import React from 'react'

import DashboardHeader from './DashboardHeader'
import DashboardAddress from './DashboardAddress'
import DashboardContent from './DashboardContent'
import './Dashboard.sass'

function Dashboard() {
    return (
        <div data-sscope='dash'>
            <DashboardHeader />
            <DashboardAddress />
            <DashboardContent />
        </div>
    )
}

export default Dashboard;
