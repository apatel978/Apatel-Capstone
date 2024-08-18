// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <span>Recent Updates</span>
            <img />
            {sessionUser && <Link to='/current'>Your Dashboard</Link>}
        </div>
    )
}

export default LandingPage;
