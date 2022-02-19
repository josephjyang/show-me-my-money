import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFriends } from '../../store/friends';
import { useMode } from '../../context/AppContext';
import './Friends.css'

function Friends({ loaded }) {
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

    if (!loaded) {
        return null;
    }

    return (
        <div id="friends-container" className={dark}>
            <h3 id="friends-title">My Friends</h3>
            <div id="all-friends">
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
        </div>
    );
}
export default Friends;
