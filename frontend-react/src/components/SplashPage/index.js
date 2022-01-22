import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SplashPage.css'

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if (user) return <Redirect to="/home" />

    else return (
        <div id="splash-page">
            <div className="splash-panel one">
                <div className="left-panel">
                    <h1 className='homepage-header'>Fast, safe, social payments</h1>
                    <h3 className="homepage-tagline">When you need to see your money, come to Show Me My Money.</h3>
                    <a href="/sign-up" id='homepage-signup-button'>Get SMMM</a>
                </div>
                <div className="right-panel">
                  <i className="fas fa-comments-dollar"/> 
                </div>
            </div>
            <div className="splash-panel two">
                <div className="left-panel">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div id="right-panel">
                    <h1 className='homepage-header'>Pay friends</h1>
                    <h3 className="homepage-tagline">Whether you're settling bills, splitting up the check, or sending a gift, Show Me My Money helps you get your funds where they need to go.</h3>
                </div>
            </div>
        </div>
    );
}


export default SplashPage;