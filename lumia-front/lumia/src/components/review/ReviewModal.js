import React, { useState } from "react";
import LumiaIcon from "../../icons-svg/LumiaIcon";
import axios from "axios";

import { useLang } from "../../LangProvider";
import TranslationsDictionary from "../../Translations";

const ReviewModal = ({ onClose, moduleId, courseId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLang = useLang();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/new-comments", {
        userId: localStorage.getItem("id"),
        userName: localStorage.getItem("userName"),
        content: review,
        score: rating,
        moduleId: moduleId,
        courseId: courseId
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json',
          "X-Requested-With": "XMLHttpRequest"
        },
        withCredentials: true
      },);

      if (response.status === 200 || response.status === 201) {
        setSuccess(TranslationsDictionary[selectedLang]?.["review_submitted"] || "Review submitted successfully!");
        onReviewSubmitted(response.data);
        setError(null);
        // Fermer immédiatement le popup après soumission réussie
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response);
        setError(TranslationsDictionary[selectedLang]?.["review_submission_failed"] || "Failed to submit review.");
      } else {
        console.log(error);
        setError(TranslationsDictionary[selectedLang]?.["error_occurred"] || "An error occurred.");
      }
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl w-96 z-50 relative ${isLoading ? "opacity-70 pointer-events-none" : ""}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5328EA]"></div>
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-center text-[#5328EA] dark:text-white mb-4">
          {TranslationsDictionary[selectedLang]?.["leave_a_review"] || "Leave a Review"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {TranslationsDictionary[selectedLang]?.["how_was_your_experience"] || "How was your experience?"}
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none transition-colors duration-200`}
                  onClick={() => handleStarClick(star)}
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                  disabled={localStorage.getItem("id") === null || isLoading}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {TranslationsDictionary[selectedLang]?.["click_to_rate"] || "Click to rate"}
            </p>
          </div>
  
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {TranslationsDictionary[selectedLang]?.["your_review"] || "Your Review"}
            </label>
            <textarea
              id="review"
              placeholder={TranslationsDictionary[selectedLang]?.["your_message"] || "Share your thoughts..."}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-4 bg-[#EAEAEA] placeholder:text-[#9579FA] text-[#5328EA] focus:outline-none focus:ring-2 focus:ring-[#5328EA] h-32 resize-none"
              aria-label="Review textarea"
              disabled={localStorage.getItem("id") === null || isLoading}
            />
          </div>
  
          {localStorage.getItem("id") !== null && localStorage.getItem("emailVerified") === "true" ? (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#5328EA] text-white rounded-lg hover:bg-[#4520c4] transition-colors disabled:opacity-50"
              disabled={isLoading || rating === 0}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {TranslationsDictionary[selectedLang]?.["loading"] || "Loading..."}
                </span>
              ) : (
                TranslationsDictionary[selectedLang]?.["submit_review"]
              )}
            </button>
          ) : (
            <div className="text-center">
              <button
                type="button"
                className="w-full py-2 px-4 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                disabled
              >
                {TranslationsDictionary[selectedLang]?.["submit_review"]}
              </button>
              <p className="text-sm text-red-500 mt-2">
                {TranslationsDictionary[selectedLang]?.["please_login_to_review"]}
              </p>
            </div>
          )}
        </form>
  
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default ReviewModal;
