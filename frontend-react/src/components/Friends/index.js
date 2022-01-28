import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { getFriends } from '../../store/friends';
import { createLike, deleteLike } from '../../store/likes';
import './Friend.css'

function Friends() {
    const user = useSelector(state => state.session.user);
    const friends = useSelector(state => state.friends);
    const userFriends = Object.values(friends)
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getFriends(user));
        }
    }, [dispatch, user])

    if (!user) {
        return null;
    }


    return (
        <div id="friends-container">
            {userFriends.map((user) => {
                return (
                    <div className="friend-box" key={user.id}>
                        <NavLink to={`/users/${user.id}`}>
                            <img src={user.profile_pic} alt="friend" className="friend-picture">
                            </img>
                            <h3>
                                {user.first_name} {user.last_name}
                            </h3>
                            <p>
                                @{user.username}
                            </p>
                        </NavLink>
                    </div>
                    );
            })}
        </div>
    );
}
export default Friends;
