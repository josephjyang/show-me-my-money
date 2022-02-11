import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import './Chat.css'

let socket;

const Chat = ({ chatroom }) => {
    const user = useSelector(state => state.session.user);
    const [messages, setMessages] = useState(chatroom ? [...chatroom.messages] : []);
    const [chatInput, setChatInput] = useState('');

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
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user: user, content: chatInput, chat_id: chatroom.id });
        // clear the input field after the message is sent
        setChatInput("")
    }

    const updateChatInput = e => {
        setChatInput(e.target.value)
    };

    // additional code to be added
    return (user && chatroom && (
        <div id="messages-container">
            <div id="messages">
                {messages?.map((message, ind) => (
                    <div key={ind} className="message-container">
                        {message.user.id !== user.id && <img src={message.user.profile_pic} className="chat-pic" alt="friend"></img>}
                        <div className={message.user.id === user.id ? "message user" : "message friend"}>{message.content}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={sendChat} id="send-message">
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};

export default Chat;