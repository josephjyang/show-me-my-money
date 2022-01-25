const LOAD_REQUESTS = 'friendRequests/LOAD_REQUESTS';
const CLEAR_REQUESTS = 'friends/CLEAR_REQUESTS';
const ADD_REQUEST = 'friendRequests/ADD_REQUEST'

const loadFriendRequests = (user, friendRequests) => ({
    type: LOAD_REQUESTS,
    user,
    friendRequests
});

const addFriendRequest = friendRequest => {
    return {
        type: ADD_REQUEST,
        friendRequest
    }
}

const initialState = {};

export const getFriendRequests = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friend-requests`)
    const friendRequests = await res.json();
    dispatch(loadFriendRequests(user, friendRequests));
    return friendRequests;
}

export const createFriendRequest = friendRequest => async dispatch => {
    const res = await fetch(`/api/friend-requests/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(friendRequest)
    });
    const request = await res.json();
    if (res.ok) {
        dispatch(addFriendRequest(request))
        return request;
    }
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
            Object.values(action.friendRequests.friend_requests).forEach(request => {
                friendRequests[request.id] = request
            })
            return { ...state, ...friendRequests }
        case ADD_REQUEST:
            newState[action.friendRequest.id] = action.friendRequest
            return newState;
        case CLEAR_REQUESTS:
            return {};
        default:
            return state;
    }
}