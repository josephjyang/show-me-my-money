
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = () => {
    return (
        <div id="nav-container">
            <nav id="home-nav">
                <NavLink to='/' exact={true} activeClassName='active'>
                    <img src="/smmm-logo.png" alt="smmm logo" id="smmm-logo" />
                </NavLink>
                <div id="right-nav">
                    <NavLink to='/pay' exact={true} activeClassName='active'>
                        <div id="pay-button">
                            <img src="/smmm-sign.png" alt="smmm sign" id="smmm-sign" />Pay or Request
                        </div>
                    </NavLink>
                    <ProfileButton />
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
