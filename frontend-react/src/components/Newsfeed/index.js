import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFriends } from '../../store/friends';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { deleteTransaction } from '../../store/transactions';
import { getComments } from '../../store/comments';
import './Newsfeed.css'

function Newsfeed() {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)
    const userTransactions = Object.values(transactions)
    userTransactions.sort((a, b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at)
    })

    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getFriends(user));
            dispatch(getTransactions(user));
            dispatch(getUsers());
            dispatch(getComments())
        }
    }, [dispatch, user])

    if (!user) {
        return null;
    }

    const deleteTrans = async transaction => {
        await dispatch(deleteTransaction(transaction));
        dispatch(getTransactions(user));
    }


    return (
        <div id="newsfeed">
            {userTransactions.map(transaction => {
                return (
                    <div className="transaction-container" key={transaction.id}>
                        <div className="transaction-information">
                            <img className="creator-picture" src={transaction.creator.profile_pic} alt="creator"/>
                            <div className="transaction-content">
                                <div className="content-header">
                                    <div className="content-header-names">
                                        <span className="user-name">{transaction.creator.first_name} </span>
                                        {transaction.payer_id === transaction.creator_id ? 
                                            <span>paid <span className="user-name">{transaction.payee.first_name}</span></span>
                                            : <span>charged <span className="user-name">{transaction.payer.first_name}</span></span>}
                                    </div>
                                    {transaction.payer_id === user.id && <div className="neg-amount"> -${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                    {transaction.payee_id === user.id && <div className="pos-amount"> +${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                </div>
                                <div className="transaction-details">
                                    {transaction.details}
                                </div>
                                <div className="icon-container">
                                    <i className="fas fa-heart" />
                                    <NavLink to={`/transactions/${transaction.id}`}>
                                        <i className="fas fa-comment" />    
                                    </NavLink>
                                    {Object.keys(transaction.comments).length > 0 && Object.keys(transaction.comments).length}
                                </div>
                            </div>
                        </div>
                        {/* {(transaction.creator_id === user.id) &&
                        (
                            <div className="transaction-icons">
                                <i className="fas fa-edit" onClick={() => {
                                    history.push(`/transactions/${transaction.id}/edit`)
                                }}></i>
                                <i className="fas fa-trash" onClick={() => deleteTrans(transaction)}></i>
                            </div>
                        )} */}
                    </div>
                )
            })}
        </div>
    );
}
export default Newsfeed;
