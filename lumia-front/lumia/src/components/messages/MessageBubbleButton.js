import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useWebSocket } from "../../contexts/WebSocketContext";

const MessageBubbleButton = ({ onClick }) => {
    const [container, setContainer] = useState(null);

    // Get unread count from WebSocket context (real-time updates, no polling)
    const { unreadCount } = useWebSocket();

    // create portal container attached to document.body so the button is above other stacking contexts
    useEffect(() => {
        if (typeof document === "undefined") return;
        // reuse existing portal if present
        let root = document.getElementById("message-bubble-portal");
        if (!root) {
            root = document.createElement("div");
            root.setAttribute("id", "message-bubble-portal");
            document.body.appendChild(root);
            console.debug("[MessageBubble] created portal element");
        } else {
            console.debug("[MessageBubble] reused existing portal element");
        }
        setContainer(root);
        return () => {
            // don't remove if it was preexisting (safe remove only if we created it)
            try {
                const existing = document.getElementById("message-bubble-portal");
                if (existing && existing.parentNode && existing.childElementCount === 0) {
                    existing.parentNode.removeChild(existing);
                    console.debug("[MessageBubble] removed portal element");
                }
            } catch (e) {
                // ignore
            }
            setContainer(null);
        };
    }, []);

    const displayCount = unreadCount > 99 ? "99+" : unreadCount;

    const button = (
        <button
            onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
            // keep Tailwind classes but add inline fallback positioning so it's visible during debug
            className="fixed bottom-10 right-10 z-[99999] bg-[#5328EA] hover:bg-[#4121bf] text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center justify-center relative"
            style={{ position: "fixed", bottom: 40, right: 40, zIndex: 99999 }} // fallback
            aria-label="Open messages"
            aria-live="polite"
            type="button"
        >
            {unreadCount > 0 && (
                <span
                    className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
                    aria-hidden="false"
                >
                    {displayCount}
                </span>
            )}
            <svg className="h-6 w-6" viewBox="0 0 423.789 423.789" fill="currentColor" aria-hidden="true">
                <g><path d="M423.789,225.29c0-52.537-50.816-95.767-116.583-100.102c-7.191-9.469-15.979-18.275-26.273-26.207c-31.04-23.916-72.165-37.086-115.8-37.086c-43.634,0-84.759,13.171-115.799,37.086C17.521,123.492,0,156.321,0,191.42c0,55.275,44.811,104.246,110.372,122.249c-3.909,6.604-11.674,16.833-26.906,29.81c-2.959,2.521-4.189,6.53-3.153,10.277c1.036,3.748,4.151,6.554,7.985,7.197c0.575,0.097,5.865,0.941,14.5,0.941c0.001,0,0.001,0,0.002,0c23.175,0,67.583-6.021,107.382-45.818c6.59-1.457,12.992-3.22,19.185-5.264c9.889,4.816,20.515,8.524,31.686,11.048c30.757,30.437,64.927,34.909,82.347,34.909c6.711-0.001,10.939-0.664,11.525-0.762c3.834-0.643,6.949-3.45,7.985-7.197c1.036-3.747-0.193-7.755-3.153-10.277c-9.412-8.02-14.932-14.569-18.141-19.272C390.578,304.654,423.789,267.339,423.789,225.29zM210.133,228.895h-90c-5.523,0-10-4.477-10-10s4.477-10,10-10h90c5.523,0,10,4.477,10,10S215.656,228.895,210.133,228.895zM240.133,179.561h-150c-5.523,0-10-4.477-10-10c0-5.523,4.477-10,10-10h150c5.523,0,10,4.477,10,10C250.133,175.084,245.656,179.561,240.133,179.561zM325.373,302.767c-5.051,1.065-8.461,5.799-7.871,10.927c0.224,1.946,1.705,9.83,11.347,21.917c-15.384-2.515-36.304-9.878-55.581-29.844c-1.401-1.451-3.208-2.445-5.184-2.85c-4.193-0.86-8.289-1.921-12.288-3.155c45.494-23.441,74.471-63.779,74.471-108.342c0-15.473-3.409-30.503-9.942-44.576c20.77,3.551,39.708,11.696,54.598,23.678c18.615,14.979,28.867,34.429,28.867,54.768C403.789,261.171,371.543,293.03,325.373,302.767z"/></g>
            </svg>
        </button>
    );

    if (!container) return null;
    return createPortal(button, container);
};

export default MessageBubbleButton;
