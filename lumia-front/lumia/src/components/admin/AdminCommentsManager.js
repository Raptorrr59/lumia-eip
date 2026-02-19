import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const ADMIN_USERNAMES = ['admin'];

const AdminCommentsManager = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const selectedLang = useLang();

  useEffect(() => {
    fetchAllCommentsWithReplies();
  }, []);

  const fetchAllCommentsWithReplies = async () => {
    try {
      setLoading(true);

      const usersResponse = await axios.get('/api/allUsers', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      let usernames = usersResponse.data.map(user => user.userName);
      // Remove 'admin' from the list
      usernames = usernames.filter(username => username !== 'admin');

      let allComments = [];
      for (const username of usernames) {
        try {
          const commentsResponse = await axios.get('/api/user-comments', {
            params: { username },
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
          });
          allComments = allComments.concat(commentsResponse.data);
        } catch (err) {
          // If a user has no comments or is not found, skip
          continue;
        }
      }

      const commentsWithReplies = await Promise.all(
        allComments.map(async (comment) => {
          try {
            const repliesResponse = await axios.get(`/api/comments/${comment.id}/with-replies`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
            });
            return {
              ...comment,
              replies: repliesResponse.data.replies || []
            };
          } catch (err) {
            return {
              ...comment,
              replies: []
            };
          }
        })
      );

      setComments(commentsWithReplies);
      setLoading(false);
    } catch (err) {
      setError(TranslationsDictionary[selectedLang]?.["error_loading_comments"]);
      setLoading(false);
    }
  };

  const startReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyContent('');
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };

  const submitReply = async () => {
    if (!replyContent.trim()) return;

    try {
      const response = await axios.post(`/api/comments/${replyingTo}/reply`, {
        userId: localStorage.getItem("id"),
        userName: localStorage.getItem("userName"),
        content: replyContent
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      // Mettre à jour les commentaires localement
      setComments(prevComments => 
        prevComments.map(comment => {
          if (comment.id === replyingTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), response.data]
            };
          }
          return comment;
        })
      );

      setReplyingTo(null);
      setReplyContent('');
    } catch (err) {
      console.error(TranslationsDictionary[selectedLang]?.["error_send_response"], err);
      alert(TranslationsDictionary[selectedLang]?.["error_send_response"]);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm(TranslationsDictionary[selectedLang]?.["ask_delete_comment"])) {
      return;
    }

    try {
      await axios.delete(`/api/comment/${commentId}`, {
        params: {
          messageId: commentId,
          username: localStorage.getItem("userName")
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      setComments(prevComments => 
        prevComments.filter(comment => comment.id !== commentId)
      );
    } catch (err) {
      console.error(TranslationsDictionary[selectedLang]?.["error_delete_comment"], err);
      alert(TranslationsDictionary[selectedLang]?.["error_delete_comment"]);
    }
  };

  const deleteReply = async (commentId, replyId) => {
    if (!window.confirm(TranslationsDictionary[selectedLang]?.["ask_delete_comment"])) {
      return;
    }

    try {
      await axios.delete(`/api/comment/${replyId}`, {
        params: {
          messageId: replyId,
          username: localStorage.getItem("userName")
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      // Mettre à jour les commentaires localement en supprimant la réponse
      setComments(prevComments => 
        prevComments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== replyId)
            };
          }
          return comment;
        })
      );
    } catch (err) {
      console.error(TranslationsDictionary[selectedLang]?.["error_delete_comment"], err);
      alert(TranslationsDictionary[selectedLang]?.["error_delete_comment"]);
    }
  };

  const getModuleInfo = (comment) => {
    if (comment.moduleId < 0) {
      return TranslationsDictionary[selectedLang]?.["game"] + " " + Math.abs(comment.moduleId * -1);
    } else if (comment.moduleId === 1000 && comment.courseId === 1000) {
      return TranslationsDictionary[selectedLang]?.["home_page"];
    } else {
      return TranslationsDictionary[selectedLang]?.["module"] + " " + comment.moduleId + " - " + TranslationsDictionary[selectedLang]?.["course"] + " " + comment.courseId;
    }
  };

  const renderStars = (score) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < score ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5328EA]"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{TranslationsDictionary[selectedLang]?.["loading_comments"]}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#5328EA] dark:text-violet-400 mb-2">
          {TranslationsDictionary[selectedLang]?.["comments_manager"]}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {TranslationsDictionary[selectedLang]?.["comments_manager_description"]}
        </p>
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {TranslationsDictionary[selectedLang]?.["no_comments_found"]}
          </div>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              {/* En-tête du commentaire */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#5328EA] rounded-full flex items-center justify-center text-white font-semibold">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {comment.userName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getModuleInfo(comment)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(comment.score)}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        ({comment.score}/5)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Supprimer le commentaire"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-800 dark:text-gray-200 mb-4">
                  {comment.content}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => startReply(comment.id)}
                    className="bg-[#5328EA] hover:bg-[#4722b5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {TranslationsDictionary[selectedLang]?.["reply"]}
                  </button>
                  {comment.replies && comment.replies.length > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {TranslationsDictionary[selectedLang]?.["reply"]} {comment.replies.length} {comment.replies.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Réponses - Toujours affichées si elles existent */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {TranslationsDictionary[selectedLang]?.["replies"]} ({comment.replies.length})
                    </h4>
                    <div className="space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-[#5328EA]">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#5328EA] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {reply.userName.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {reply.userName}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(reply.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <button
                              onClick={() => deleteReply(comment.id, reply.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Supprimer la réponse"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Formulaire de réponse */}
              {replyingTo === comment.id && (
                <div className="px-6 pb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      {TranslationsDictionary[selectedLang]?.["reply_to"]} {comment.userName}
                    </h4>
                    <div className="space-y-3">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Écrivez votre réponse..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5328EA] focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                        rows="4"
                      />
                      <div className="flex items-center gap-3">
                        <button
                          onClick={submitReply}
                          disabled={!replyContent.trim()}
                          className="bg-[#5328EA] hover:bg-[#4722b5] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          {TranslationsDictionary[selectedLang]?.["send_response"]}
                        </button>
                        <button
                          onClick={cancelReply}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          {TranslationsDictionary[selectedLang]?.["cancel"]}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCommentsManager;