import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { getFriends } from '../../store/friends';
import { createLike, deleteLike } from '../../store/likes';
import './Friend.css'
import { useMode } from '../../context/AppContext';

function Friends() {
    const user = useSelector(state => state.session.user);
    const friends = useSelector(state => state.friends);
    const userFriends = Object.values(friends);
    const { dark } = useMode();
    
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
        <div id="friends-container" className={dark}>
            {userFriends.map((user) => {
                return (
                    <div className={`friend-box ${dark}`} key={user.id}>
                        <NavLink to={`/users/${user.id}`}>
                            {user?.profile_pic ? <img className="friend-picture" src={user?.profile_pic} alt="friend" /> : <div className="replacement-photo-friend">{user?.first_name[0]}-{user?.last_name[0]}</div>}
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
