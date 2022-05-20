import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Newsfeed from "../Newsfeed";
import { getUsers } from "../../store/users";
import { getFriends, deleteFriend, createFriend } from "../../store/friends";
import { getFriendRequests, createFriendRequest, deleteFriendRequest } from "../../store/friendRequests";
import { authenticate } from '../../store/session';
import './UserProfile.css'
import { useMode } from "../../context/AppContext";

const UserProfile = ({ loaded }) => {
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users);
    const friends = useSelector(state => state.friends);
    const friendRequests = useSelector(state => state.friendRequests);
    const { dark } = useMode();
    const [errors, setErrors] = useState([]);

    const { userId } = useParams();
    let user
    if (userId) user = users[userId];

    const dispatch = useDispatch()
    useEffect(() => {
        if (sessionUser) {
            dispatch(getUsers());
            dispatch(getFriends(sessionUser));
            dispatch(getFriendRequests(sessionUser));
        }
    }, [dispatch, sessionUser])

    const addFriend = async user => {
        const payload = {
            sender_id: sessionUser.id,
            recipient_id: user.id
        }

        const data = await dispatch(createFriendRequest(payload, user));
        if (data.errors) setErrors(data.errors);
        dispatch(getFriends(sessionUser));
        dispatch(getFriendRequests(sessionUser));
        dispatch(getUsers());
        dispatch(authenticate())
    }

    const cancelRequest = async request => {
        const data = await dispatch(deleteFriendRequest(request, sessionUser));
        if (data.errors) setErrors(data.errors);
        dispatch(getFriends(sessionUser));
        dispatch(getFriendRequests(sessionUser));
        dispatch(getUsers());
        dispatch(authenticate())
    }

    const removeFriend = async friend => {
        await dispatch(deleteFriend(friend, sessionUser));
        dispatch(getUsers());
        dispatch(authenticate());
    }

    const acceptFriend = async invite => {
        await dispatch(createFriend(invite))
        await dispatch(deleteFriendRequest(invite, sessionUser));
        dispatch(authenticate());
        dispatch(getFriendRequests(sessionUser));
        dispatch(getUsers());
    }

    if (user) return (
        <div id="user-profile-ctr" className={dark}>
            {errors?.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
            <div id="user-info">
                <div id="user-pro-pic">
                    {user?.profile_pic ? <img src={user?.profile_pic} alt="user-profile" /> : <div className="replacement-photo-profile">{user?.first_name[0]}-{user?.last_name[0]}</div>}
                </div>
                <div>
                    <p id="profile-name">{user.first_name} {user.last_name}</p>
                </div>
                {sessionUser.id === user.id && <div id="profile-user-balance">
                    Balance: ${Intl.NumberFormat('en-US').format(user.balance)}
                </div>
                }
                <div id="profile-row">
                    <p id="profile-username" className={dark}>@{user.username}</p>
                    <i className={`fas fa-circle ${dark}`}></i>
                    <p id="profile-friends">
                        {user.following && Object.keys(user.following).length + Object.keys(user.followed).length} friends
                    </p>
                </div>
                {sessionUser.id === user.id ? "" : friends[user.id] ? (<button onClick={() => removeFriend(friends[user.id])} className="button" type="button" data-hover="Remove friend" id="friends-button">
                    <p id="pay-button-text">
                        <i className="fas fa-check"/>
                        Friends
                    </p>
                </button>) : 
                        friendRequests[user.id] ? 
                        friendRequests[user.id].recipient_id === user.id ? 
                            <button onClick={() => cancelRequest(friendRequests[user.id])} className="button" type="button" data-hover="Cancel request"><p id="pay-button-text">Friend requested</p></button> : 
                        <div id="rec-friend-req">
                            {user.first_name} sent you a friend request
                            <div className="pending-button-ctr-profile">
                                <button className="pending-button" onClick={() => acceptFriend(friendRequests[user.id])}>Accept</button>
                                <button className="pending-button" onClick={() => cancelRequest(friendRequests[user.id])}>Ignore</button>
                            </div>
                        </div> :
                        (<div id="add-friend-button" onClick={() => addFriend(user)}>
                            <i className="fas fa-user-plus"/><p id="pay-button-text">Add friend</p>
                        </div>)
                }
                {sessionUser.id !== user.id && 
                (
                    <NavLink to={`/users/${user.id}/pay`} activeClassName='active'>
                        <div id="profile-pay-button">
                            <span id="dollar-sign">$ </span>Pay or Request
                        </div>
                    </NavLink>
                )
                }
            </div>
            <Newsfeed person={user} loaded={loaded} />
        </div>
    );

    else return (<div>loading</div>)
};

export default UserProfile;