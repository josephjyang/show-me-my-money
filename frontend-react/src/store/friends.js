const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const CLEAR_FRIENDS = 'friends/CLEAR_FRIENDS';

const loadFriends = (user, friends) => ({
    type: LOAD_FRIENDS,
    user,
    friends
});

const initialState = { };

export const getFriends = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friends`)
    const friends = await res.json();
    dispatch(loadFriends(user, friends));
    return friends;
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
            console.log(action.friends);
            Object.values(action.friends.friends).forEach(friend => {
                friends[friend.id] = friend
            })
            return { ...state, ...friends }
        case CLEAR_FRIENDS:
            return {};
        default:
            return state;
    }
}