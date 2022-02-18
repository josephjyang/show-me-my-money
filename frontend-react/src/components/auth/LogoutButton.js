import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearComments } from '../../store/comments';
import { clearFriends } from '../../store/friends';
import { clearLikes } from '../../store/likes';
import { clearTransactions } from '../../store/transactions';
import { clearUsers } from '../../store/users';
import { clearFriendRequests } from '../../store/friendRequests';
import { clearChats } from '../../store/chats';
import { useMode } from '../../context/AppContext';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { dark } = useMode();
    const onLogout = async e => {
        await dispatch(logout());
        await dispatch(clearComments());
        await dispatch(clearFriends());
        await dispatch(clearLikes());
        await dispatch(clearTransactions());
        await dispatch(clearUsers());
        await dispatch(clearFriendRequests());
        await dispatch(clearChats());
        history.push("/")
    }

    return (
    <button id="log-out-button" className={`navbar-link ${dark}`} onClick={onLogout}><i className="fas fa-sign-out-alt" />
        <span className="nav-span">Logout</span>
    </button>
    )
}

export default LogoutButton