// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <div className='updatesImageContainer'>
                <div>
                    <span className='recentUpdateTitle'>Recent Updates</span>
                    <div className='styled-list-container'>
                        <ul>
                            <li>CSS Stylings have been made and applied - more refining coming soon!</li>
                            <li>Goals are fully operational! Make as many or as little as you like!</li>
                            <li>Workouts have been updated - make as many as you want and go all out with the details!</li>
                            <li>Wanna know what food you should try? Meals and meal reviews are coming soon!</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div>
                        {sessionUser && <span className='recentUpdateTitle'>Welcome {sessionUser.username}! Let&apos;s go to </span>}
                        {sessionUser && <Link to='/current' className='dashboardTitle'>Your Dashboard</Link>}
                    </div>
                    <img />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
