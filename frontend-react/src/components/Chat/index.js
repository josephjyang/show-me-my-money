import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getChats } from '../../store/chats';
import './Chat.css'

let socket;

const Chat = ({ chatroom, setChatroom }) => {
    const user = useSelector(state => state.session.user);
    const [messages, setMessages] = useState(chatroom ? [...chatroom.messages] : []);
    const [chatInput, setChatInput] = useState('');
    const dispatch = useDispatch();
    let myFriend
    if (chatroom.user?.id === user.id) myFriend = chatroom.friend
    else myFriend = chatroom.user;

    useEffect(() => {
        setMessages(chatroom.messages)
        // create websocket/connect
        socket = io();

        // listen for chat events
        socket.on("chat", chat => {
            // when we receive a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [chatroom])

    const sendChat = e => {
        e.preventDefault();
        // emit a message
        socket.emit("chat", { user: user, content: chatInput, chat_id: chatroom.id });
        // clear the input field after the message is sent
        setChatInput("");
        dispatch(getChats(user));
    }

    const updateChatInput = e => {
        setChatInput(e.target.value)
    };

    return (user && chatroom && (
        <div id="messages-container">
            <div id="messages-header">
                <div id="message-title">
                    {myFriend.profile_pic ? <img src={myFriend.profile_pic} alt="user profile" className="chat-pic" /> : <div className="chat-pro-replace">{myFriend.first_name[0]}-{myFriend.last_name[0]}</div>}
                    <div id="messages-header-name">
                        <h3>{`${myFriend.first_name} ${myFriend.last_name}`}</h3>
                        <p>@{myFriend.username}</p>
                    </div>
                </div>
                <NavLink to="/messages" id="close-message">
                    <i class="fa-solid fa-x" onClick={() => setChatroom("")}/>
                </NavLink>
            </div>
            <div id="messages-content">
                <div id="messages">
                    {messages?.map((message, ind) => (
                        <div key={ind} className="message-container">
                            {message.user.id !== user.id ? (
                            <div className="message-container2">
                                {myFriend.profile_pic ? <img src={myFriend.profile_pic} alt="user profile" className="chat-pic" /> : <div className="chat-pro-replace">{myFriend.first_name[0]}-{myFriend.last_name[0]}</div>}
                                <div className="message friend">{message.content}</div>
                            </div>
                            ) : <div className="message user">{message.content}</div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={sendChat} id="send-message">
                <div id="input-ctr">
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    )
    )
};

export default Chat;