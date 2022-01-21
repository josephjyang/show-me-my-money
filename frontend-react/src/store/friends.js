const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';

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
        default:
            return state;
    }
}