import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { createLike, deleteLike } from '../../store/likes';
import { useMode } from '../../context/AppContext';
import { passedTime } from './utils';
import UserSearchBar from '../UserSearch';
import './Newsfeed.css'

function Newsfeed({ person, loaded }) {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions);
    const [me, setMe] = useState(false);
    const { dark } = useMode()
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

    if (!loaded) {
        return null;
    }

    return (
        <div id="newsfeed-container" className={dark}>
            <UserSearchBar loaded={loaded} />
            {person?.id !== user.id && (<div id="newsfeed-filter">
                <button onClick={() => setMe(false)} id={me ? "filter" : "filter-active"} className="filter-button"><i className="fas fa-user-friends"></i></button>
                <button onClick={() => setMe(true)} id={me ? "filter-active" : "filter"} className="filter-button"><i className="fas fa-user"></i></button>
            </div>)}
            <div id="newsfeed">
                {filteredTransactions.map(transaction => {
                    return (
                        <div className="transaction-container" key={transaction.id}>
                            <div className="transaction-information">
                                <div className="transaction-picture">
                                    {transaction.creator?.profile_pic ? <img className="creator-picture" src={transaction.creator?.profile_pic} alt="creator" /> : <div className="replacement-photo">{transaction.creator?.first_name[0]}-{transaction.creator?.last_name[0]}</div>}
                                </div>
                                <div className={`transaction-content ${dark}`}>
                                    <div className="content-header">
                                        <div className="content-header-names">
                                            <NavLink to={`/users/${transaction.creator.id}`} className={`user-name ${dark}`} activeClassName='active'>
                                                {transaction.creator.id === user.id ? "You" : transaction.creator.first_name}
                                            </NavLink>
                                            {transaction.payer_id === transaction.creator_id ?
                                                <span>{" paid "}
                                                    <NavLink to={`/users/${transaction.payee.id}`} className={`user-name ${dark}`} activeClassName='active'>
                                                        {transaction.payee.id === user.id ? "You" : transaction.payee.first_name}
                                                    </NavLink>
                                                </span>
                                                : <span>{" charged "}
                                                    <NavLink to={`/users/${transaction.payer.id}`} className={`user-name ${dark}`} activeClassName='active'>
                                                        {transaction.payer.id === user.id ? "You" : transaction.payer.first_name}
                                                    </NavLink>
                                                </span>}
                                        </div>
                                        {transaction.payer_id === user.id &&
                                            <div className={`neg-amount ${dark}`}> -${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) :
                                                Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                        {transaction.payee_id === user.id &&
                                            <div className={`pos-amount ${dark}`}> +${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) :
                                                Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                    </div>
                                    <p className={`elapsed-time ${dark}`}>
                                        {passedTime(transaction)}
                                    </p>
                                    <div className="transaction-details">
                                        {transaction.details}
                                    </div>
                                    <div className={`icon-container ${dark}`}>
                                        <div className="likes-container">
                                            {transaction.likes[user.id] ? <i className="fas fa-heart liked" onClick={() => removeLike(transaction.likes[user.id])} /> : <i className="fas fa-heart" onClick={() => addLike(transaction)} />}
                                            {Object.keys(transaction.likes).length > 0 && <span className="num-likes">{Object.keys(transaction.likes).length}</span>}
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
            {!person && <div id="mobile-pay-ctr">
                <NavLink to='/pay' exact={true} activeClassName='active' id="pay-mobile">
                    <div id="pay-button">
                        <span id="dollar-sign">$ </span>
                        <span>Pay or Request</span>
                    </div>
                </NavLink>
            </div>}
        </div>
    );
}
export default Newsfeed;
