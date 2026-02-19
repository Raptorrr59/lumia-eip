import React, { useEffect, useState, useRef, useCallback } from "react";
import MessageSingle from "./MessageSingle";
import FriendCard from "./FriendCard";
import AddFriendModal from "./AddFriendModal";
import FriendRequestListModal from "./FriendRequestListModal";
import { useLang } from "../../LangProvider";
import TranslationsDictionary from "../../Translations";
import { X, SendHorizonal, UserPlus, UserCheck } from "lucide-react";
import { useWebSocket } from "../../contexts/WebSocketContext";
import "./messagebox-overrides.css";

const Messages = ({ isOpen = false, onClose = null }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendLoading, setFriendLoading] = useState(true);
    const token = localStorage.getItem("accessToken") || "";
    const [currentConversation, setCurrentConversation] = useState([]);
    const [displayedMessages, setDisplayedMessages] = useState([]);
    const [selectedPartnerId, setSelectedPartnerId] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [toasts, setToasts] = useState([]);
    const [showRequestsModal, setShowRequestsModal] = useState(false);
    const messagesListRef = useRef(null);
    const readMarkedRef = useRef(new Set());
    const programmaticScrollRef = useRef(false);
    const selectedPartnerIdRef = useRef(null);

    const selectedLang = useLang();
    const T = TranslationsDictionary[selectedLang] || TranslationsDictionary["EN"];

    // WebSocket context
    const {
        sendMessage: wsSendMessage,
        markAsRead: wsMarkAsRead,
        sendTypingIndicator,
        isConnected,
        onNewMessage,
        onFriendRequest,
        onTyping,
        onMessageRead,
        fetchInitialUnreadCount,
        setUnreadCount,
        unreadCount
    } = useWebSocket();

    // State for typing indicator display
    const [partnerTyping, setPartnerTyping] = useState(false);

    // State to track if the panel has been opened at least once
    const [hasBeenOpened, setHasBeenOpened] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setHasBeenOpened(true);
        }
    }, [isOpen]);

    // Keep ref in sync with state for use in callbacks
    useEffect(() => {
        selectedPartnerIdRef.current = selectedPartnerId;
    }, [selectedPartnerId]);

    // Toast helper
    const showToast = useCallback((text, type = "success", duration = 3000) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts((prev) => [...prev, { id, text, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    // Normalize incoming timestamps so they render in the user's local timezone
    const normalizeSentAt = useCallback((value) => {
        const fallback = new Date().toISOString();
        if (!value) return fallback;

        if (value instanceof Date) {
            return isNaN(value.getTime()) ? fallback : value.toISOString();
        }

        if (typeof value === "number") {
            const d = new Date(value);
            return isNaN(d.getTime()) ? fallback : d.toISOString();
        }

        if (typeof value === "string") {
            const trimmed = value.trim();
            // If the server omits timezone info, assume UTC so we can shift to local
            const hasTZ = /([zZ]|[+\-]\d{2}:?\d{2})$/.test(trimmed);
            const candidate = hasTZ ? trimmed : `${trimmed}Z`;
            const d = new Date(candidate);
            return isNaN(d.getTime()) ? fallback : d.toISOString();
        }

        return fallback;
    }, []);

    // Helper: extract id string from various sender shapes
    const extractSenderId = useCallback((sender) => {
        if (!sender) return null;
        if (typeof sender === "string") {
            const hex = sender.match(/([0-9a-fA-F]{24})/);
            if (hex) return hex[1];
            return sender;
        }
        if (sender.$id) return String(sender.$id);
        if (sender.id) return String(sender.id);
        if (sender._id) return String(sender._id);
        if (sender.$ref && sender.$id) return String(sender.$id);
        try {
            const s = JSON.stringify(sender);
            const m = s.match(/([0-9a-fA-F]{24})/);
            if (m) return m[1];
        } catch (e) {}
        return null;
    }, []);

    const scrollToBottom = useCallback((smooth = false) => {
        const el = messagesListRef.current;
        if (!el) return;
        try {
            programmaticScrollRef.current = true;
            if (smooth && "scrollTo" in el) {
                el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            } else {
                el.scrollTop = el.scrollHeight;
            }
            setTimeout(() => {
                programmaticScrollRef.current = false;
            }, 150);
        } catch (e) {
            programmaticScrollRef.current = false;
        }
    }, []);

    // ============ WebSocket Event Handlers ============

    // Handle new incoming messages
    useEffect(() => {
        const unsubscribe = onNewMessage((data) => {
            console.log("[Messages] New message received via WebSocket:", data);

            const senderId = extractSenderId(data.sender) || extractSenderId(data.senderId) || data.senderId;
            const receiverId = extractSenderId(data.receiver) || extractSenderId(data.receiverId) || data.receiverId;
            const myId = extractSenderId(localStorage.getItem("userId") || localStorage.getItem("id"));
            const currentPartnerId = selectedPartnerIdRef.current;

            console.log("[Messages] Processing - senderId:", senderId, "receiverId:", receiverId, "myId:", myId, "currentPartnerId:", currentPartnerId);

            // Check if this message belongs to the current conversation
            const isFromPartner = currentPartnerId && String(senderId) === String(currentPartnerId);
            const isToPartner = currentPartnerId && String(receiverId) === String(currentPartnerId);
            const belongsToConversation = isFromPartner || isToPartner;
            const isForMe = String(receiverId) === String(myId);

            if (belongsToConversation) {
                console.log("[Messages] Adding message to current conversation");
                const serverTimestamp = data.sentAt || data.sent_at || data.sent || data.timestamp || data.createdAt || data.created_at;
                const newMsg = {
                    senderId: senderId,
                    senderName: data.senderName || null,
                    content: data.content,
                    sentAt: normalizeSentAt(serverTimestamp),
                    raw: data
                };

                setDisplayedMessages((prev) => {
                    // Avoid duplicates
                    const exists = prev.some(m =>
                        m.content === newMsg.content &&
                        String(m.senderId) === String(newMsg.senderId) &&
                        Math.abs(new Date(m.sentAt || 0) - new Date(newMsg.sentAt || 0)) < 5000
                    );
                    if (exists) {
                        console.log("[Messages] Duplicate message, skipping");
                        return prev;
                    }
                    return [newMsg, ...prev];
                });
                setTimeout(() => scrollToBottom(true), 50);
            } else if (isForMe) {
                console.log("[Messages] Message for me but different conversation, refreshing list");
                fetchAllConversations();
            }

            // Show toast for messages from others
            if (String(senderId) !== String(myId)) {
                const senderName = data.senderName || "Someone";
                if (!isFromPartner) {
                    showToast(`${T["new_message_from"] || "New message from"} ${senderName}`, "success");
                }
            }
        });

        return unsubscribe;
    }, [extractSenderId, normalizeSentAt, scrollToBottom, showToast, T]);

    // Handle friend requests
    useEffect(() => {
        const unsubscribe = onFriendRequest((data) => {
            console.log("[Messages] Friend request received:", data);

            setFriendRequests((prev) => {
                const exists = prev.some(r =>
                    (r.id === data.id) || (r.requesterId === data.requesterId)
                );
                if (exists) return prev;
                return [data, ...prev];
            });

            const requesterName = data.requesterName || data.requester?.userName || "Someone";
            showToast(`${T["friend_request_from"] || "Friend request from"} ${requesterName}`, "success");
        });

        return unsubscribe;
    }, [showToast, T]);

    // Handle typing indicators
    useEffect(() => {
        const unsubscribe = onTyping((data) => {
            const currentPartnerId = selectedPartnerIdRef.current;
            if (String(data.senderId) === String(currentPartnerId)) {
                setPartnerTyping(data.isTyping);
                if (data.isTyping) {
                    setTimeout(() => setPartnerTyping(false), 3000);
                }
            }
        });

        return unsubscribe;
    }, []);

    // Handle read receipts - refresh unread count when messages are marked as read
    useEffect(() => {
        const unsubscribe = onMessageRead((data) => {
            console.log("[Messages] Read receipt received:", data);
            // Refresh unread count when we receive a read receipt
            fetchInitialUnreadCount();
        });

        return unsubscribe;
    }, [fetchInitialUnreadCount]);

    // ============ API Functions ============

    const fetchAllConversations = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/messages/conversations", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Server responded with ${res.status}`);
            const data = await res.json();

            const convs = Array.isArray(data?.conversations) ? data.conversations : (Array.isArray(data) ? data : []);
            const normalized = convs.map((c) => {
                const partnerId = c.partnerId || c.partner_id || (c.partner && c.partner.id) || null;
                const partnerName = c.partnerName || c.partner_name || (c.partner && (c.partner.userName || c.partner.username)) || null;
                const last = c.lastMessage || c.last_message || {};
                return {
                    partnerId,
                    partnerName,
                    user: partnerName || (partnerId ? String(partnerId).slice(0, 8) : "Unknown"),
                    lastMessage: {
                        content: last.content || last.message || "",
                        senderId: last.senderId || last.sender_id || null,
                        senderName: last.senderName || last.sender_name || null,
                        sentAt: normalizeSentAt(last.sentAt || last.sent_at || last.sent || last.timestamp || last.createdAt || last.created_at),
                    },
                };
            });

            setMessages(normalized);

            if (normalized.length > 0 && !selectedPartnerId) {
                const first = normalized[0];
                if (first.partnerId) {
                    chooseConversation(first.partnerId);
                }
            }
        } catch (err) {
            console.error("Failed to fetch conversations:", err);
            setError(err.message || "Failed to load conversations");
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchFriends = async () => {
        setFriendLoading(true);
        try {
            const res = await fetch("/api/friends/list", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Server responded with ${res.status}`);
            const data = await res.json();

            const normalized = Array.isArray(data)
                ? data.map((u) => ({
                      userId: u.id || u._id || u.userId || null,
                      userName: u.username || u.userName || u.name || "Unknown",
                      avatar: u.avatar || u.profilePicture || null,
                  }))
                : [];

            setFriends(normalized);

            if (normalized.length > 0 && !selectedPartnerId) {
                chooseConversation(normalized[0].userId);
            }
        } catch (err) {
            console.error("Failed to fetch friends:", err);
            setFriends([]);
        } finally {
            setFriendLoading(false);
        }
    };

    const fetchFriendRequests = async () => {
        try {
            const res = await fetch("/api/friends/requests/pending", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                setFriendRequests([]);
                return;
            }
            const data = await res.json();
            setFriendRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch friend requests:", err);
            setFriendRequests([]);
        }
    };

    const chooseConversation = async (identifier) => {
        console.log("Choosing conversation:", identifier);

        const friendObj = friends.find(
            (f) => f.userName === identifier || f.userId === identifier || f.id === identifier
        );

        const resolvedPartnerId = friendObj ? (friendObj.userId || friendObj.id) : identifier;
        if (resolvedPartnerId) {
            setSelectedPartnerId(resolvedPartnerId);
        }

        if (resolvedPartnerId) {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/conversation/${resolvedPartnerId}?page=0&size=50`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error(`Server responded with ${res.status}`);
                const data = await res.json();
                const content = Array.isArray(data) ? data : (data?.content || []);

                const normalized = content.map((m) => {
                    const senderId = extractSenderId(m.sender || m.from || m.senderId);
                    const senderName = m.senderName || (m.sender && (m.sender.userName || m.sender.username)) || null;
                    const sentAtRaw = m.sentAt || m.sent_at || m.sent || m.timestamp || m.createdAt || m.created_at;
                    const sentAt = normalizeSentAt(sentAtRaw);
                    return {
                        senderId,
                        senderName,
                        sentAt,
                        content: m.content || m.text || m.message || "",
                        raw: m,
                    };
                });

                setCurrentConversation(normalized);
                setDisplayedMessages(normalized);
                readMarkedRef.current.delete(String(resolvedPartnerId));
                setTimeout(() => scrollToBottom(false), 0);
            } catch (err) {
                console.error("Failed to fetch conversation:", err);
                setError(err.message);
                setCurrentConversation([]);
                setDisplayedMessages([]);
            } finally {
                setLoading(false);
            }
        } else {
            setCurrentConversation([]);
            setDisplayedMessages([]);
        }
    };

    const sendMessage = async (content, messageType = "TEXT") => {
        if (!selectedPartnerId) {
            console.error("No conversation selected");
            return;
        }

        // Stop typing
        if (isConnected) {
            sendTypingIndicator(selectedPartnerId, false);
        }

        console.log("[Messages] Sending message, isConnected:", isConnected);

        if (isConnected) {
            const success = wsSendMessage(selectedPartnerId, content, messageType);
            if (success) {
                console.log("[Messages] Message sent via WebSocket");
                const myId = extractSenderId(localStorage.getItem("userId") || localStorage.getItem("id"));
                const sentAt = normalizeSentAt(new Date());
                const newMsg = {
                    senderId: myId,
                    senderName: localStorage.getItem("userName") || "You",
                    content,
                    // Use client-local time for consistency with received messages
                    sentAt,
                    raw: { content, messageType, sentAt }
                };
                setDisplayedMessages((prev) => [newMsg, ...prev]);
                setTimeout(() => scrollToBottom(true), 50);
                return;
            }
        }

        // Fallback to REST
        try {
            const res = await fetch("/api/messages/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
                body: JSON.stringify({ receiverId: selectedPartnerId, content, messageType }),
            });
            if (!res.ok) throw new Error(`Server responded with ${res.status}`);
            await fetchAllConversations();
            if (selectedPartnerId) chooseConversation(selectedPartnerId);
        } catch (err) {
            console.error("Failed to send message:", err);
            showToast(T["message_send_failed"] || "Failed to send message", "error");
        }
    };

    const setMessageAsRead = async (partnerId, silent = false) => {
        if (!partnerId) return false;

        const myId = extractSenderId(localStorage.getItem("userId") || localStorage.getItem("id"));

        // Count unread messages in current conversation to decrement the global counter
        const countUnreadInConversation = () => {
            return displayedMessages.filter((m) => {
                const raw = m.raw || {};
                const receiverId = raw.receiverId || extractSenderId(raw.receiver);
                const toMe = receiverId && String(receiverId) === String(myId);
                const isUnread = (raw.read === false) || (raw.read === undefined && !raw.readAt);
                return toMe && isUnread;
            }).length;
        };

        // Update local state immediately for instant UI feedback
        const updateLocalMessagesAsRead = () => {
            const unreadInConversation = countUnreadInConversation();

            // Optimistically update unread count immediately
            if (unreadInConversation > 0) {
                setUnreadCount((prev) => Math.max(0, prev - unreadInConversation));
            }

            setDisplayedMessages((prev) =>
                prev.map((m) => {
                    const raw = m.raw || {};
                    const receiverId = raw.receiverId || extractSenderId(raw.receiver);
                    const toMe = receiverId && String(receiverId) === String(myId);
                    const isUnread = (raw.read === false) || (raw.read === undefined && !raw.readAt);

                    if (toMe && isUnread) {
                        return {
                            ...m,
                            raw: {
                                ...raw,
                                read: true,
                                readAt: new Date().toISOString()
                            }
                        };
                    }
                    return m;
                })
            );
        };

        if (isConnected) {
            const success = wsMarkAsRead(partnerId);
            if (success) {
                updateLocalMessagesAsRead();
                // Also refresh from server to ensure consistency
                setTimeout(() => fetchInitialUnreadCount(), 500);
                return true;
            }
        }

        try {
            const res = await fetch(`/api/messages/mark-read/${partnerId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                if (!silent) {
                    showToast(T["mark_read_failed"] || "Failed to mark as read", "error");
                }
                return false;
            }
            updateLocalMessagesAsRead();
            // Also refresh from server to ensure consistency
            setTimeout(() => fetchInitialUnreadCount(), 500);
            return true;
        } catch (err) {
            console.error("Failed to mark as read:", err);
            if (!silent) {
                showToast(T["mark_read_failed"] || "Failed to mark as read", "error");
            }
            return false;
        }
    };

    const matchesRequestId = (reqObj, id) => {
        if (!reqObj || !id) return false;
        const candidates = [reqObj.id, reqObj._id, reqObj.requestId, reqObj.requesterId]
            .map((v) => v ? String(v) : null);
        return candidates.includes(String(id));
    };

    const acceptFriendRequest = async (requestId) => {
        if (!requestId) return;
        try {
            let res = await fetch(`/api/friends/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
                body: JSON.stringify({ requesterId: requestId }),
            });

            if (!res.ok) {
                res = await fetch(`/api/friends/accept/${requestId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                    },
                });
            }

            if (!res.ok) throw new Error(`Server responded with ${res.status}`);

            setFriendRequests((prev) => prev.filter((r) => !matchesRequestId(r, requestId)));
            fetchFriends();
            fetchFriendRequests();
            showToast(T["friend_request_accepted"] || "Friend request accepted", "success");
        } catch (err) {
            console.error("Failed to accept friend request:", err);
            showToast(T["friend_request_accept_failed"] || "Failed to accept friend request", "error");
        }
    };

    const declineFriendRequest = async (requestId) => {
        if (!requestId) return;
        try {
            let res = await fetch(`/api/friends/decline`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                },
                body: JSON.stringify({ requesterId: requestId }),
            });

            if (!res.ok) {
                res = await fetch(`/api/friends/decline/${requestId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                    },
                });
            }

            if (!res.ok) throw new Error(`Server responded with ${res.status}`);

            setFriendRequests((prev) => prev.filter((r) => !matchesRequestId(r, requestId)));
            fetchFriendRequests();
            showToast(T["friend_request_declined"] || "Friend request declined", "success");
        } catch (err) {
            console.error("Failed to decline friend request:", err);
            showToast(T["friend_request_decline_failed"] || "Failed to decline friend request", "error");
        }
    };

    const checkIfAnyMessageUnread = (conversationArr) => {
        if (!Array.isArray(conversationArr) || conversationArr.length === 0) return false;
        const myId = extractSenderId(localStorage.getItem("userId") || localStorage.getItem("id"));
        if (!myId) return false;

        return conversationArr.some((m) => {
            const raw = m.raw || {};
            const receiverId = raw.receiverId || extractSenderId(raw.receiver);
            const toMe = receiverId && String(receiverId) === String(myId);
            const isUnread = (raw.read === false) || (raw.read === undefined && !raw.readAt);
            return toMe && isUnread;
        });
    };

    // ============ Effects ============

    // Initial load
    useEffect(() => {
        fetchAllConversations();
        fetchFriends();
        fetchFriendRequests();
    }, []);

    // Refresh conversation when panel opens
    useEffect(() => {
        if (isOpen && selectedPartnerId) {
            console.log("[Messages] Panel opened, refreshing conversation");
            chooseConversation(selectedPartnerId);
        }
    }, [isOpen]);

    // Auto mark messages as read when viewing the conversation
    useEffect(() => {
        if (isOpen && selectedPartnerId && displayedMessages.length > 0) {
            const hasUnread = checkIfAnyMessageUnread(displayedMessages);
            const alreadyMarked = readMarkedRef.current.has(String(selectedPartnerId));

            if (hasUnread && !alreadyMarked) {
                console.log("[Messages] Auto-marking messages as read for partner:", selectedPartnerId);
                readMarkedRef.current.add(String(selectedPartnerId));
                setMessageAsRead(selectedPartnerId, true);
            }
        }
    }, [isOpen, selectedPartnerId, displayedMessages]);

    // Handle Esc key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen && onClose) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = messageText.trim();
        if (!text) return;
        if (text.length > 500) {
            alert(T["message_too_long"] || "Message is too long (maximum 500 characters)");
            return;
        }
        await sendMessage(text);
        setMessageText("");
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 500) {
            setMessageText(text);
            if (text.length > 0 && isConnected && selectedPartnerId) {
                sendTypingIndicator(selectedPartnerId, true);
            }
        }
    };

    // ============ Render ============

    return (
        <div
            className={`fixed bottom-0 right-0 w-full max-w-2xl bg-white dark:bg-gradient-to-br from-[#010116] to-[#180c50] shadow-xl flex flex-col overflow-hidden rounded-3xl mb-4 mr-4 z-[40] border-2 border-gray-300 dark:border-[#5328EA] ${isOpen ? 'chat-popup-open' : (hasBeenOpened ? 'chat-popup-closed' : 'hidden')}`}
            style={{ height: '66.67vh' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Friends and Messages Panel"
        >
            {/* Toasts */}
            <div className="absolute top-16 right-4 space-y-2 z-50" aria-live="polite">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`px-3 py-2 rounded shadow text-white ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-gray-700'}`}
                    >
                        {t.text}
                    </div>
                ))}
            </div>

            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={onClose}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close friends panel"
                >
                    <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
            </div>

            {/* Main content */}
            <div className="flex h-full">
                <div className="h-full w-1/3 flex flex-col border-r border-gray-300 dark:border-gray-700">
                    <div className="messages-header">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {T["friend_list_title"] || "Friend list"}
                        </h3>
                        <div className="header-actions">
                            {friendRequests.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => { setShowAddFriend(false); setShowRequestsModal(true); }}
                                    className="p-1.5 rounded-md bg-[#5328EA] hover:bg-[#4121bf] text-white relative flex items-center justify-center transition-colors"
                                    aria-label="Open friend requests"
                                    title={T["friend_requests_button"] || "Friend requests"}
                                >
                                    <UserCheck className="w-5 h-5" />
                                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white dark:border-gray-800">
                                        {friendRequests.length}
                                    </span>
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowAddFriend(true)}
                                className="p-1.5 rounded-md bg-[#5328EA] hover:bg-[#4121bf] text-white flex items-center justify-center transition-colors"
                                title={T["add_friend_button"] || "Add friend"}
                            >
                                <UserPlus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto h-full p-2">
                        {friends.map((friend) => (
                            <FriendCard
                                key={friend.userId}
                                username={friend.userName}
                                avatar={friend.avatar}
                                onClick={() => chooseConversation(friend.userId)}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-px bg-gray-300 dark:bg-gray-700 mx-0" />

                <div className="flex flex-col h-full w-2/3">
                    <div className="messages-header">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {selectedPartnerId
                                ? `${T["conversation_with"] || "Conversation with"} ${(() => {
                                    const byFriend = friends.find((f) => String(f.userId) === String(selectedPartnerId));
                                    return (byFriend && byFriend.userName) || String(selectedPartnerId).slice(0, 8);
                                })()}`
                                : (T["conversation_list_title"] || "Conversation")}
                        </h3>
                    </div>

                    {/* Messages area */}
                    <div ref={messagesListRef} className="flex-1 overflow-auto p-2 pb-24 messages-list scrollbar">
                        {(() => {
                            const myId = extractSenderId(localStorage.getItem("userId") || localStorage.getItem("id"));

                            return displayedMessages.slice().reverse().map((msg, index) => {
                                const sid = extractSenderId(msg.senderId || msg.raw?.senderId);
                                const isOwn = myId && sid ? String(myId) === String(sid) : false;

                                let displayName = msg.senderName || null;
                                if (!displayName && sid) {
                                    if (isOwn) {
                                        displayName = localStorage.getItem("userName") || "You";
                                    } else {
                                        const friend = friends.find((f) => String(f.userId) === String(sid));
                                        displayName = friend?.userName || String(sid).slice(0, 8);
                                    }
                                }

                                if (isOwn && displayName && !displayName.includes("(You)")) {
                                    displayName = `${displayName} (You)`;
                                }

                                return (
                                    <MessageSingle
                                        key={index}
                                        username={displayName}
                                        content={msg.content}
                                        ownMessage={isOwn}
                                        sentAt={msg.sentAt}
                                    />
                                );
                            });
                        })()}
                    </div>

                    {/* Typing indicator */}
                    {partnerTyping && selectedPartnerId && (
                        <div className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 italic">
                            {(() => {
                                const byFriend = friends.find((f) => String(f.userId) === String(selectedPartnerId));
                                const name = byFriend?.userName || "...";
                                return `${name} ${T["is_typing"] || "is typing"}...`;
                            })()}
                        </div>
                    )}

                    {/* Input area */}
                    <form
                        onSubmit={handleSubmit}
                        className="sticky bottom-0 z-20 flex items-center gap-2 p-2 border-t bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                    >
                        <input
                            type="text"
                            value={messageText}
                            onChange={handleInputChange}
                            onBlur={() => isConnected && selectedPartnerId && sendTypingIndicator(selectedPartnerId, false)}
                            maxLength="500"
                            placeholder={selectedPartnerId ? "Type a message (max 500 chars)..." : "Select a conversation to start"}
                            disabled={!selectedPartnerId}
                            className="flex-1 px-3 py-2 border rounded-md focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
                            aria-label="Message input"
                        />
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {messageText.length}/500
                        </div>
                        <button
                            type="submit"
                            disabled={!selectedPartnerId || !messageText.trim()}
                            className="bg-[#5328EA] hover:bg-[#4121bf] text-white font-semibold py-2 px-2 mr-2 rounded-md disabled:opacity-50"
                            aria-label="Send message"
                        >
                            <SendHorizonal className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {showAddFriend && (
                <AddFriendModal
                    onClose={() => setShowAddFriend(false)}
                    onSuccess={() => {
                        setShowAddFriend(false);
                        fetchFriends();
                    }}
                />
            )}
            {showRequestsModal && (
                <FriendRequestListModal
                    requests={friendRequests}
                    onClose={() => setShowRequestsModal(false)}
                    onAccept={(id) => acceptFriendRequest(id)}
                    onDecline={(id) => declineFriendRequest(id)}
                />
            )}
        </div>
    );
};

export default Messages;
