
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
    const user = useSelector(state => state.session.user)

    return (
        <div id="nav-container">
            <nav id="home-nav">
                <NavLink to='/' activeClassName='active' id="smmm-text-logo">
                    $MMM
                </NavLink>
                <div id="nav-user-greeting">
                    <div id="nav-user-pro-pic">
                        {user.profile_pic ? <img src={user.profile_pic} alt="user profile" /> : <div id="user-pro-replace">{user.first_name[0]}-{user.last_name[0]}</div>}
                    </div>
                    <div id="nav-user-intro">
                        <div id="user-hello">
                            Hi, {user.first_name}
                        </div>
                        <div id="user-at">
                            @{user.username}
                        </div>
                    </div>
                </div>
                <div id="nav-user-balance">
                    Balance: ${Intl.NumberFormat('en-US').format(user.balance)}
                </div>
                <NavLink to='/' exact={true} activeClassName='active' className="navbar-link">
                    <div className="nav-icon-container">
                        <i className="fas fa-home"></i>
                    </div>
                    <span>Home</span>
                </NavLink>
                <NavLink to={`/users/${user.id}`} activeClassName='active' className="navbar-link">
                    <i className="fas fa-user-circle"></i>
                    Profile
                </NavLink>
                <NavLink to='/friends' activeClassName='active' className="navbar-link">
                    <i className="fas fa-users"></i>
                    Friends
                </NavLink>
                <LogoutButton />
                <NavLink to='/pay' exact={true} activeClassName='active'>
                    <div id="pay-button">
                        <span id="dollar-sign">$ </span>Pay or Request
                    </div>
                </NavLink>
            </nav>
        </div>
    );
}

export default NavBar;
