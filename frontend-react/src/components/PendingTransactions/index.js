import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createFriend } from '../../store/friends';
import { getTransactions } from '../../store/transactions';
import { authenticate } from '../../store/session';
import { deleteFriendRequest } from '../../store/friendRequests';
import { deleteTransaction, updateTransaction } from '../../store/transactions';
import { getUsers, updateUser } from '../../store/users';
import UserSearchBar from '../UserSearch';
import './PendingTransactions.css'
import { useMode } from '../../context/AppContext';

function PendingTransactions({ loaded }) {
    const user = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const transactions = useSelector(state => state.transactions);
    const { dark } = useMode();
    const userTransactions = Object.values(transactions);
    userTransactions.sort((a, b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at)
    })
    const requests = userTransactions.filter(transaction => !transaction.paid && transaction.payee_id === user.id)
    const invoices = userTransactions.filter(transaction => !transaction.paid && transaction.payer_id === user.id)
    const friendRequests = Object.values(user.friend_requests_sent);
    const friendInvites = Object.values(user.friend_requests_received);

    const history = useHistory()
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

    const deleteTrans = async transaction => {
        await dispatch(deleteTransaction(transaction));
        dispatch(getTransactions(user));
    }

    const acceptTrans = async transaction => {
        if (transaction) {
            transaction.paid = true;
            user.balance -= Number(transaction.amount);
            transaction.creator.balance = Number(transaction.creator.balance) + Number(transaction.amount);
            await dispatch(updateTransaction(transaction));
            await dispatch(updateUser(user));
            await dispatch(updateUser(transaction.creator));
            dispatch(getTransactions(user));
            dispatch(authenticate());
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
        <div id="pending" className={dark}>
            <UserSearchBar loaded={loaded}/>
            {requests.length > 0 && (<div className={`pending-box ${dark}`}>
                <h2 className='pending-header'>Pending Requests</h2>
                {requests.map(transaction => {
                    return (
                        <div className="pending-container" key={transaction.id}>
                            <div className="transaction-information">
                                <div className="transaction-picture">
                                    {transaction.payer?.profile_pic ? <img className="creator-picture" src={transaction.payer?.profile_pic} alt="creator" /> : <div className="replacement-photo">{transaction.payer?.first_name[0]}-{transaction.payer?.last_name[0]}</div>}
                                </div>
                                <div className="pending-content">
                                    <div className="content-header">
                                        <div className="content-header-names">
                                            Request to <NavLink to={`/users/${transaction.payer.id}`} className={`user-name ${dark}`}>{transaction.payer.first_name}</NavLink>
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
                                <button className="pending-button">
                                    <NavLink to={`/transactions/${transaction.id}/edit`}>
                                        Edit
                                    </NavLink>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>)}
            {invoices.length > 0 &&
                (<div className={`pending-box ${dark}`}>
                    <h2 className='pending-header'>Pending Charges</h2>
                    {invoices.map(transaction => {
                        return (
                            <div className="pending-container" key={transaction.id}>
                                <div className="transaction-information">
                                    <div className="transaction-picture">
                                        {transaction.creator?.profile_pic ? <img className="creator-picture" src={transaction.creator?.profile_pic} alt="creator" /> : <div className="replacement-photo">{transaction.creator?.first_name[0]}-{transaction.creator?.last_name[0]}</div>}
                                    </div>
                                    <div className="pending-content">
                                        <div className="content-header">
                                            <div className="content-header-names">
                                                <NavLink to={`/users/${transaction.creator.id}`} className={`user-name ${dark}`}>{transaction.creator.first_name}</NavLink> requests ${transaction.amount % 1 !== 0 ? Intl.NumberFormat('en-US').format(transaction.amount) : Intl.NumberFormat('en-US').format(transaction.amount) + ".00"}
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
                </div>)}
            {friendInvites.length > 0 && (
                <div className={`pending-box ${dark}`}>
                    <h2 className='pending-header'>Pending Friend Invites</h2>
                    {friendInvites?.map(invite => {
                        return users[invite.sender_id]?.first_name && (
                            <div className="friend-request-box" key={invite.id}>
                                <div className="friend-request-details">
                                    <div className="transaction-picture">
                                        {users[invite.sender_id]?.profile_pic ? <img className="creator-picture" src={users[invite.sender_id]?.profile_pic} alt="creator" /> : <div className="replacement-photo">{users[invite.sender_id]?.first_name[0]}-{users[invite.sender_id]?.last_name[0]}</div>}
                                    </div>
                                    <p className="request-info"><NavLink to={`/users/${users[invite.sender_id]?.id}`} className={`user-name ${dark}`}>{`${users[invite.sender_id]?.first_name} `} </NavLink>sent you a friend request</p>
                                </div>
                                <div className="pending-button-ctr">
                                    <button className="pending-button invite" onClick={() => acceptFriend(invite)}>Accept</button>
                                    <button className="pending-button invite" onClick={() => ignoreRequest(invite)}>Ignore</button>
                                </div>
                            </div>
                        )
                    })}
                </div>)}
            {friendRequests.length > 0 && (
                <div className={`pending-box ${dark}`}>
                    <h2 className='pending-header'>Pending Friend Requests</h2>
                    {friendRequests?.map(request => {
                        return users[request.recipient_id]?.first_name && (
                            <div className="friend-request-box" key={request.id}>
                                <div className="friend-request-details">
                                    <div className="transaction-picture">
                                        {users[request.recipient_id]?.profile_pic ? <img className="creator-picture" src={users[request.recipient_id]?.profile_pic} alt="creator" /> : <div className="replacement-photo">{users[request.recipient_id]?.first_name[0]}-{users[request.recipient_id]?.last_name[0]}</div>}
                                    </div>
                                    <p className="request-info">
                                        You sent 
                                        <NavLink to={`/users/${users[request.recipient_id]?.id}`} className={`user-name ${dark}`}>{` ${users[request.recipient_id]?.first_name} ${users[request.recipient_id]?.last_name} `}</NavLink>
                                         a friend request
                                    </p>
                                </div>
                                <button onClick={() => ignoreRequest(request)} className="pending-button cancel">Cancel</button>
                            </div>
                        )
                    })}
                </div>)}
        </div>
    );
}
export default PendingTransactions;
