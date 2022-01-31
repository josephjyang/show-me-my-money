import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMode } from '../../context/AppContext';
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
    const { dark } = useMode()
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
                    className={dark}
                    name="s"
                    placeholder="Name or @username"
                />
            </form>
            <div id="search-results" className={dark}>
                {searchQuery && !friend && filteredUsers.map(friend => (
                    <div onClick={() => {
                        setFriend(friend);
                        delete errors.friend;
                        if (friend.id === user.id) errors.friend = "You cannot pay yourself. Please select another user."
                    }} key={friend.id} className="user-card">
                        {friend?.profile_pic ? <img className="creator-picture" src={friend.profile_pic} alt="creator" /> : <div className="replacement-photo">{friend?.first_name[0]}-{friend?.last_name[0]}</div>}
                        <div className="user-card-info">
                            <div>{friend.first_name} {friend.last_name}</div>
                            <div>@{friend.username}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchBar;