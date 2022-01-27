const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const CLEAR_FRIENDS = 'friends/CLEAR_FRIENDS';
const ADD_FRIEND = 'friends/ADD_FRIEND';
const REMOVE_FRIEND = 'friends/REMOVE_FRIEND';

const loadFriends = (user, friends) => ({
    type: LOAD_FRIENDS,
    user,
    friends
});

const addFriend = friend => ({
    type: ADD_FRIEND,
    friend
});

const removeFriend = friend => ({
    type: REMOVE_FRIEND,
    friend
})

const initialState = { };

export const getFriends = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friends`)
    const friends = await res.json();
    dispatch(loadFriends(user, friends));
    return friends;
}

export const createFriend = invite => async dispatch => {
    const res = await fetch(`/api/users/${invite.recipient_id}/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invite)
    });
    const newFriend = await res.json();
    if (res.ok) {
        dispatch(addFriend(newFriend));
        return newFriend;
    }
}

export const deleteFriend = (friend, user) => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friends/${friend.id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(removeFriend(friend));
        return data;
    }
}

export const clearFriends = () => {
    return {
        type: CLEAR_FRIENDS
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_FRIENDS:
            const friends = {}
            Object.values(action.friends.friends).forEach(friend => {
                friends[friend.id] = friend
            })
            return { ...state, ...friends }
        case ADD_FRIEND:
            newState[action.friend.id] = action.friend;
            return newState;
        case REMOVE_FRIEND:
            delete newState[action.friend.id]
            return newState;
        case CLEAR_FRIENDS:
            return {};
        default:
            return state;
    }
}