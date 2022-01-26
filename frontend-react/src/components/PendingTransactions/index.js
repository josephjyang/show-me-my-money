import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getFriends, createFriend } from '../../store/friends';
import { getTransactions } from '../../store/transactions';
import { getUsers } from '../../store/users';
import { authenticate } from '../../store/session';
import { deleteFriendRequest } from '../../store/friendRequests';
import { deleteTransaction, updateTransaction } from '../../store/transactions';
import { getComments } from '../../store/comments';
import { updateUser } from '../../store/users';
import './PendingTransactions.css'

function PendingTransactions() {
    const user = useSelector(state => state.session.user);
    const users = useSelector(state => state.users)
    const transactions = useSelector(state => state.transactions)
    const userTransactions = Object.values(transactions)
    userTransactions.sort((a, b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at)
    })
    const requests = userTransactions.filter(transaction => !transaction.paid && transaction.payee_id === user.id)
    const invoices = userTransactions.filter(transaction => !transaction.paid && transaction.payer_id === user.id)
    const friendRequests = Object.values(user.friend_requests_sent);
    const friendInvites = Object.values(user.friend_requests_received);

    const history = useHistory()
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (user) {
    //         console.log("running pending");
    //         dispatch(authenticate());
    //         dispatch(getFriends(user));
    //         dispatch(getTransactions(user));
    //         dispatch(getUsers());
    //         dispatch(getComments());
    //     }
    // }, [dispatch, user])

    if (!user) {
        return null;
    }

    const deleteTrans = async transaction => {
        await dispatch(deleteTransaction(transaction));
        dispatch(getTransactions(user));
    }

    const acceptTrans = async transaction => {
        if (transaction) {
            transaction.paid = true;
            user.balance -= Number(transaction.amount);
            transaction.creator.balance += Number(transaction.amount);
            await dispatch(updateTransaction(transaction));
            await dispatch(updateUser(user))
            await dispatch(updateUser(transaction.creator))
            dispatch(getTransactions(user));
            history.push("/");
            return
        }
        else history.push("/");
    }

    const acceptFriend = async invite => {
        await dispatch(createFriend(invite))
        await dispatch(deleteFriendRequest(invite, user));
        dispatch(authenticate());
    }

    const ignoreRequest = async invite => {
        await dispatch(deleteFriendRequest(invite, user));
        dispatch(authenticate());
    }


    return (
        <div id="pending">
            <div id="pending-requests">
                <h2 className='pending-header'>Pending Requests</h2>
                {requests.map(transaction => {
                    return (
                        <div className="pending-container" key={transaction.id}>
                            <div className="transaction-information">
                                <div className="transaction-picture">
                                    <img className="creator-picture" src={transaction.payer.profile_pic} alt="creator" />
                                </div>
                                <div className="pending-content">
                                    <div className="content-header">
                                        <div className="content-header-names">
                                            Request to <span className="user-name">{transaction.payer.first_name}</span>
                                        </div>
                                        {transaction.payee_id === user.id && <div className="amount"> ${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}</div>}
                                    </div>
                                    <div className="transaction-details">
                                        {transaction.details}
                                    </div>
                                </div>
                            </div>
                            <div className="pending-icons">
                                <button className="pending-button" onClick={() => deleteTrans(transaction)}>
                                    Cancel
                                </button>
                                <NavLink to={`/transactions/${transaction.id}/edit`}>
                                    <button className="pending-button">
                                        Edit
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id="pending-charges">
                <h2 className='pending-header'>Pending Charges</h2>
                {invoices.map(transaction => {
                    return (
                        <div className="pending-container" key={transaction.id}>
                            <div className="transaction-information">
                                <div className="transaction-picture">
                                    <img className="creator-picture" src={transaction.creator.profile_pic} alt="creator" />
                                </div>
                                <div className="pending-content">
                                    <div className="content-header">
                                        <div className="content-header-names">
                                            <span className="user-name">{transaction.creator.first_name} </span>requests ${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}
                                        </div>
                                    </div>
                                    <div className="transaction-details">
                                        {transaction.details}
                                    </div>
                                </div>
                            </div>
                            <div className="pending-icons">
                                <button className="pending-button" onClick={() => deleteTrans(transaction)}>
                                    Decline
                                </button>
                                <button className="pending-button" onClick={() => acceptTrans(transaction)}>
                                    Pay
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {friendInvites?.map(invite => {
                return (
                    <div key={invite.id}>
                        <p>{users[invite.sender_id]?.first_name} sent you a friend request</p>
                        <button onClick={() => acceptFriend(invite)}>Accept</button>
                        <button onClick={() => ignoreRequest(invite)}>Ignore</button>
                    </div>
                )
            })}
            {friendRequests?.map(request => {
                return (
                    <div key={request.id}>
                        You sent {users[request.recipient_id]?.first_name} {users[request.recipient_id]?.last_name} a friend request
                    </div>
                )
            })}
        </div>
    );
}
export default PendingTransactions;
