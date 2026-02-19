import React from "react";
import { ChatItem, MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import './messagebox-overrides.css';

const MessageSingleAlt = ({ user, content }) => {
    return (
        // Add a dark mode class to the ChatItem component
        <MessageBox
            position={'left'}
            type={'text'}
            text={content || 'Message content'}
            title={user || 'User'}
            date={new Date()}
            avatar={'https://www.svgrepo.com/show/452030/avatar-default.svg'}
            avatarPosition={'left'}
            statusColor="green"
            statusColorType="encircle"
        />
    );
};

export default MessageSingleAlt;
