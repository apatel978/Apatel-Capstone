import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  let link;

  if (sessionUser) {
    link = '/current'
  } else {
    link = '/'
  }

  return (
    <div>
        <ul className="navbar">
            <li>
                <div className="LogoDiv">
                    <NavLink to={link} className='homeLink'>
                        <span>Live Lavish</span>
                    </NavLink>
                </div>
            </li>
            <div className='createLinkAndProfileButton'>
                {isLoaded && (
                    <li>
                    <ProfileButton user={sessionUser} />
                    </li>
                )}
            </div>
        </ul>
    </div>
  );
}

export default Navigation;
