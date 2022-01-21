
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
    return (
        <div id="nav-container">
            <nav id="home-nav">
                <NavLink to='/home' exact={true} activeClassName='active'>
                    <img src="/smmm-logo.png" alt="smmm logo" id="smmm-logo" />
                </NavLink>
                <NavLink to='/pay' exact={true} activeClassName='active'>
                    Pay or Request
                </NavLink>
                <LogoutButton />
            </nav>
        </div>
    );
}

export default NavBar;
