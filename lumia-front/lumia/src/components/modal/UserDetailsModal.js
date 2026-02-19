import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const selectedLang = useLang();
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBanConfirm, setShowBanConfirm] = useState(false);
  const [banLoading, setBanLoading] = useState(false);

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await axios.get(`/api/user-comments`, {
          params: {
            username: user.userName
          },
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        setUserComments(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError(TranslationsDictionary[selectedLang]?.["error_loading_comments"]);
        setLoading(false);
      }
    };

    if (isOpen && user.userName) {
      fetchUserComments();
    }
  }, [isOpen, user.userName]);

  const handleBanUser = async () => {
    setBanLoading(true);
    try {
      const response = await axios.delete(`/api/users/${user.userName}/complete`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      
      if (response.data.success) {
        alert(TranslationsDictionary[selectedLang]?.["user_banned_success"] || "User banned (deleted) successfully!");
        onClose();
        window.location.reload();
      } else {
        alert(TranslationsDictionary[selectedLang]?.["error"] + response.data.message);
      }
    } catch (error) {
      console.error(TranslationsDictionary[selectedLang]?.["error_banning_user"] || 'Error banning user:', error);
      alert(TranslationsDictionary[selectedLang]?.["error_banning_user"] || 'Error banning user');
    } finally {
      setBanLoading(false);
      setShowBanConfirm(false);
    }
  };

  const BanConfirmationPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1A1A2E] p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
          {TranslationsDictionary[selectedLang]?.["confirm_ban_user"] || "Confirm ban user"}
        </h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {TranslationsDictionary[selectedLang]?.["confirm_ban_user_message"]} <strong>{user.userName}</strong> ?
          {TranslationsDictionary[selectedLang]?.["confirm_ban_user_message_2"] || "This action will permanently delete the user and all their comments."}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowBanConfirm(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            disabled={banLoading}
          >
            Annuler
          </button>
          <button
            onClick={handleBanUser}
            disabled={banLoading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {banLoading ? TranslationsDictionary[selectedLang]?.["banning_user"] || 'Banning user...' : TranslationsDictionary[selectedLang]?.["confirm_ban_user"] || 'Yes, I am sure'}
          </button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl w-full h-[80vh] bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg overflow-hidden flex flex-col"
      >
        <div className="md:flex flex-1 min-h-0">
          {/* Profile sidebar */}
          <div className="md:w-1/3 bg-gradient-to-b from-[#5328EA] to-[#9579FA] p-8 text-white flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-white mb-4">
                <span className="text-[48px] font-semibold text-[#5328EA]">
                  {user.userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-1">{user.userName}</h2>
              <p className="text-sm opacity-80 mb-6">{user.email}</p>
              
              <div className="w-full bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium">{TranslationsDictionary[selectedLang]?.["email_verification_status"] || 'Email verification status'}</p>
                <p className="text-lg font-bold">
                  {user.emailVerified ? TranslationsDictionary[selectedLang]?.["verified"] || 'Verified' : TranslationsDictionary[selectedLang]?.["not_verified"] || 'Not verified'}
                </p>
              </div>

              {/* Ban User Button */}
              <button
                onClick={() => setShowBanConfirm(true)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {TranslationsDictionary[selectedLang]?.["ban_user"] || 'Ban user'}
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-2/3 p-8 relative flex flex-col min-h-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex-shrink-0">
              {TranslationsDictionary[selectedLang]?.["user_comments"]}
            </h1>

            <div className="flex-1 min-h-0 overflow-hidden">
              {loading ? (
                <div className="text-center py-4">{TranslationsDictionary[selectedLang]?.["loading"]}</div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : userComments.length === 0 ? (
                <div className="text-center py-4">{TranslationsDictionary[selectedLang]?.["no_comments_found"]}</div>
              ) : (
                <div className="h-full overflow-y-auto pr-2 space-y-4">
                  {userComments.map((comment) => (
                    <div
                      key={comment.id.timestamp}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {comment.moduleId < 0 
                              ? `Game ${Math.abs(comment.moduleId * -1)}` 
                              : comment.moduleId === 1000 && comment.courseId === 1000
                              ? "Main Page"
                              : `Module ${comment.moduleId} - Cours ${comment.courseId}`
                            }
                          </p>
                          <p className="text-gray-900 dark:text-white mt-1">
                            {comment.content}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {comment.score}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </motion.div>
      
      {/* Ban Confirmation Popup */}
      {showBanConfirm && <BanConfirmationPopup />}
    </div>
  );
};

export default UserDetailsModal;