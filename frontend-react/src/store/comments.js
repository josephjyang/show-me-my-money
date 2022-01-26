const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
const CLEAR_COMMENTS = 'comments/CLEAR_COMMENTS';

const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
});

const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

const removeComment = comment => {
    return {
        type: REMOVE_COMMENT,
        comment
    }
}

const initialState = {};

export const getComments = () => async dispatch => {
    const res = await fetch(`/api/comments/`)
    const comments = await res.json();
    dispatch(loadComments(comments));
    return comments;
}

export const createComment = (newComment, transaction) => async dispatch => {
    const res = await fetch(`/api/transactions/${transaction.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
    });
    const comment = await res.json();
    if (res.ok) {
        dispatch(addComment(comment))
        return comment
    }
}

export const deleteComment = comment => async dispatch => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(removeComment(comment))
        return data
    }
}

export const updateComment = comment => async dispatch => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(addComment(data))
        return data
    } else return data;
}

export const clearComments = () => {
    return {
        type: CLEAR_COMMENTS
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_COMMENTS:
            const comments = {}
            action.comments.comments.forEach(comment => {
                comments[comment.id] = comment
            })
            return { ...state, ...comments }
        case ADD_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.comment.id]
            return newState;
        case CLEAR_COMMENTS:
            return {};
        default:
            return state;
    }
}