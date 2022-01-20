import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import { getFriends } from '../../store/friends';
import { getTransactions } from '../../store/transactions';
import './HomePage.css'

function HomePage() {
    const user = useSelector(state => state.session.user);
    const friends = useSelector(state => state.friends);
    const transactions = useSelector(state => state.transactions)

    const dispatch = useDispatch();
    useEffect(() => {
        if(user) {
            dispatch(getFriends(user));
            dispatch(getTransactions(user))
        }
    }, [dispatch, user])

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
            {Object.values(friends).map(friend => <li>{friend.first_name}</li>)}
            {Object.values(transactions).map(transaction => <li>{transaction.details}</li>)}
        </ul>
    );
}
export default HomePage;
