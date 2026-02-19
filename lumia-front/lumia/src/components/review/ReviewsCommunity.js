import React, { useState, useEffect, useMemo } from 'react';
import TranslationsDictionary from "../../Translations";
import axios from "axios";
import { useLang } from "../../LangProvider";
import ReviewModal from "./ReviewModal";
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewsCommunity = ({ moduleId, courseId, isMainPage = false }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedLang = useLang();
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [isPaginatedOpen, setIsPaginatedOpen] = useState(false);
  const [paginatedComments, setPaginatedComments] = useState([]);
  const [paginatedLoading, setPaginatedLoading] = useState(false);
  const [paginatedError, setPaginatedError] = useState(null);
  const [paginatedTotalPages, setPaginatedTotalPages] = useState(0);
  const [paginatedCurrentPage, setPaginatedCurrentPage] = useState(1);

  const organizedPaginatedComments = useMemo(() => {
    const parents = paginatedComments.filter(c => !c.parentCommentId);
    const replies = paginatedComments.filter(c => c.parentCommentId);
    
    const organized = parents.map(p => ({
      ...p,
      replies: replies.filter(r => r.parentCommentId === p.id)
    }));
    
    const orphans = replies.filter(r => !parents.some(p => p.id === r.parentCommentId));
    
    return [...organized, ...orphans];
  }, [paginatedComments]);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchReviews = async () => {
      const parsedModuleId = parseInt(moduleId);
      const parsedCourseId = parseInt(courseId);
  
      if (isNaN(parsedModuleId) || isNaN(parsedCourseId)) {
        setError("Invalid moduleId or courseId");
        setLoading(false);
        return;
      }
  
      try {
        // Récupérer tous les commentaires (principaux et réponses)
        const requestConfig = {
          params: {
            moduleId: parsedModuleId,
            courseId: parsedCourseId,
          }
        };
        
        // Ajouter l'autorisation seulement si l'utilisateur est connecté
        if (isLoggedIn) {
          requestConfig.headers = {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          };
        }
        
        const response = await axios.get(`/api/comments`, requestConfig);
  
        // Filtrer et organiser les commentaires (tri du plus récent au plus ancien)
        const mainComments = response.data
          .filter(comment => !comment.parentCommentId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const replies = response.data
          .filter(comment => comment.parentCommentId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Associer les réponses à leurs commentaires parents
        const organizedComments = mainComments.map(comment => ({
          ...comment,
          replies: replies.filter(reply => reply.parentCommentId === comment.id)
        }));
  
        setReviews(organizedComments);
      } catch (err) {
        if (err.status === 400) {
          // Gérer l'erreur 400 si nécessaire
        } else {
          console.error("Error fetching reviews:", err);
          setError(TranslationsDictionary[selectedLang]?.["loading_reviews"] || "Error loading reviews");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviews();
  }, [moduleId, courseId, selectedLang, isLoggedIn]);

  const openReview = () => setIsReviewOpen(true);
  const closeReview = () => setIsReviewOpen(false);
  const openPaginated = async () => {
    setIsPaginatedOpen(true);
    await fetchPaginated(1);
  };
  const closePaginated = () => {
    setIsPaginatedOpen(false);
    setPaginatedComments([]);
    setPaginatedError(null);
    setPaginatedLoading(false);
    setPaginatedTotalPages(0);
    setPaginatedCurrentPage(1);
  };

  const startReply = (reviewId) => {
    setReplyingTo(reviewId);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };

  const submitReply = async () => {
    try {
      console.log(localStorage.getItem("id"))
      console.log(localStorage.getItem("userName"))
      console.log(replyContent)
      console.log(moduleId)
      console.log(courseId)
      console.log(replyingTo)
      const response = await axios.post(`/api/comments/${replyingTo}/reply`,
        {
          userId: localStorage.getItem("id"),
          userName: localStorage.getItem("userName"),
          content: replyContent,
          moduleId: parseInt(moduleId),
          courseId: parseInt(courseId),
          parentId: replyingTo
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json',
            "X-Requested-With": "XMLHttpRequest"
          },
          withCredentials: true
        }
      );
  
      // Mise à jour de l'état avec la nouvelle réponse
      setReviews(reviews.map(review => 
        review.id === replyingTo 
          ? { 
              ...review, 
              replies: [...(review.replies || []), response.data] 
            } 
          : review
      ));
  
      setReplyingTo(null);
      setReplyContent('');
    } catch (error) {
      console.error(TranslationsDictionary[selectedLang]?.["error_submitting_reply"] || "Error submitting reply", error);
      setError(TranslationsDictionary[selectedLang]?.["error_submitting_reply"] || "Error submitting reply");
    }
  };

  const deleteReview = async (id) => {
    try {
      const reviewToDelete = reviews.find(review => review.id === id) || 
                            reviews.flatMap(review => review.replies || []).find(reply => reply.id === id);
      
      await axios.delete(`/api/comment/${id}`, {
        params: {
          messageId: id,
          username: reviewToDelete.userName
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      // Remove the comment or reply from state
      if (reviewToDelete.parentId) {
        // It's a reply
        setReviews(reviews.map(review => ({
          ...review,
          replies: (review.replies || []).filter(reply => reply.id !== id)
        })));
      } else {
        // It's a main comment
        setReviews(reviews.filter(review => review.id !== id));
      }
    } catch (err) {
      console.error(TranslationsDictionary[selectedLang]?.["error_deleting_review"] || "Error deleting review", err);
      setError(TranslationsDictionary[selectedLang]?.["error_deleting_review"] || "Error deleting review");
    }
  };

  const handleNewReview = (newReview) => {
    // Insérer en tête et trier par date (plus récent en premier)
    const merged = [{ ...newReview, replies: [] }, ...reviews];
    const sorted = merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setReviews(sorted);
  };

  // Calculate average rating and valid reviews count
  const validReviews = reviews.filter(review => review.score && review.score > 0);
  const averageRating = validReviews.length > 0 
    ? (validReviews.reduce((sum, review) => sum + review.score, 0) / validReviews.length).toFixed(1)
    : 0;
  const validReviewsCount = validReviews.length;

  const fetchPaginated = async (page) => {
    try {
      setPaginatedLoading(true);
      setPaginatedError(null);
      const parsedModuleId = parseInt(moduleId);
      const parsedCourseId = parseInt(courseId);
      const requestConfig = {
        params: {
          moduleId: parsedModuleId,
          courseId: parsedCourseId,
          page: page,
          size: 10
        }
      };
      if (isLoggedIn) {
        requestConfig.headers = {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        };
      }
      const response = await axios.get(`/api/comments/paginated`, requestConfig);
      setPaginatedComments(response.data.content || []);
      setPaginatedTotalPages(response.data.totalPages || 0);
      setPaginatedCurrentPage(page);
    } catch (err) {
      setPaginatedError("Error loading comments");
    } finally {
      setPaginatedLoading(false);
    }
  };

  const renderReview = (review, isReply = false) => {
    if (isMainPage && !isReply) {
      // New glassmorphism design for main page
      return (
        <motion.div
          key={review.id}
          className="relative group w-full max-w-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative bg-gradient-to-br from-[#030318]/80 to-[#1a1a2e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5328EA]/10 to-[#9579FA]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5328EA] to-[#9579FA] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm truncate overflow-hidden">
                    {review.userName ? review.userName.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate overflow-hidden">{review.userName || 'Anonyme'}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.score
                            ? 'text-[#5328EA] fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3 overflow-hidden">
                {review.content}
              </p>
              
              <p className="text-gray-500 text-xs mb-3">
                {new Date(review.createdAt).toLocaleDateString('fr-FR')}
              </p>

              {/* Afficher la réponse admin dans la version glassmorphism */}
              {review.adminResponse && (
                <div className="mt-3 p-3 bg-blue-900/30 border-l-4 border-blue-500 rounded">
                  <p className="text-blue-300 font-semibold text-xs mb-1">{TranslationsDictionary[selectedLang]?.["team_response"] || "Réponse de l'équipe :"}</p>
                  <p className="text-gray-300 text-xs">{review.adminResponse}</p>
                </div>
              )}

              {/* Afficher les réponses dans la version glassmorphism */}
              {(review.replies || []).length > 0 && (
                <div className="mt-3 space-y-2">
                  {(review.replies || []).map(reply => (
                    <div key={reply.id} className="bg-blue-900/20 border-l-2 border-blue-500 rounded p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {reply.userName ? reply.userName.charAt(0).toUpperCase() : 'A'}
                          </span>
                        </div>
                        <span className="text-blue-300 text-xs font-medium">{reply.userName || 'Anonyme'}</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{reply.content}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(reply.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    } else {
      // Original design for other pages
      return (
        <motion.div
          key={review.id}
          className={`bg-gray-800 rounded-lg p-4 mb-4 ${
            isReply ? 'ml-8 border-l-4 border-blue-500' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {review.pseudo ? review.pseudo.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
              <span className="text-white font-medium truncate max-w-[150px]">{review.userName || 'Anonyme'}</span>
              {!isReply && review.score > 0 && (
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-sm ${
                        index < review.score ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Admin controls and reply functionality for original design */}
            <div className="flex items-center space-x-2">
              {localStorage.getItem("id") && JSON.parse(localStorage.getItem("roles"))[0].name === "ADMIN" && (
                <button
                onClick={() => deleteReview(review.id)}
                className="text-red-400 hover:text-red-300 text-sm"
                >
                  {TranslationsDictionary[selectedLang]?.["delete"] || "Supprimer"}
                </button>
              )}
              {localStorage.getItem("id") && !isReply && JSON.parse(localStorage.getItem("roles"))[0].name === "ADMIN" && (
                <button
                onClick={() => startReply(review.id)}
                className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {TranslationsDictionary[selectedLang]?.["reply"] || "Répondre"}
                </button>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 mb-2 break-words overflow-hidden">{review.content}</p>
          <p className="text-gray-500 text-sm">
            {new Date(review.createdAt).toLocaleDateString('fr-FR')}
          </p>
          
          {/* Reply form and admin responses for original design */}
          {replyingTo === review.id && (
            <div className="mt-4 p-3 bg-gray-700 rounded">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Votre réponse..."
                className="w-full p-2 bg-gray-600 text-white rounded resize-none break-words"
                rows="3"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => submitReply(review.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {TranslationsDictionary[selectedLang]?.["send"] || "Envoyer"}
                </button>
                <button
                  onClick={cancelReply}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  {TranslationsDictionary[selectedLang]?.["cancel"] || "Annuler"}
                </button>
              </div>
            </div>
          )}
          
          {/* Afficher la réponse admin dans le design original */}
          {review.adminResponse && (
            <div className="mt-3 p-3 bg-blue-900/30 border-l-4 border-blue-500 rounded">
              <p className="text-blue-300 font-semibold text-sm mb-1">{TranslationsDictionary[selectedLang]?.["team_response"] || "Réponse de l'équipe :"}</p>
              <p className="text-gray-300 text-sm">{review.adminResponse}</p>
            </div>
          )}
          
          {/* Render replies */}
          {(review.replies || []).map(reply => renderReview(reply, true))}
        </motion.div>
      );
    }
  };

  return (
    <>
      {isMainPage ? (
        <div></div>
      ) : (
        <div className="w-full h-[1px] bg-[#5328EA]" />
      )}
      <div className="pt-14 pb-14">
        {loading ? (
          <div className="flex justify-center pt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5328EA]"></div>
          </div>
        ) : error ? (
          <>
            {isLoggedIn && (
              <motion.button
                onClick={openReview}
                className='inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#5328EA] hover:bg-[#7855E6] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg mx-auto block'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-5 h-5" />
                {TranslationsDictionary[selectedLang]?.["leave_rating"]}
              </motion.button>
            )}
            <div className="text-red-400 text-center pt-8">{error}</div>
          </>
        ) : (
          <>
            {isMainPage ? (
              /* New glassmorphism layout for main page */
              <motion.div 
                className='flex flex-col lg:flex-row gap-6 justify-center items-start'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
              >
                {/* Average Rating (like ReviewAverage) with increased height */}
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative bg-gradient-to-br from-[#030318]/80 to-[#1a1a2e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl h-[400px] flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5328EA]/20 to-[#9579FA]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5328EA] to-[#9579FA] rounded-full flex items-center justify-center mb-2">
                        <Star className="w-6 h-6 text-white fill-current" />
                      </div>
                      
                      <div className="flex space-x-1 text-2xl md:text-3xl">
                        {[...Array(Math.floor(averageRating))].map((_, index) => (
                          <span key={index} className="text-[#5328EA] drop-shadow-lg">★</span>
                        ))}
                        {[...Array(5 - Math.floor(averageRating))].map((_, index) => (
                          <span key={index} className="text-gray-400">★</span>
                        ))}
                      </div>
                      
                      <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold font-Gotham text-white mb-1">
                          {averageRating}<span className="text-[#9579FA]">/5</span>
                        </p>
                        <p className="text-gray-400 text-sm md:text-base">Sur {validReviewsCount} avis</p>
                      </div>
                    </div>
                    </div>
                  </motion.div>

                  {/* Bouton d'ajout d'avis en haut (main page) */}
                  {isLoggedIn && (
                    <div className="pt-6">
                      <motion.button
                        onClick={openReview}
                        className='inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#5328EA] hover:bg-[#7855E6] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Star className="w-5 h-5" />
                        {TranslationsDictionary[selectedLang]?.["leave_rating"]}
                      </motion.button>
                    </div>
                  )}

                  {/* Reviews Grid - Affichage adaptatif selon le nombre de commentaires */}
                  <div className={`grid gap-4 lg:gap-6 max-w-4xl pt-8 overflow-hidden ${
                    reviews.length === 1 ? 'grid-cols-1 justify-center' :
                    reviews.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                    reviews.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                    reviews.length === 4 ? 'grid-cols-1 md:grid-cols-2' :
                    reviews.length === 5 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {reviews.length > 0 ? (
                      reviews.slice(0, Math.min(visibleCount, reviews.length)).map((review, index) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {renderReview(review)}
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full">
                        <p className="text-gray-300 text-center">
                          {TranslationsDictionary[selectedLang]?.["no_reviews_yet"]}
                        </p>
                      </div>
                    )}
                  </div>

                  {reviews.length > visibleCount && (
                    <div className="pt-6">
                      <button
                        onClick={openPaginated}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        {"See more"}
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
              /* Original layout for other pages */
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {TranslationsDictionary[selectedLang]?.["community_reviews"] || "Avis de la communauté"}
                  </h3>
                  {isLoggedIn && (
                    <motion.button
                      onClick={openReview}
                      className='inline-flex items-center gap-2 px-4 py-2 bg-[#5328EA] hover:bg-[#7855E6] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star className="w-4 h-4" />
                      {TranslationsDictionary[selectedLang]?.["leave_rating"]}
                    </motion.button>
                  )}
                </div>
                
                {reviews.length > 0 ? (
                  reviews.slice(0, Math.min(visibleCount, reviews.length)).map(review => renderReview(review))
                ) : (
                  <p className="text-gray-300 text-center">
                    {TranslationsDictionary[selectedLang]?.["no_reviews_yet"]}
                  </p>
                )}

                {reviews.length > visibleCount && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={openPaginated}
                      className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      {"See more"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Message for non-logged users */}
            {!isLoggedIn && (
              <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm">
                  {TranslationsDictionary[selectedLang]?.["login_to_leave_review"] || "Connectez-vous pour laisser un avis"}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {isReviewOpen && isLoggedIn && (
        <ReviewModal
          onClose={closeReview}
          moduleId={moduleId}
          courseId={courseId}
          onReviewSubmitted={handleNewReview}
        />
      )}
      {isPaginatedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #0f0f1e;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #2a2a40;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #3a3a55;
            }
          `}</style>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-[#0f0f1e] border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl h-[75vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#0f0f1e]/50 backdrop-blur-xl z-10">
              <h4 className="text-white text-xl font-bold font-Gotham flex items-center gap-3">
                <Star className="w-6 h-6 text-[#5328EA] fill-current" />
                {TranslationsDictionary[selectedLang]?.["community_reviews"] || "Comments"}
              </h4>
              <button 
                onClick={closePaginated} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0f0f1e]">
              {paginatedLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5328EA]"></div>
                </div>
              ) : paginatedError ? (
                <div className="flex flex-col items-center justify-center h-full text-red-400 gap-2">
                  <span className="text-lg">⚠️</span>
                  {paginatedError}
                </div>
              ) : (
                <>
                  <div className="grid gap-4">
                    {organizedPaginatedComments.map((c, index) => (
                      <motion.div 
                        key={c.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-[#1a1a2e] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#5328EA] to-[#9579FA] rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-sm">
                                {(c.userName || "A").charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm">{c.userName || "Anonyme"}</div>
                              <div className="text-gray-500 text-xs">
                                {new Date(c.createdAt).toLocaleDateString('fr-FR', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                            </div>
                          </div>
                          {!c.parentCommentId && c.score > 0 && (
                            <div className="flex items-center bg-black/20 px-2 py-1 rounded-lg">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`w-3 h-3 ${index < c.score ? "text-[#5328EA] fill-current" : "text-gray-700"}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed break-all pl-[52px]">{c.content}</p>

                        {/* Render Replies in Pagination */}
                        {c.replies && c.replies.length > 0 && (
                          <div className="mt-4 pl-12 space-y-3">
                            {c.replies.map(reply => (
                              <div key={reply.id} className="bg-white/5 rounded-lg p-3 border-l-2 border-[#5328EA]">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 bg-[#5328EA] rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                      {(reply.userName || "A").charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <span className="text-white text-xs font-medium">{reply.userName || "Anonyme"}</span>
                                  <span className="text-gray-500 text-xs">
                                    {new Date(reply.createdAt).toLocaleDateString('fr-FR')}
                                  </span>
                                </div>
                                <p className="text-gray-300 text-sm pl-8">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {paginatedComments.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <p>{TranslationsDictionary[selectedLang]?.["no_reviews_yet"] || "No comments yet"}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer / Pagination */}
            <div className="p-6 border-t border-white/10 bg-[#0f0f1e]/50 backdrop-blur-xl z-10">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {Array.from({ length: paginatedTotalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => fetchPaginated(page)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      paginatedCurrentPage === page 
                        ? "bg-[#5328EA] text-white shadow-lg shadow-[#5328EA]/25 scale-110" 
                        : "bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a40] hover:text-white border border-white/5"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ReviewsCommunity;
