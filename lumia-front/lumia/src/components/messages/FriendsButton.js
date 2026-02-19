import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

const FriendsButton = ({ onClick, unreadCount = 0, isOpen = false }) => {
    const displayCount = unreadCount > 99 ? "99+" : unreadCount;

    if (isOpen) return null;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
            }}
            className="fixed z-[99999] w-12 h-12 rounded-full bg-[#5328EA] hover:bg-[#4121bf] text-white font-semibold shadow-lg transition duration-300 flex items-center justify-center relative"
            style={{ position: "fixed", bottom: 40, right: 40, zIndex: 99999 }}
            aria-label={`Open friends panel${unreadCount > 0 ? ` - ${displayCount} unread messages` : ''}`}
            aria-live="polite"
            type="button"
            title={`Friends${unreadCount > 0 ? ` (${displayCount} unread)` : ''}`}
        >
            {unreadCount > 0 && (
                <span
                    className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full"
                    aria-hidden="false"
                    role="status"
                >
                    {displayCount}
                </span>
            )}
            <Users className="w-6 h-6" aria-hidden="true" />
        </button>
    );
};

export default FriendsButton;
