const LOAD_CHATS = 'chats/LOAD_CHATS';
const ADD_CHAT = 'chats/ADD_CHAT';
const REMOVE_CHAT = 'chats/REMOVE_CHAT';
const CLEAR_CHATS = 'chats/CLEAR_CHATS';

const loadChats = (chats, user) => ({
    type: LOAD_CHATS,
    chats,
    user
});

const addChat = chat => {
    return {
        type: ADD_CHAT,
        chat
    }
}

const removeChat = chat => {
    return {
        type: REMOVE_CHAT,
        chat
    }
}

const initialState = {};

export const getChats = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/chats`)
    const chats = await res.json();
    dispatch(loadChats(chats, user));
    return chats;
}

export const createChat = (newChat) => async dispatch => {
    const res = await fetch(`/api/users/${newChat.user_id}/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChat)
    });
    const chat = await res.json();
    if (res.ok) {
        dispatch(addChat(chat))
        return chat
    }
}

export const deleteChat = chat => async dispatch => {
    const res = await fetch(`/api/chats/${chat.id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(removeChat(chat))
        return data
    }
}

export const updateChat = chat => async dispatch => {
    const res = await fetch(`/api/chats/${chat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chat)
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(addChat(data))
        return data
    } else return data;
}

export const clearChats = () => {
    return {
        type: CLEAR_CHATS
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CHATS:
            const chats = {}
            action.chats.chats.forEach(chat => {
                if (chat.friend_id === action.user.id) chats[chat.user_id] = chat
                else chats[chat.friend_id] = chat
            })
            return { ...state, ...chats }
        case ADD_CHAT:
            newState[action.chat.friend_id] = action.chat
            return newState;
        case REMOVE_CHAT:
            delete newState[action.chat.id]
            return newState;
        case CLEAR_CHATS:
            return {};
        default:
            return state;
    }
}