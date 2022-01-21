import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const SearchBar = ({ setFriend, friend }) => {
    const stateUsers = useSelector(state => state.users);
    const users = Object.values(stateUsers);
    console.log(users)
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredUsers = filterUsers(users, searchQuery);
    
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
                    placeholder="Search users"
                    name="s"
                />
            </form>
            <div id="search-results">
                {searchQuery && !friend && filteredUsers.map(user => (
                    <div onClick={() => setFriend(user)}key={user.id} className="user-card">
                        <img className="user-card-pic" src={user.profile_pic} alt="user profile" />
                        <div className="user-card-info">
                                <div>{user.first_name} {user.last_name}</div>
                                <div>{user.username}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchBar;