import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import { createComment, deleteComment } from "../../store/comments";
import { createTransaction, updateTransaction, getTransactions } from "../../store/transactions";
import SearchBar from "../Search";
import './Transaction.css';

const Transaction = () => {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)
    const { transactionId } = useParams();
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState();
    const transaction = transactions[transactionId]
    const comments = Object.values(transaction.comments)
    const dispatch = useDispatch();
    const history = useHistory();

    const removeComment = async comment => {
        await dispatch(deleteComment(comment));
        dispatch(getTransactions(user));
    }

    const onSubmit = async e => {
        e.preventDefault();
        const newComment = {
            user_id: user.id,
            transaction_id: transaction.id,
            content
        }
        await dispatch(createComment(newComment, transaction)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
        dispatch(getTransactions(user))
    }

    return (
        <div id="transaction-container">
            <div className="transaction-information">
                <img className="creator-picture" src={transaction.creator.profile_pic} alt="creator" />
                <div className="transaction-info">
                    <span className="user-name">{transaction.creator.first_name} </span>
                    {transaction.payer_id === transaction.creator_id ?
                        <span>paid <span className="user-name">{transaction.payee.first_name}</span></span>
                        : <span>charged <span className="user-name">{transaction.payer.first_name}</span></span>}
                    {(transaction.payer_id === user.id || transaction.payee_id === user.id) && <span> ${transaction.amount}</span>}
                    <div className="transaction-details">
                        {transaction.details}
                    </div>
                    <div className="icon-container">
                        <i class="fas fa-heart" />
                        <NavLink to={`/transactions/${transaction.id}`}>
                            <i class="fas fa-comment" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div id="transaction-comments-container">
                {comments.map(comment => (
                    <div>
                        <img className="creator-picture" src={comment.user.profile_pic} alt="commenter" />
                        {comment.content}
                        <i className="fas fa-trash" onClick={() => removeComment(comment)}></i>
                    </div>
                ))}
            </div>
            <div id="comment-form-container">
                <div id="comment-form">
                    <div id="comment-details">
                        <img className="creator-picture" src={user.profile_pic} alt="creator" />
                        <input
                            className={errors.details ? "error comment-field" : "comment-field"}
                            id="comment-field"
                            type='text'
                            placeholder='Write a comment...'
                            name='comment'
                            onChange={e => setContent(e.target.value)}
                            value={content}
                            required={true}
                        />
                    </div>
                    {errors.comment && <p className="comment-error">{errors.comment}</p>}
                    <div id="comment-buttons">
                        <button id="comment-button" type="button" onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;