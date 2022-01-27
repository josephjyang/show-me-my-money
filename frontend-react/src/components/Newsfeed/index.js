import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { createLike, deleteLike } from '../../store/likes';
import './Newsfeed.css'

function Newsfeed({ person }) {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions);
    const [me, setMe] = useState(false)
    const userTransactions = Object.values(transactions);
    userTransactions.sort((a, b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at)
    })
    const filteredTransactions = userTransactions.filter(transaction => {
        if (person) {
            if (me) {
                return (transaction.paid && (transaction.payer_id === person.id || transaction.payee_id === person.id) && (transaction.payer_id === user.id || transaction.payee_id === user.id))
            } else return (transaction.paid && (transaction.payer_id === person.id || transaction.payee_id === person.id))
        }
        else if (me) {
            return (transaction.paid && (transaction.payer_id === user.id || transaction.payee_id === user.id))
        }
        else return transaction.paid
    })

    const passedTime = (transaction) => {
        let startTime = new Date(transaction.updated_at);
        startTime.setHours(startTime.getHours() + 8)
        let endTime = new Date();
        
        // time difference in ms
        let timeDiff = endTime.getTime() - startTime.getTime();
        // strip the ms
        timeDiff /= 1000;

        // get seconds
        let seconds = Math.round(timeDiff % 60);

        // remove seconds from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get minutes
        let minutes = Math.round(timeDiff % 60);

        // remove minutes from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get hours
        let hours = Math.round(timeDiff % 24);

        // remove hours from the date
        timeDiff = Math.floor(timeDiff / 24);

        let days = timeDiff;
        let totalHours = hours + (days * 24); // add days to hours
        if (minutes === 0) {
            return seconds + "s"
        } else if (totalHours === 0) {
            return minutes + "m";
        } else if (days === 0) {
            return totalHours + "h";
        } else if (days < 7) {
            return days + "d"
        } else if (days < 365) {
            return Math.floor(days / 7) + "w";
        } else return Math.floor(days / 365) + "y";
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getTransactions(user));
            dispatch(getUsers());
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
            <div id="newsfeed-filter">
                <button onClick={() => setMe(false)} id={me ? "filter" : "filter-active"} className="filter-button"><i className="fas fa-user-friends"></i></button>
                <button onClick={() => setMe(true)} id={me ? "filter-active" : "filter"} className="filter-button"><i className="fas fa-user"></i></button>
            </div>
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
                                    <p>
                                        {passedTime(transaction)}
                                    </p>
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
