import React from 'react';
import profile from './profile.png'
import './About.css'

function About() {
    return (
        <>
            <div id="about-page">
                <h3>Hello! Welcome to Show Me My Money - a place to send and receive payments between you and your friends. When you need to see your money, come to Show Me My Money.</h3>
                <p id="smmm-info">If you'd like to learn more about the project,<br /> please checkout the Github Repository, here: <a href="https://github.com/josephjyang/show-me-my-money">Show Me My Money</a>.</p>
                <div id="about-me-section">
                    <img className="profile-pic" src={profile} alt="Joseph Yang" />
                    <div id="about-me-text">
                        <h3 id="about-me">
                            Created by Joe Yang (@josephjyang)
                        </h3>
                        <p>
                            Prospective App Academy Grad (February '22)
                        </p>
                        <ul>
                            <li className="social-links">
                                <a href="https://github.com/josephjyang">
                                    <img className="social-logo" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github logo" />
                                    Github
                                </a>
                            </li>
                            <li className="social-links">
                                <a href="https://www.linkedin.com/in/josephjyang/">
                                    <img className="social-logo" src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-linkedin-circle-512.png" alt="linked in logo" />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About