import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { useMode } from '../../context/AppContext';
import { getChats } from '../../store/chats';
import Chat from '../Chat';
import FriendsSearchBar from '../FriendsSearch';
import './Chats.css';

const Chats = ({ loaded }) => {
    const user = useSelector(state => state.session.user);
    const stateChats = useSelector(state => state.chats);
    const chats = Object.values(useSelector(state => state.chats));
    chats.sort((a, b) => {
        if (a.messages.length > 0 && b.messages.length > 0) return Date.parse(b.messages[b.messages.length - 1].updated_at) - Date.parse(a.messages[a.messages.length - 1].updated_at);
        else return Date.parse(b.created_at) - Date.parse(a.created_at)
    })
    const dispatch = useDispatch();
    const { dark, chatroom, setChatroom } = useMode();

    useEffect(() => {
        dispatch(getChats(user));
    }, [dispatch, user, chatroom])

    const convertDate = date => {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options)
    }

    if (!loaded) {
        return null;
    }

    return (user && (
        <div id="chats-container" className={dark}>
            <div id="chats-list" className={`${dark} ${chatroom.id ? "selected" : ""}`}>
                <h2>Messages</h2>
                <FriendsSearchBar stateChats={stateChats} />
                {chats.map((chat, ind) => {
                    let friend;
                    if (chat.user_id === user.id) friend = chat.friend
                    else friend = chat.user
                    return (
                        <NavLink to={`/messages/${chat.id}`} className="chat-container" key={ind} onClick={() => setChatroom(chat)}>
                            <div className="chat-content">
                                {friend.profile_pic ? <img src={friend.profile_pic} alt="user profile" className="chat-pic" /> : <div className="chat-pro-replace">{friend.first_name[0]}-{friend.last_name[0]}</div>}
                                <div className="chat-details">
                                    <div className="message-name">
                                        {`${friend.first_name} ${friend.last_name}`}
                                    </div>
                                    <div className="message-recent">
                                        {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : "Start a new chat"}
                                    </div>
                                </div>
                            </div>
                            <div className="chat-date">
                                {convertDate(chat.messages.length ? chat.messages[chat.messages.length - 1].updated_at : chat.updated_at)}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <Route path='/messages/:messageId' exact={true}>
                <Chat chatroom={chatroom} setChatroom={setChatroom} />
            </Route>
        </div>
    )
    )
};

export default Chats;