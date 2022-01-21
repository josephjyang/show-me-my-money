import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        <div id="home-page">
            {/* {Object.values(friends).map(friend => <li>{friend.first_name}</li>)} */}
        </div>
    );
}
export default HomePage;
