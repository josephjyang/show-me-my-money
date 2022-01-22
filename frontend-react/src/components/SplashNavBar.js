
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoLoginButton from './DemoLoginButton';
import './SplashNavBar.css'

const SplashNavBar = () => {
    return (
        <nav id="splash-nav">
            <div id="splash-nav-left">
                <NavLink to='/' exact={true} activeClassName='active'>
                    <div id="logo-container">
                        <div id="logo-first">SHOW ME MY</div>
                        <div id="logo-second">MONEY!</div>
                    </div>
                </NavLink>
                <NavLink to='/about' exact={true} activeClassName='active'>
                    <div id="about-link">
                        About SMMM
                    </div>
                </NavLink>
            </div>
            <ul id="splash-nav-right">
                <li>
                    <DemoLoginButton />
                </li>
                <li>
                    <NavLink id="login-link" to='/login' exact={true} activeClassName='active'>
                        Sign in
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id="sign-up-button">
                            <img src="smmm-sign.png" alt="initial" id="signup-initial" />Get SMMM
                        </button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default SplashNavBar;
