// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <div className='updatesImageContainer'>
                {!sessionUser &&
                    <div className='aboutContainer'>
                        <div className='aboutApp'>
                            <p>
                                Welcome! <span className='diffColor'>Live Lavish</span> is an app made for keeping track of your goals and working on steps to achieve them. Maybe you lost track of your goals or saw a workout but forgout what it was later? Live Lavish provides an easy and convenient solution to store everything you need!
                            </p>
                        </div>
                        <div className='aboutImgContainer'>
                            <img src='https://i0.wp.com/stevekeating.me/wp-content/uploads/2021/04/5fa9f865-ce02-4892-9914-0f354d5ffd6a.jpeg?fit=600%2C536&ssl=1'/>
                        </div>
                    </div>
                }
                {sessionUser &&
                    <div>
                        <span className='recentUpdateTitle'>Recent Updates</span>
                        <div className='styled-list-container'>
                            <ul>
                                <li>CSS Stylings have been made and applied - more refining coming soon!</li>
                                <li>Goals are fully operational! Make as many or as little as you like!</li>
                                <li>Workouts have been updated - make as many as you want and go all out with the details!</li>
                                <li>Wanna know what types of food you should make? Meals and meal reviews are coming soon!</li>
                            </ul>
                        </div>
                    </div>
                }

                <div>
                    <div>
                        {sessionUser && <span className='recentUpdateTitle'>Welcome {sessionUser.username}! Let&apos;s go to </span>}
                        {sessionUser && <Link to='/current' className='dashboardTitle'>Your Dashboard</Link>}
                    </div>
                    {sessionUser && <img className='loggedInQuote' src='https://i0.wp.com/amysenter.com/wp-content/uploads/2020/07/0C08FEC7-4A02-4793-8D46-33044D46BB53.jpeg?fit=723%2C303&ssl=1'/>}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
