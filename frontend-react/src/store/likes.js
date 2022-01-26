const LOAD_LIKES = 'likes/LOAD_LIKES';
const ADD_LIKE = 'likes/ADD_LIKE';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';
const CLEAR_LIKES = 'likes/CLEAR_LIKES';

const loadLikes = (likes) => ({
    type: LOAD_LIKES,
    likes
});

const addLike = like => {
    return {
        type: ADD_LIKE,
        like
    }
}

const removeLike = like => {
    return {
        type: REMOVE_LIKE,
        like
    }
}

const initialState = {};

export const getLikes = () => async dispatch => {
    const res = await fetch(`/api/likes/`)
    const likes = await res.json();
    dispatch(loadLikes(likes));
    return likes;
}

export const createLike = newLike => async dispatch => {
    const res = await fetch(`/api/transactions/${newLike.transaction_id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLike)
    });
    const like = await res.json();
    if (res.ok) {
        dispatch(addLike(like))
        return like
    }
}

export const deleteLike = like => async dispatch => {
    const res = await fetch(`/api/likes/${like.id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(removeLike(like))
        return data
    }
}

export const clearLikes = () => {
    return {
        type: CLEAR_LIKES
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_LIKES:
            const likes = {}
            action.likes.likes.forEach(like => {
                likes[like.id] = like
            })
            return { ...state, ...likes }
        case ADD_LIKE:
            newState[action.like.id] = action.like
            return newState;
        case REMOVE_LIKE:
            delete newState[action.like.id]
            return newState;
        case CLEAR_LIKES:
            return {};
        default:
            return state;
    }
}