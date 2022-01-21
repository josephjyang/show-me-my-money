
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoLoginButton from './DemoLoginButton';
import './SplashNavBar.css'

const SplashNavBar = () => {
    return (
        <nav id="splash-nav">
            <ul>
                <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                        <img src="/smmm-logo.png" alt="smmm logo" id="smmm-logo" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>
                </li>
                <li>
                    <DemoLoginButton />
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}

export default SplashNavBar;
