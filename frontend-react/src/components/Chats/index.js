import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../../store/chats';
import Chat from '../Chat';

const Chats = () => {
    const user = useSelector(state => state.session.user);
    const chats = Object.values(useSelector(state => state.chats))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChats(user));
    }, [dispatch, user])

    return (user && (
        <div>
            <div>
                {chats.map((chat, ind) => (
                    <div key={ind}>
                        <div className="message-name">
                            {`${chat.user.id === user.id ? `${chat.friend.first_name} ${chat.friend.last_name}`: `${chat.user.first_name} ${chat.user.last_name}`}`}
                        </div>
                        <div className="message-recent">
                            {chat.messages[chat.messages.length - 1].content}
                        </div>
                    </div>
                ))}
            </div>
            <Chat />
        </div>
    )
    )
};

export default Chats;