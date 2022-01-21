const LOAD_USERS = 'users/LOAD_USERS';

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
});

const initialState = {};

export const getUsers = () => async dispatch => {
    const res = await fetch(`/api/users`);
    const users = await res.json();
    dispatch(loadUsers(users));
    return users;
}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_USERS:
            const users = {}
            console.log((action.users));
            action.users.users.forEach(user => {
                users[user.id] = user;
            })
            console.log(users)
            return { ...state, ...users }
        default:
            return state;
    }
}