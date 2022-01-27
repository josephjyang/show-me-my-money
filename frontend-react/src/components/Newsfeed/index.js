import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFriends } from '../../store/friends';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { getComments } from '../../store/comments';
import { authenticate } from '../../store/session';
import { getLikes, createLike, deleteLike } from '../../store/likes';
import PendingTransactions from '../PendingTransactions';
import './Newsfeed.css'

function Newsfeed({ person }) {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)
    const userTransactions = Object.values(transactions)
    userTransactions.sort((a, b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at)
    })
    const filteredTransactions = userTransactions.filter(transaction => {
        if (person) {
            return (transaction.paid && (transaction.payer_id === person.id || transaction.payee_id === person.id))
        }
        else return transaction.paid
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            // dispatch(getFriends(user));
            dispatch(getTransactions(user));
            dispatch(getUsers());
            // dispatch(getComments());
            // dispatch(getLikes());
        }
    }, [dispatch, user])

    if (!user) {
        return null;
    }

    const addLike = async transaction => {
        const newLike = {
            user_id: user.id,
            transaction_id: transaction.id
        }
        await dispatch(createLike(newLike));
        dispatch(getTransactions(user));
    }

    const removeLike = async like => {
        await dispatch(deleteLike(like));
        dispatch(getTransactions(user));
    }


    return (
        <div id="newsfeed-container">
            <div id="newsfeed">
                {filteredTransactions.map(transaction => {
                    return (
                        <div className="transaction-container" key={transaction.id}>
                            <div className="transaction-information">
                                <div className="transaction-picture">
                                    <img className="creator-picture" src={transaction.creator.profile_pic} alt="creator" />
                                </div>
                                <div className="transaction-content">
                                    <div className="content-header">
                                        <div className="content-header-names">
                                            <NavLink to={`/users/${transaction.creator.id}`} className="user-name" activeClassName='active'>
                                                {transaction.creator.first_name}
                                            </NavLink>
                                            {transaction.payer_id === transaction.creator_id ?
                                                <span>{" paid "}
                                                    <NavLink to={`/users/${transaction.payee.id}`} className="user-name" activeClassName='active'>
                                                        {transaction.payee.first_name}
                                                    </NavLink>
                                                </span>
                                                : <span>{" charged "}
                                                    <NavLink to={`/users/${transaction.payer.id}`} className="user-name" activeClassName='active'>
                                                        {transaction.payer.first_name}
                                                    </NavLink>
                                                </span>}
                                        </div>
                                        {transaction.payer_id === user.id && <div className="neg-amount"> -${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                        {transaction.payee_id === user.id && <div className="pos-amount"> +${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                    </div>
                                    <div className="transaction-details">
                                        {transaction.details}
                                    </div>
                                    <div className="icon-container">
                                        <div className="likes-container">
                                            {transaction.likes[user.id] ? <i className="fas fa-heart liked" onClick={() => removeLike(transaction.likes[user.id])} /> : <i className="fas fa-heart" onClick={() => addLike(transaction)} />}
                                            {Object.keys(transaction.likes).length > 0 && Object.keys(transaction.likes).length}
                                        </div>
                                        <div className="comments-container">
                                            <NavLink to={`/transactions/${transaction.id}`} activeClassName='active'>
                                                <i className="fas fa-comment" />
                                            </NavLink>
                                            {Object.keys(transaction.comments).length > 0 && Object.keys(transaction.comments).length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Newsfeed;
