import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearComments } from '../../store/comments';
import { clearFriends } from '../../store/friends';
import { clearLikes } from '../../store/likes';
import { clearTransactions } from '../../store/transactions';
import { clearUsers } from '../../store/users';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const onLogout = async e => {
        await dispatch(logout());
        await dispatch(clearComments());
        await dispatch(clearFriends());
        await dispatch(clearLikes());
        await dispatch(clearTransactions());
        await dispatch(clearUsers());
        history.push("/")
    }

    return <button id="log-out-button" onClick={onLogout}>Logout</button>
}

export default LogoutButton