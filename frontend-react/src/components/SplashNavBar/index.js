
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../auth/LoginFormModal';
import DemoLoginButton from '../DemoLoginButton';
import MobileDropdown from './MobileDropdown';
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
            <div id="mobile-menu">
                <MobileDropdown />
            </div>
            <ul id="splash-nav-right">
                <li>
                    <DemoLoginButton />
                </li>
                <li>
                    <LoginFormModal />
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id="sign-up-button">
                            <span id="dollar-sign">$ </span>Get SMMM
                        </button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default SplashNavBar;
