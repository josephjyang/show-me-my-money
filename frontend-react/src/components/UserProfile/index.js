import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Newsfeed from "../Newsfeed";
import { getUsers } from "../../store/users";
import { getFriends } from "../../store/friends";
import { getFriendRequests, createFriendRequest } from "../../store/friendRequests";
import './UserProfile.css'

const UserProfile = () => {
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users);
    const friends = useSelector(state => state.friends);
    const friendRequests = useSelector(state => state.friendRequests)
    const [errors, setErrors] = useState({});

    const { userId } = useParams();
    let user
    if (userId) user = users[userId];

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getFriends(sessionUser));
        dispatch(getFriendRequests(sessionUser));
    }, [dispatch, sessionUser])

    const addFriend = async user => {
        const payload = {
            sender_id: sessionUser.id,
            recipient_id: user.id
        }

        const data = await dispatch(createFriendRequest(payload));
        if (data.errors) setErrors(data.errors)
        dispatch(getFriendRequests(sessionUser));
    }

    if (user) return (
        <div id="user-profile-ctr">
            <div id="user-info">
                <div id="user-pro-pic">
                    <img src={user.profile_pic} alt="user profile"></img>
                </div>
                <div>
                    <p id="profile-name">{user.first_name} {user.last_name}</p>
                </div>
                <div id="profile-row">
                    <p id="profile-username">@{user.username}</p>
                    <i class="fas fa-circle"></i>
                    <p id="profile-friends">
                        {user.following && Object.keys(user.following).length + Object.keys(user.followed).length} friends
                    </p>
                </div>
                <NavLink to={`/users/${user.id}/pay`} activeClassName='active'>
                    <div id="profile-pay-button">
                        <img src="/smmm-sign.png" alt="smmm sign" id="smmm-sign" />
                        <p id="pay-button-text">Pay or Request</p>
                    </div>
                </NavLink>
                {friends[user.id] ? 
                    <div>Friends</div> : friendRequests[user.id] ? <div>Friend Request Sent</div> :
                    (
                    <div id="add-friend-button" onClick={addFriend}>
                        <p id="pay-button-text">Add friend</p>
                    </div>
                    )
                }
            </div>
            <Newsfeed person={user} />
        </div>
    );

    else return (<div>loading</div>)
};

export default UserProfile;