import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMode } from '../../context/AppContext';
import { getFriends } from '../../store/friends';
import { getChats, createChat } from '../../store/chats';
import './FriendsSearch.css'

const filterFriends = (users, query) => {
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

const FriendsSearchBar = ({ stateChats }) => {
    const user = useSelector(state => state.session.user);
    const stateFriends = useSelector(state => state.friends);
    const friends = Object.values(stateFriends).filter(friend => !stateChats[friend.id]);
    const { dark } = useMode();
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredFriends = filterFriends(friends, searchQuery);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(getFriends(user));
        }
    }, [dispatch, user]);

    const addChat = async friend => {
        const newChat = {
            user_id: user.id,
            friend_id: friend.id
        }
        await dispatch(createChat(newChat));
        dispatch(getChats(user));
    }


    return (
        <div id="friends-search-ctr">
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
                    placeholder="Start a new chat"
                />
            </form>
            <div id="friends-search-results" className={dark}>
                {searchQuery && filteredFriends.map(user => (
                    <div className="search-links" key={user.id} onClick={() => addChat(user)} >
                        <div className="user-card">
                            {user?.profile_pic ? <img className="creator-picture" src={user.profile_pic} alt="creator" /> : <div className="replacement-photo">{user?.first_name[0]}-{user?.last_name[0]}</div>}
                            <div className="user-card-info">
                                <div className="user-card-name">{user.first_name} {user.last_name}</div>
                                <div className="user-card-name">@{user.username}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsSearchBar;