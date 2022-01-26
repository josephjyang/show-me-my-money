const LOAD_USERS = 'users/LOAD_USERS';
const CLEAR_USERS = 'users/CLEAR_USERS';
const ADD_USER = 'users/ADD_USER';

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
});

const addUser = user => {
    return {
        type: ADD_USER,
        user
    }
}

const initialState = {};

export const getUsers = () => async dispatch => {
    const res = await fetch(`/api/users/`);
    const users = await res.json();
    dispatch(loadUsers(users));
    return users;
}

export const updateUser = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    
    const data = await res.json();

    if (res.ok) {
        dispatch(addUser(data))
        return data
    } else return data;
}

export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_USERS:
            const users = {}
            action.users.users.forEach(user => {
                users[user.id] = user;
            })
            return { ...state, ...users }
        case ADD_USER:
            newState[action.user.id] = action.user
            return newState;
        case CLEAR_USERS:
            return {};
        default:
            return state;
    }
}