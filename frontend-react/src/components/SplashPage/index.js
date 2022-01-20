import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './SplashPage.css'

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if (user) return <Redirect to="/home" />

    else return (
        <>
            <h1 id='homepage-header'>The smart to-do app for busy people.</h1>
            <a href="/sign-up" id='homepage-signup-button'> Sign Up Free</a>
            <footer id='homepage-footer'>
                <div className='footer-container'>
                    <div className='footer-nav-div'>
                        <ul className="nav-footer-list">
                            <li className='nav-footer-header'>
                                Joseph Yang
                            </li>
                            <li>
                                <a className="gitHub-link footer-link" href="https://github.com/josephjyang">Github</a>
                            </li>
                            <li>
                                <a className="linkedIn-link footer-link" href="https://www.linkedin.com/in/josephjyang/">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}


export default SplashPage;