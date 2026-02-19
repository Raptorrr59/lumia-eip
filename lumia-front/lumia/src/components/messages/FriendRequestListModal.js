import React, { useState, useEffect } from "react";
import { useLang } from "../../LangProvider";
import TranslationsDictionary from "../../Translations";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const FriendRequestListModal = ({ requests = [], onClose, onAccept, onDecline }) => {
    const selectedLang = useLang();
    const T = TranslationsDictionary[selectedLang] || TranslationsDictionary["EN"];
    const [loadingMap, setLoadingMap] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // robust resolver for various request id shapes
    const resolveRequestId = (r) => {
        if (!r) return null;
        const candidates = [
            r.id,
            r._id,
            r.requestId,
            r.requesterId,
            r.requester?._id,
            r.requester?.id,
            r.requester?.userId,
            r.requester?.userID,
            r.requester?.$id,
        ];
        for (const c of candidates) {
            if (c !== undefined && c !== null && c !== "") return String(c);
        }
        try {
            const s = JSON.stringify(r);
            const m = s.match(/([0-9a-fA-F]{24})/);
            if (m) return m[1];
        } catch (e) {}
        return null;
    };

    const reqDisplayName = (r) => {
        const requester = r.requester || r.requesterEntity || r.requesterId || r.requesterObject;
        return (
            r.requesterName ||
            r.requesterUsername ||
            (requester && (requester.userName || requester.username || requester.name || requester.email)) ||
            String(r.requester || r.requesterId || r.requesterIdString || r._id || r.id || "").slice(0, 8) ||
            T["unknown_user"] ||
            "Unknown"
        );
    };

    const handleAccept = async (requestObj) => {
        const id = resolveRequestId(requestObj) || JSON.stringify(requestObj).slice(0, 8);
        setLoadingMap((m) => ({ ...m, [id]: true }));
        try {
            await onAccept(id);
            setSnackbar({ 
                open: true, 
                message: T["friend_request_accepted"] || "Friend request accepted", 
                severity: 'success' 
            });
        } catch (error) {
            setSnackbar({ 
                open: true, 
                message: T["friend_request_accept_failed"] || "Failed to accept friend request", 
                severity: 'error' 
            });
        } finally {
            setLoadingMap((m) => ({ ...m, [id]: false }));
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDecline = async (requestObj) => {
        const id = resolveRequestId(requestObj) || JSON.stringify(requestObj).slice(0, 8);
        setLoadingMap((m) => ({ ...m, [id]: true }));
        try {
            await onDecline(id);
            setSnackbar({ 
                open: true, 
                message: T["friend_request_declined"] || "Friend request declined", 
                severity: 'info' 
            });
        } catch (error) {
            setSnackbar({ 
                open: true, 
                message: T["friend_request_decline_failed"] || "Failed to decline friend request", 
                severity: 'error' 
            });
        } finally {
            setLoadingMap((m) => ({ ...m, [id]: false }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`bg-white dark:bg-gray-900 rounded-lg p-4 shadow-xl w-96 z-50`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {T["friend_requests_title"] || "Friend requests"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-sm px-2 py-1 rounded-md border"
                        aria-label={T["close"] || "Close"}
                    >
                        {T["close"] || "Close"}
                    </button>
                </div>

                <div className="max-h-72 overflow-auto divide-y">
                    {requests.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {T["no_friend_requests"] || "No pending requests"}
                        </p>
                    ) : (
                        requests.map((r, idx) => {
                            const hint = resolveRequestId(r) || String(idx);
                            return (
                                <div key={idx} className="py-2 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-800 dark:text-white">
                                            {reqDisplayName(r)}
                                        </div>
                                        {r.sentAt && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(r.sentAt).toLocaleString()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleAccept(r)}
                                            disabled={!!loadingMap[hint]}
                                            className="px-2 py-1 text-sm rounded-md bg-[#5328EA] hover:bg-[#4121bf] text-white disabled:opacity-60 cursor-pointer"
                                            aria-label={T["accept"] || "Accept"}
                                        >
                                            {loadingMap[hint] ? (T["accepting"] || "Accepting...") : (T["accept"] || "Accept")}
                                        </button>
                                        <button
                                            onClick={() => handleDecline(r)}
                                            disabled={!!loadingMap[hint]}
                                            className="px-2 py-1 text-sm rounded-md bg-[#FF774D] hover:bg-[#e65f3d] text-white disabled:opacity-60 cursor-pointer"
                                            aria-label={T["decline"] || "Decline"}
                                        >
                                            {loadingMap[hint] ? (T["declining"] || "Declining...") : (T["decline"] || "Decline")}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            
            {/* MUI Snackbar for notifications */}
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={4000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity} 
                    variant="filled"
                    sx={{
                        width: '100%',
                        backgroundColor: snackbar.severity === 'success' ? '#5328EA' : 
                                        snackbar.severity === 'error' ? '#ef4444' : '#6b7280',
                        color: '#fff',
                        borderRadius: '12px',
                        fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        '& .MuiAlert-icon': {
                            color: '#fff'
                        }
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FriendRequestListModal;