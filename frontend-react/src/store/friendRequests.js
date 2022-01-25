const LOAD_REQUESTS = 'friendRequests/LOAD_REQUESTS';
const CLEAR_REQUESTS = 'friends/CLEAR_REQUESTS';

const loadFriendRequests = (user, friendRequests) => ({
    type: LOAD_REQUESTS,
    user,
    friendRequests
});

const initialState = {};

export const getFriendRequests = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friend-requests`)
    const friendRequests = await res.json();
    dispatch(loadFriendRequests(user, friendRequests));
    return friendRequests;
}

export const clearFriendRequests = () => {
    return {
        type: CLEAR_REQUESTS
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_REQUESTS:
            const friendRequests = {}
            console.log(action.friendRequests);
            Object.values(action.friendRequests.friendRequests).forEach(request => {
                friendRequests[request.id] = request
            })
            return { ...state, ...friendRequests }
        case CLEAR_REQUESTS:
            return {};
        default:
            return state;
    }
}