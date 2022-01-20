import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './HomePage.css'

function HomePage() {
    const user = useSelector(state => state.session.user);

    if (!user) {
        return null;
    }

    return (
        <ul>
            <li>
                <strong>User Id</strong> {user.id}
            </li>
            <li>
                <strong>Username</strong> {user.username}
            </li>
            <li>
                <strong>Email</strong> {user.email}
            </li>
            <li>
                {user.profile_pic && <img id="user-profile-pic" src={user.profile_pic} alt ="user profile"/>}
            </li>
            <li>
                <LogoutButton />
            </li>
        </ul>
    );
}
export default HomePage;
