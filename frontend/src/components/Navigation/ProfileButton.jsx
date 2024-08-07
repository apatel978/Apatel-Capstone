import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { AiFillProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    const toggleMenu = e => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logOut = async (e) => {
        e.preventDefault();
        return dispatch(sessionActions.logout())
        .then(closeMenu)
        .then(navigate('/'));
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div className='profileButtonBox'>
                <button className='profileButtonContainer' onClick={toggleMenu}>
                    {/* <AiFillProfile className='profileButton'/> */}
                    <CgProfile className='profileButton'/>
                </button>
                <ul className={`${ulClassName} profileButtonList`} ref={ulRef}>
                    {user ? (
                        <>
                        <li className='profileButtonListItem'>Hello, {user.username}</li>
                        {/* <li className='profileButtonListItem'>{user.firstName} {user.lastName}</li> */}
                        <li className='profileButtonListItem'>{user.email}</li>
                        <li className='profileButtonListItem'>
                            <button className='profileButtonListItem logoutButton' onClick={logOut}>Log Out</button>
                        </li>
                        </>
                    ) : (
                        <>
                            <div className='profileButtonListItem LoginSignupText'>
                                <OpenModalMenuItem
                                style={{ borderRadius: '50px'}}
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                                />
                            </div>
                            <div className='profileButtonListItem LoginSignupText'>
                                <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                                />
                            </div>
                        </>
                    )}
                </ul>
            </div>
        </>
    )
}

export default ProfileButton;
