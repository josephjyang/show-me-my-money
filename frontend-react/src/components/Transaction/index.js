import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { createComment, deleteComment, updateComment } from "../../store/comments";
import { getTransactions } from "../../store/transactions";
import './Transaction.css';

const Transaction = () => {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)
    const { transactionId } = useParams();
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState();
    const [edit, setEdit] = useState(false);
    const [editContent, setEditContent] = useState();
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
        setContent("")
        await dispatch(createComment(newComment, transaction)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
        dispatch(getTransactions(user))
    }
    
    const editSubmit = async e => {
        e.preventDefault();

        let editedComment = transaction.comments[edit]
        
        editedComment.content = editContent
        
        const data = await dispatch(updateComment(editedComment));
        if (data.errors) setErrors(data.errors)
        else {
            dispatch(getTransactions(user));
            setEditContent("");
            setEdit(false);
        }
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
                        <i className="fas fa-heart" />
                        <NavLink to={`/transactions/${transaction.id}`}>
                            <i className="fas fa-comment" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div id="transaction-comments-container">
                {comments.map(comment => (
                    <div key={comment.id}>
                        <img className="creator-picture" src={comment.user.profile_pic} alt="commenter" />
                        {edit === comment.id ? (
                            <form onSubmit={editSubmit}>
                                <input
                                    className={errors.details ? "error comment-field" : "comment-field"}
                                    id="comment-field"
                                    type='text'
                                    placeholder='Write a comment...'
                                    name='comment'
                                    onChange={e => setEditContent(e.target.value)}
                                    value={editContent}
                                    required={true}
                                />
                            </form>
                        ) : comment.content}
                        <i className="fas fa-edit" onClick={() => {
                            setEdit(comment.id)
                            setEditContent(comment.content)
                            }}></i>
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