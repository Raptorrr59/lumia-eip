import { ChatItem } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import './chatitem-overrides.css';

const MessageSingle = ({ username, content, ownMessage, sentAt }) => {
    const wrapperClass = ownMessage ? "own-message message-item" : "their-message message-item";
    
    // Format timestamp - properly convert server time to local timezone
    const formatTime = (dateString) => {
        if (!dateString) return null;
        try {
            // Parse the date string from server
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            
            // Format in local timezone
            return date.toLocaleDateString([], { 
                    month: '2-digit', 
                    day: '2-digit', 
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
        } catch (e) {
            return null;
        }
    };

    // Convert server time to local timezone
    // The Date constructor automatically handles timezone conversion
    const sentDate = sentAt ? new Date(sentAt) : null;
    const formattedTime = formatTime(sentAt);

    return (
        <div className={wrapperClass} aria-live="polite">
            <ChatItem
                className="rce-citem-wrapper bg-white dark:bg-gradient-to-br from-[#010116] to-[#180c50]"
                avatar="https://www.svgrepo.com/show/452030/avatar-default.svg"
                alt="Avatar"
                title={username || 'User'}
                subtitle={content || 'Message content'}
                date={sentDate || undefined}
                dateString={formattedTime || ''}
                unread={0}
            />
            <div className="message-separator" aria-hidden="true" />
        </div>
    );
};

export default MessageSingle;
