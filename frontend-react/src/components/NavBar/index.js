
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import { useMode } from '../../context/AppContext';
import './NavBar.css'

const NavBar = ({ loaded }) => {
    const user = useSelector(state => state.session.user);
    const { dark, setDark, setChatroom } = useMode();

    if (!loaded) {
        return null;
    }

    return (
        <div className={`nav-container ${dark}`}>
            <nav id="home-nav">
                <NavLink to='/' activeClassName='active' id="smmm-text-logo">
                    $MMM
                </NavLink>
                <div id="nav-user-greeting">
                    <div id="nav-user-pro-pic">
                        {user.profile_pic ? <img src={user.profile_pic} alt="user profile" /> : <div id="user-pro-replace">{user.first_name[0]}-{user.last_name[0]}</div>}
                    </div>
                    <div id="nav-user-intro">
                        <div id="user-hello" className={`${dark}`}>
                            Hi, {user.first_name}
                        </div>
                        <div id="user-at" className={`${dark}`}>
                            @{user.username}
                        </div>
                    </div>
                </div>
                <div id="nav-user-balance">
                    Balance: ${Intl.NumberFormat('en-US').format(user.balance)}
                </div>
                <NavLink to='/' exact={true} activeClassName='active' className={`navbar-link ${dark}`}>
                    <div className="nav-icon-container">
                        <i className="fas fa-home"></i>
                    </div>
                    <span className="nav-span">Home</span>
                </NavLink>
                <NavLink to={`/users/${user.id}`} activeClassName='active' className={`navbar-link ${dark}`}>
                    <i className="fas fa-user-circle"></i>
                    <span className="nav-span">Profile</span>
                </NavLink>
                <NavLink to='/friends' activeClassName='active' className={`navbar-link ${dark}`}>
                    <i className="fa-solid fa-users"></i>
                    <span className="nav-span">Friends</span>
                </NavLink>
                <NavLink to='/messages' activeClassName='active' className={`navbar-link ${dark}`} onClick={() => setChatroom("")}>
                    <i className="fa-solid fa-comments"></i>
                    <span className="nav-span">Messages</span>
                </NavLink>
                <NavLink to='/notifications' exact={true} id="pending-link" activeClassName='active' className={`navbar-link ${dark}`}>
                    <i class="fa-solid fa-bell" /> 
                    <span className="nav-span">Notifications</span>
                </NavLink>
                <LogoutButton />
                <NavLink to='/pay' exact={true} activeClassName='active' id="mobile-pay">
                    <div id="pay-button">
                        <span id="dollar-sign">$ </span>
                        <span className="nav-span">Pay or Request</span>
                    </div>
                </NavLink>
            </nav>
            {dark !== "dark" && (<button id="dark-mode" onClick={() => setDark("dark")}>
                <i className="fas fa-moon"/> Dark Mode
            </button>)}
            {dark === "dark" && (<button id="light-mode" onClick={() => setDark("light")}>
                <i className="far fa-sun"/> Light Mode
            </button>)}
        </div>
    );
}

export default NavBar;
