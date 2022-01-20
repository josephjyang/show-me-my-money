const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const REMOVE_USER = 'session/REMOVE_USER';

const loadFriends = (user, friends) => ({
    type: LOAD_FRIENDS,
    user,
    friends
});

const removeUser = () => ({
    type: REMOVE_USER
})

const initialState = { };

export const getFriends = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friends`)
    const friends = await res.json();
    dispatch(loadFriends(user, friends));
    return friends;
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_FRIENDS:
            const friends = {}
            
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null }
        default:
            return state;
    }
}