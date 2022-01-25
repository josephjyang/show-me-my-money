import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Newsfeed from "../Newsfeed";
import { getUsers } from "../../store/users";
import SearchBar from "../Search";
import './UserProfile.css'

const UserProfile = () => {
    const users = useSelector(state => state.users)
    const { userId } = useParams();
    let user
    if (userId) user = users[userId];

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

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
            </div>
            <Newsfeed person={user} />
        </div>
    );

    else return (<div>loading</div>)
};

export default UserProfile;