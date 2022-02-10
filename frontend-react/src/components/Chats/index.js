import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../../store/chats';
import Chat from '../Chat';
import FriendsSearchBar from '../FriendsSearch';
import './Chats.css';

const Chats = () => {
    const user = useSelector(state => state.session.user);
    const chats = Object.values(useSelector(state => state.chats))
    const dispatch = useDispatch();
    const [chatroom, setChatroom] = useState("");

    useEffect(() => {
        dispatch(getChats(user));
    }, [dispatch, user, chatroom])

    return (user && (
        <div id="chats-container">
            <div id="chats-list">
                <h2>Messages</h2>
                <FriendsSearchBar />
                {chats.map((chat, ind) => (
                    <div className="chat-container" key={ind} onClick={() => setChatroom(chat)}>
                        <div className="message-name">
                            {`${chat.user.id === user.id ? `${chat.friend.first_name} ${chat.friend.last_name}`: `${chat.user.first_name} ${chat.user.last_name}`}`}
                        </div>
                        <div className="message-recent">
                            {chat.messages[chat.messages.length - 1].content}
                        </div>
                    </div>
                ))}
            </div>
            <Chat chatroom={chatroom}/>
        </div>
    )
    )
};

export default Chats;