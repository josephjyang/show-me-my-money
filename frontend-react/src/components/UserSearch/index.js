import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useMode } from '../../context/AppContext';
import { getUsers } from '../../store/users';
import './UserSearch.css'

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

const UserSearchBar = ({ loaded }) => {
    const user = useSelector(state => state.session.user);
    const stateUsers = useSelector(state => state.users);
    const users = Object.values(stateUsers);
    const { dark } = useMode();
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

    if (!loaded) {
        return null;
    }
    
    return (
        <div id="users-search-ctr">
            <form
                action="/"
                method="get"
                autoComplete="on"
                id="users-search"
            >
                <label htmlFor="header-search">
                    <span className="visually-hidden">
                        Search users
                    </span>
                </label>
                <i className={`fas fa-search ${dark}`}></i>
                <input
                    value={searchQuery}
                    onInput={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    id="user-header-search"
                    name="s"
                    className={dark}
                    placeholder="Search for users"
                />
            </form>
            <div id="users-search-results" className={dark}>
                {searchQuery && filteredUsers.map(user => (
                    <NavLink className="search-links" to={`/users/${user.id}`} key={user.id} >
                        <div className="user-card">
                            {user?.profile_pic ? <img className="creator-picture" src={user.profile_pic} alt="creator" /> : <div className="replacement-photo">{user?.first_name[0]}-{user?.last_name[0]}</div>}
                            <div className="user-card-info">
                                <div className="user-card-name">{user.first_name} {user.last_name}</div>
                                <div className="user-card-name">@{user.username}</div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default UserSearchBar;