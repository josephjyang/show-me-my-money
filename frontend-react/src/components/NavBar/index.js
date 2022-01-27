
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
                        <img src={user.profile_pic} alt="user profile"></img>
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
                <NavLink to='/' activeClassName='active' className="navbar-link">
                    <div className="nav-icon-container">
                        <i class="fas fa-home"></i>
                    </div>
                    <span>Home</span>
                </NavLink>
                <NavLink to='/search' activeClassName='active' className="navbar-link">
                    <i class="fas fa-search"></i>
                    Search
                </NavLink>
                <NavLink to='/profile' activeClassName='active' className="navbar-link">
                    <i class="fas fa-user-circle"></i>
                    Profile
                </NavLink>
                <NavLink to='/friends' activeClassName='active' className="navbar-link">
                    <i class="fas fa-users"></i>
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
