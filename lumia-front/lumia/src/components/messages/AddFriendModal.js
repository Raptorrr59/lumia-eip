import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AddFriendModal = ({ onClose, onSuccess }) => {
    const [username, setUsername] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);
    const selectedLang = useLang();
    const T = TranslationsDictionary[selectedLang] || TranslationsDictionary["EN"];

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        setLoading(true);
        const token = localStorage.getItem("accessToken") || "";
        try {
            await axios.post(
                "/api/friends/request",
                { username: username.trim() },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
                    },
                }
            );
            // Show success snackbar
            setSnackbar({ 
                open: true, 
                message: T["friend_request_sent_success"] || "Friend request sent successfully", 
                severity: 'success' 
            });
            setUsername("");
            // keep modal open briefly so the snackbar is visible
            setTimeout(() => {
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            }, 3500);
        } catch (err) {
            console.error("Friend request error", err);
            if (err.response) {
                const status = err.response.status;
                const data = err.response.data;
                const message = typeof data === "string" ? data : (data?.message || data?.error || "");

                console.log("Error details:", { status, message, data });

                // Check for specific error messages from backend
                const msgLower = (message || "").toLowerCase();

                let errorMsg = T["friend_request_error"] || "Failed to send friend request";
                
                if (status === 400) {
                    if (msgLower.includes("not found") || msgLower.includes("doesn't exist")) {
                        errorMsg = T["friend_user_not_exist"] || "This user doesn't exist";
                    } else if (msgLower.includes("friend request already sent") || msgLower.includes("already friends")) {
                        errorMsg = T["friend_request_already_sent"] || "You've already sent a request to that user or you're already friends with them";
                    } else {
                        errorMsg = message || errorMsg;
                    }
                } else if (status === 404) {
                    errorMsg = T["friend_user_not_exist"] || "This user doesn't exist";
                } else if (status === 409) {
                    errorMsg = T["friend_request_already_sent"] || "You've already sent a request to that user or you're already friends with them";
                }
                
                setSnackbar({ open: true, message: errorMsg, severity: 'error' });
            } else {
                setSnackbar({ 
                    open: true, 
                    message: T["friend_request_error"] || "Failed to send friend request", 
                    severity: 'error' 
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl w-96 z-50 ${loading ? "opacity-70 pointer-events-none" : ""}`}>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {TranslationsDictionary[selectedLang]?.["add_friend_title"] || "Add Friend"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            {TranslationsDictionary[selectedLang]?.["add_friend_label"] || "Username"}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={TranslationsDictionary[selectedLang]?.["add_friend_placeholder"] || "Enter username"}
                            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
                            disabled={loading}
                            aria-label="Friend username"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                            disabled={loading}
                        >
                            {TranslationsDictionary[selectedLang]?.["cancel"] || "Cancel"}
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !username.trim()}
                            className="px-4 py-2 rounded-md bg-[#5328EA] hover:bg-[#4121bf] text-white font-semibold disabled:opacity-50"
                        >
                            {loading ? (TranslationsDictionary[selectedLang]?.["loading"] || "Loading") : (TranslationsDictionary[selectedLang]?.["request_button"] || "Request")}
                        </button>
                    </div>
                </form>
            </div>
            
            {/* MUI Snackbar for validation and error messages */}
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

export default AddFriendModal;