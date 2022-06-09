import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { createComment, deleteComment, updateComment } from "../../store/comments";
import { getTransactions } from "../../store/transactions";
import { createLike, deleteLike } from "../../store/likes";
import './Transaction.css';
import { useMode } from "../../context/AppContext";

const Transaction = () => {
    const user = useSelector(state => state.session.user);
    const transactions = useSelector(state => state.transactions)
    const { transactionId } = useParams();
    const { dark } = useMode();
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState("");
    const [edit, setEdit] = useState(false);
    const [editContent, setEditContent] = useState("");
    const transaction = transactions[transactionId]
    const comments = transaction ? Object.values(transaction.comments) : {}
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getTransactions(user));
        }
    }, [dispatch, user])

    const removeComment = async comment => {
        await dispatch(deleteComment(comment));
        dispatch(getTransactions(user));
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (!content) return;
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
        if (!editContent) return;

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
        <>
            {transaction && (
                <div id="transaction-page" className={dark}>
                    <div id="transaction-container">
                        <div className="trans-information">
                            {transaction.creator?.profile_pic ? <img className="creator-picture" src={transaction.creator?.profile_pic} alt="creator" /> : <div className="replacement-photo">{transaction.creator?.first_name[0]}-{transaction.creator?.last_name[0]}</div>}
                            <div className="transaction-info">
                                <span className={`user-name ${dark}`}>{transaction.creator.first_name} </span>
                                {transaction.payer_id === transaction.creator_id ?
                                    <span>paid <span className={`user-name ${dark}`}>{transaction.payee.first_name}</span></span>
                                    : <span>charged <span className={`user-name ${dark}`}>{transaction.payer.first_name}</span></span>}
                                {(transaction.payer_id === user.id || transaction.payee_id === user.id) && <span> ${Intl.NumberFormat('en-US').format(transaction.amount)}</span>}
                                <div className="transaction-details">
                                    {transaction.details}
                                </div>
                                <div className="icon-container">
                                    <div className="likes-container">
                                        {transaction.likes[user.id] ? <i className="fas fa-heart liked" onClick={() => removeLike(transaction.likes[user.id])} /> : <i className="fas fa-heart" onClick={() => addLike(transaction)} />}
                                        {Object.keys(transaction.likes).length > 0 && Object.keys(transaction.likes).length}
                                    </div>
                                    <div className="comments-container">
                                        <NavLink to={`/transactions/${transaction.id}`}>
                                            <i className="fas fa-comment" />
                                        </NavLink>
                                        {Object.keys(transaction.comments).length > 0 && Object.keys(transaction.comments).length}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="transaction-comments-container">
                            {comments.map(comment => (
                                <div className="comment-container" key={comment.id}>
                                    <img className="creator-picture" src={comment.user.profile_pic} alt="commenter" />
                                    <div className="comment-content-ctr">
                                        <div className="comment-inner-ctr">
                                            <div className="commenter-fname">{comment.user.first_name}</div>
                                            {edit === comment.id ? (
                                                <form className="edit-comment-form" onSubmit={editSubmit}>
                                                    <input
                                                        className={errors[comment.id] ? `error edit comment-field ${dark}` : `edit comment-field ${dark}`}
                                                        id="comment-field"
                                                        type='text'
                                                        placeholder='Write a comment...'
                                                        name='comment'
                                                        onChange={e => {
                                                            setEditContent(e.target.value);
                                                            if (e.target.value.length <= 0) errors[comment.id] = "Please enter a comment"
                                                            else delete errors[comment.id]
                                                        }}
                                                        value={editContent}
                                                        required={true}
                                                    />
                                                    {errors[comment.id] && <div className="edit-error">{errors[comment.id]}</div>}
                                                </form>
                                            ) : (<div>{comment.content}</div>)}
                                        </div>
                                        {comment.user_id === user.id &&
                                            <div className="transaction-icons">
                                                <i className="fas fa-edit" onClick={() => {
                                                    setEdit(comment.id)
                                                    setEditContent(comment.content)
                                                }}></i>
                                                <i className="fas fa-trash" onClick={() => removeComment(comment)}></i>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="comment-form-container">
                            <div id="comment-form" className={dark}>
                                <div id="comment-details-container">
                                    <div id="comment-details" className={dark}>
                                        <img className="comment-picture" src={user.profile_pic} alt="creator" />
                                        <form id="new-comment-form" className={dark} onSubmit={onSubmit}>
                                            <input
                                                className={errors.comment ? `error comment-field ${dark}` : `comment-field ${dark}`}
                                                id="comment-field"
                                                type='text'
                                                placeholder='Write a comment...'
                                                name='comment'
                                                onChange={e => {
                                                    setContent(e.target.value);
                                                    if (e.target.value.length <= 0) errors.comment = "Please enter a comment"
                                                    else delete errors.comment;
                                                }}
                                                value={content}
                                                required={true}
                                            />
                                        </form>
                                    </div>
                                    {errors.comment && <p className="comment-error">{errors.comment}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default Transaction;