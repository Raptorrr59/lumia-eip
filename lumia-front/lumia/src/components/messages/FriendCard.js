import React from "react";

const FriendCard = ({ username, avatar, onClick }) => {
    return (
        <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700" onClick={onClick}>
            <img
                src={avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg"}
                alt={`${username}'s avatar`}
                className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium">{username}</span>
        </div>
    );
}

export default FriendCard;