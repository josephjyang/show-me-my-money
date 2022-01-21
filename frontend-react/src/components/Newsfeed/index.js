import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFriends } from '../../store/friends';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import './Newsfeed.css'

function Newsfeed() {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getFriends(user));
            dispatch(getTransactions(user));
            // dispatch(getUsers());
        }
    }, [dispatch, user])

    if (!user) {
        return null;
    }


    return (
        <div id="newsfeed">
            {Object.values(transactions).map(transaction => {
                return (
                    <div className="transaction-container">
                        {/* <div className="creator-picture" style={{ backgroundImage:`url(${transaction.creator.profile_pic})` }} /> */}
                        <img className="creator-picture" src={transaction.creator.profile_pic} alt="creator"/>
                        <div className="transaction-info">
                            <span className="user-name">{transaction.creator.first_name} </span>
                            {transaction.payer_id === transaction.creator_id ? 
                                <span>paid <span className="user-name">{transaction.payee.first_name}</span></span>
                                : <span>charged <span className="user-name">{transaction.payer.first_name}</span></span>}
                            {transaction.payer_id === user.id || transaction.payee_id === user.id ? ` $${transaction.amount}` : ""}
                            <div className="transaction-details">
                                {transaction.details}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
export default Newsfeed;