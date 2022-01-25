import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Newsfeed from '../Newsfeed';
import './User.css'

function User() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <>
            <ul>
                <div id="user-pro-pic">
                    <img src={user.profile_pic} alt="user profile"></img>
                </div>
                <li>
                    <strong>{user.first_name} {user.last_name}</strong>
                </li>
                <li>
                    <strong>@{user.username}</strong> 
                    {user.following && Object.keys(user.following).length + Object.keys(user.followed).length} friends
                </li>
                <li>
                    <div id="pay-button">
                        <img src="/smmm-sign.png" alt="smmm sign" id="smmm-sign" />Pay or Request
                    </div>
                </li>
            </ul>
            <Newsfeed person={user}/>
        </>
    );
}
export default User;
