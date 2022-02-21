import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import transfermoney from '../images/transfermoney.svg'
import online_friends from '../images/online_friends.svg'
import './SplashPage.css'

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if (user) return <Redirect to="/home" />

    else return (
        <div id="splash-page">
            <div className="splash-panel one">
                <div className="left-panel">
                    <h1 className='homepage-header'>Fast, safe, social payments</h1>
                    <h3 className="homepage-tagline">When you need to see your money, come to Show Me My Money!</h3>
                    <NavLink to="/sign-up" id='homepage-signup-button'>Get $MMM</NavLink>
                </div>
                <div className="right-panel">
                    <img src={transfermoney} alt="social payment"/>
                </div>
            </div>
            <div className="splash-panel two">
                <div className="left-panel">
                    <img src={online_friends} alt="friend payment"/> 
                </div>
                <div className="right-panel">
                    <h1 className='homepage-header'>Pay friends</h1>
                    <h3 className="homepage-tagline">Whether you're settling bills, splitting up the check, or sending a gift, Show Me My Money helps you get your funds where they need to go.</h3>
                </div>
            </div>
            <div id="homepage-footer">
                <NavLink to="/about" id="about">ABOUT SHOW ME MY MONEY</NavLink>
            </div>
        </div>
    );
}


export default SplashPage;