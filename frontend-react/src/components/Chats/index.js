import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../../store/chats';
import Chat from '../Chat';
import FriendsSearchBar from '../FriendsSearch';
import './Chats.css';

const Chats = () => {
    const user = useSelector(state => state.session.user);
    const stateChats = useSelector(state => state.chats);
    const chats = Object.values(useSelector(state => state.chats));
    chats.sort((a, b) => {
        return Date.parse(b.messages[b.messages.length - 1].updated_at) - Date.parse(a.messages[a.messages.length - 1].updated_at);
    })
    const dispatch = useDispatch();
    const [chatroom, setChatroom] = useState("");

    useEffect(() => {
        dispatch(getChats(user));
    }, [dispatch, user, chatroom])

    const convertDate = date => {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options)
    }

    return (user && (
        <div id="chats-container">
            <div id="chats-list">
                <h2>Messages</h2>
                <FriendsSearchBar stateChats={stateChats} />
                {chats.map((chat, ind) => (
                    <div className="chat-container" key={ind} onClick={() => setChatroom(chat)}>
                        {chat.user_id === user.id ? chat.friend.profile_pic ? <img src={chat.friend.profile_pic} alt="user profile" className="chat-pic" /> : <div className="chat-pro-replace">{chat.friend.first_name[0]}-{chat.friend.last_name[0]}</div> : chat.user.profile_pic ? <img src={chat.user.profile_pic} alt="user profile" className="chat-pic" /> : <div className="chat-pro-replace">{chat.user.first_name[0]}-{chat.user.last_name[0]}</div>}
                        <div className="chat-details">
                            <div className="message-name">
                                {`${chat.user.id === user.id ? `${chat.friend.first_name} ${chat.friend.last_name}`: `${chat.user.first_name} ${chat.user.last_name}`}`}
                            </div>
                            <div className="message-recent">
                                {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : "Start a new chat"}
                            </div>
                        </div>
                        <div className="chat-date">
                            {convertDate(chat.messages[chat.messages.length - 1].updated_at)}
                        </div>
                    </div>
                ))}
            </div>
            <Chat chatroom={chatroom} />
        </div>
    )
    )
};

export default Chats;