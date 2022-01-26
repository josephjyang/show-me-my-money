const LOAD_REQUESTS = 'friendRequests/LOAD_REQUESTS';
const CLEAR_REQUESTS = 'friends/CLEAR_REQUESTS';
const ADD_REQUEST = 'friendRequests/ADD_REQUEST';
const CANCEL_REQUEST = 'friendRequests/CANCEL_REQUEST';

const loadFriendRequests = (user, friendRequests) => ({
    type: LOAD_REQUESTS,
    user,
    friendRequests
});

const addFriendRequest = (friendRequest, user) => {
    return {
        type: ADD_REQUEST,
        friendRequest,
        user
    }
}

const cancelFriendRequest = (friendRequest, user) => {
    return {
        type: CANCEL_REQUEST,
        friendRequest,
        user
    }
}

const initialState = {};

export const getFriendRequests = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/friend-requests`)
    const friendRequests = await res.json();
    dispatch(loadFriendRequests(user, friendRequests));
    return friendRequests;
}

export const createFriendRequest = (friendRequest, user) => async dispatch => {
    const res = await fetch(`/api/friend-requests/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(friendRequest)
    });
    const request = await res.json();
    if (res.ok) {
        dispatch(addFriendRequest(request, user))
        return request;
    }
}

export const deleteFriendRequest = (request, user) => async dispatch => {
    const res = await fetch(`/api/friend-requests/${request.id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(cancelFriendRequest(request, user))
        return data
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
            Object.values(action.friendRequests.friend_requests).forEach(request => {
                if (action.user.id === request.recipient_id) friendRequests[request.sender_id] = request
                else friendRequests[request.recipient_id] = request
            })
            return { ...state, ...friendRequests }
        case ADD_REQUEST:   
            newState[action.friendRequest.recipient_id] = action.friendRequest
            return newState;
        case CANCEL_REQUEST:
            if (action.friendRequest.recipient_id === action.user.id) delete newState[action.friendRequest.sender_id]
            else delete newState[action.friendRequest.recipient_id]
            return newState;
        case CLEAR_REQUESTS:
            return {};
        default:
            return state;
    }
}