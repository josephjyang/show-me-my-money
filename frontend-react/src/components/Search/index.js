import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';
import './Search.css'

const filterUsers = (users, query) => {
    if (!query) {
        return users;
    }

    return users.filter(user => {
        const username = user.username.toLowerCase();
        const firstName = user.first_name.toLowerCase();
        const lastName = user.last_name.toLowerCase();
        const term = query.toLowerCase()
        return username.includes(term) || firstName.includes(term) || lastName.includes(term);
    });
};

const SearchBar = ({ setFriend, friend, errors }) => {
    const user = useSelector(state => state.session.user);
    const stateUsers = useSelector(state => state.users);
    const users = Object.values(stateUsers);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredUsers = filterUsers(users, searchQuery);
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getUsers());
        }
    }, [dispatch, user])


    return (
        <>
            <form
                action="/"
                method="get"
                autoComplete="on"
            >
                <label htmlFor="header-search">
                    <span className="visually-hidden">
                        Search users
                    </span>
                </label>
                <input
                    value={searchQuery}
                    onInput={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    name="s"
                    placeholder="Name or @username"
                />
            </form>
            <div id="search-results">
                {searchQuery && !friend && filteredUsers.map(user => (
                    <div onClick={() => {
                        setFriend(user);
                        delete errors.friend;
                        }}key={user.id} className="user-card">
                        <img className="user-card-pic" src={user.profile_pic} alt="user profile" />
                        <div className="user-card-info">
                                <div>{user.first_name} {user.last_name}</div>
                                <div>@{user.username}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchBar;