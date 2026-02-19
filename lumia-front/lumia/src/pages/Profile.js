import React, {useState, useEffect} from 'react';
import BadgePreview from '../components/badge/BadgePreview';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProfileModify from '../components/modal/ProfileModify';

const Profile = () => {
    const selectedLang = useLang();
    const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false);
    const [isProfileModifyOpen, setIsProfileModifyOpen] = useState(false);
    const [userBadges, setUserBadges] = useState([]);
    const [badgesLoading, setBadgesLoading] = useState(true);
    const [logFiles, setLogFiles] = useState([]);
    const [logFilesLoading, setLogFilesLoading] = useState(false);

    useEffect(() => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        window.location.href = '/';
        return;
      }
      
      // Fetch user badges
      const fetchUserBadges = async () => {
        try {
          setBadgesLoading(true);
          const response = await axios.get(`/api/${userId}/badges`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          
          console.log('User badges:', response.data);
          setUserBadges(response.data);
          
          // If user has no badges, assign BEGINNER badge
          if (response.data.length === 0) {
            try {
              await axios.post(`/api/${userId}/badges`, 
                { badge: 'BEGINNER' },
                {
                  headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                  },
                }
              );
              
              // Fetch badges again to get the newly added BEGINNER badge
              const updatedResponse = await axios.get(`/api/${userId}/badges`, {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
              });
              setUserBadges(updatedResponse.data);
              console.log('BEGINNER badge added successfully');
            } catch (addBadgeError) {
              console.error('Error adding BEGINNER badge:', addBadgeError);
            }
          }
        } catch (error) {
          console.error('Error fetching user badges:', error);
        } finally {
          setBadgesLoading(false);
        }
      };
      
      fetchUserBadges();
    }, []);

    // Function to fetch user log files
  const fetchLogFiles = async () => {
    try {
      setLogFilesLoading(true);
      const userId = localStorage.getItem("id");
      const response = await axios.get(`/api/game/log-files`, {
        params: { userId },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(userId);
      setLogFiles(response.data);
    } catch (error) {
      console.error('Error fetching log files:', error);
      setLogFiles([]);
    } finally {
      setLogFilesLoading(false);
    }
  };
  
  // Function to download a specific game file
  const downloadGameFile = async (gameType) => {
    // Vérifier l'authentification et la vérification
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    const emailVerified = localStorage.getItem('emailVerified');
    
    if (!userId || !accessToken) {
        alert('Vous devez être connecté pour télécharger les fichiers.');
        return;
    }
    
    if (emailVerified !== 'true') {
        alert('Vous devez vérifier votre email pour télécharger les fichiers.');
        return;
    }
    
    try {
        const response = await axios.get(`/api/game/download`, {
            params: { 
                userId,
                gameType 
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            responseType: 'blob'
        });
        
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${gameType}_logs.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement du fichier.');
    }

  };
    
    // Helper function to get badge display info
    const getBadgeDisplayInfo = (badgeName) => {
      const badgeMap = {
        'BEGINNER': { name: 'Débutant', picture: 'https://i.imgur.com/qYGofcC.png' },
        'INTERMEDIATE': { name: 'Intermédiaire', picture: 'https://i.imgur.com/mnno982.png' },
        'EXPERT': { name: 'Expert', picture: 'https://i.imgur.com/LuFLzUp.png' },
        'BETA': { name: 'Bêta Testeur', picture: 'https://i.imgur.com/YYf5kr2.png' }
      };
      
      return badgeMap[badgeName] || { name: badgeName, picture: 'https://i.imgur.com/qYGofcC.png' };
    };

    const disconnectFunc = () => {
      localStorage.clear();
      window.location.href = '/';
    };

    const sendMailFunc = async () => {
      setIsEmailButtonDisabled(true);
      setTimeout(() => {
        setIsEmailButtonDisabled(false);
      }, 60000);
      try {
        console.log(localStorage.getItem("id"))
        const response = await axios.post(`/api/newEmailValidation`, {
          params: {
            userId: localStorage.getItem("id"),
          },
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response)
      } catch(error) {
        console.log(error.response)
      }
    };
  
    return (
      <div className="min-h-screen dark:bg-[#010116] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg p-6 max-w-3xl mx-auto relative"
          >
            {localStorage.getItem("id") && JSON.parse(localStorage.getItem("roles") || '[]')[0].name === "ADMIN" && (
              <Link
                to="/admin"
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-[#5328EA] dark:hover:text-[#9579FA] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            )}
            <div className="flex flex-col items-center">
              {/* Profile picture */}
              <div className="relative w-28 h-28 mb-4">
                <div className="w-full h-full bg-gradient-to-r from-[#5328EA] to-[#9579FA] rounded-full flex items-center justify-center border-4 border-white dark:border-[#1A1A2E] shadow-lg">
                  <span className="text-[56px] font-semibold text-white">
                    {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Verification badge */}
                <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full border-4 border-white dark:border-[#1A1A2E] ${JSON.parse(localStorage.getItem("emailVerified")) ? (JSON.parse(localStorage.getItem("roles"))[0].name === "ADMIN" ? 'bg-blue-500' : 'bg-green-500') : 'bg-gray-400'} flex items-center justify-center`}>
                  {JSON.parse(localStorage.getItem("emailVerified")) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Username and location */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-Gotham text-center break-all overflow-hidden px-4">
                {localStorage.getItem("userName")?.length > 20 
                    ? localStorage.getItem("userName").substring(0, 20) + "..." 
                    : localStorage.getItem("userName")}
              </h2>
              <p className="text-[#9579FA] font-medium text-sm font-Gotham mb-6 text-center">
                {localStorage.getItem("place") || TranslationsDictionary[selectedLang]?.["world"]}
              </p>

              {/* XP Bar */}
              <div className="w-full max-w-md mb-6">
                <div className="relative w-full h-5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mb-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${localStorage.getItem("xp") * 100 || 0}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#5328EA] to-[#9579FA]"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">XP</span>
                  <span className="text-[#5328EA] dark:text-[#9579FA] font-medium font-Gotham">
                    {`${TranslationsDictionary[selectedLang]?.["level"]} ${localStorage.getItem("level") || 1}`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-md space-y-3 mb-8">
                <button
                  onClick={() => setIsProfileModifyOpen(true)}
                  className="bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white text-sm font-Gotham font-medium py-3 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  {TranslationsDictionary[selectedLang]?.["modif_profile"]}
                </button>
                <Link
                  to='/shop'
                  className="bg-gradient-to-r from-[#FF774D] to-[#F7B801] text-white text-sm font-Gotham font-medium py-3 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                  </svg>
                  {TranslationsDictionary[selectedLang]?.["manage_subscription"]}
                </Link>
                <button
                  className="text-gray-700 dark:text-gray-300 hover:text-[#5328EA] dark:hover:text-white text-sm font-Gotham font-medium py-2 w-full transition-colors duration-300 flex items-center justify-center"
                  onClick={disconnectFunc}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v1H5a1 1 0 100 2h4v1a1 1 0 102 0V9.414l3 3V16H5V8h4V7a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {TranslationsDictionary[selectedLang]?.["disconnect"]}
                </button>
                {JSON.parse(localStorage.getItem("emailVerified")) === true ? null : (
                  <button
                    className={`text-gray-700 dark:text-gray-300 hover:text-[#5328EA] dark:hover:text-white text-sm font-Gotham font-medium py-2 w-full transition-colors duration-300 flex items-center justify-center ${isEmailButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={sendMailFunc}
                    disabled={isEmailButtonDisabled}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {TranslationsDictionary[selectedLang]?.["send_mail"]}
                  </button>
                )}
              </div>

              {/* Statistics */}
              <div className="w-full max-w-md mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-Gotham mb-3">
                  {TranslationsDictionary[selectedLang]?.["statistics"] || "Statistics"}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium text-sm">
                    <span>{TranslationsDictionary[selectedLang]?.["success_nbr"]}</span>
                    <span className="font-bold">{localStorage.getItem("successLength") || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium text-sm">
                    <span>{TranslationsDictionary[selectedLang]?.["events_done_nbr"]}</span>
                    <span className="font-bold">{localStorage.getItem("eventsLength") || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 font-medium text-sm">
                    <span>{TranslationsDictionary[selectedLang]?.["ai_fighted_nbr"]}</span>
                    <span className="font-bold">{localStorage.getItem("iaFightingLength") || 0}</span>
                  </div>
                </div>
              </div>

              {/* Log Files Section */}
              <div className="w-full max-w-md mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-Gotham mb-3">
                  {TranslationsDictionary[selectedLang]?.["logs_file"]}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <button
                    onClick={fetchLogFiles}
                    className="bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white text-sm font-Gotham font-medium py-2 px-4 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    disabled={logFilesLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4zm2 2v8h8V6H6z" clipRule="evenodd" />
                    </svg>
                    {logFilesLoading ? TranslationsDictionary[selectedLang]?.["loading"] : TranslationsDictionary[selectedLang]?.["available_files"]}
                  </button>
                  
                  {logFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        {TranslationsDictionary[selectedLang]?.["available_files"]}
                      </p>
                      {logFiles.map((logFile, index) => (
                        <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{logFile}</span>
                          <button
                            onClick={() => downloadGameFile(logFile)}
                            className="text-[#5328EA] dark:text-[#9579FA] hover:text-[#9579FA] dark:hover:text-[#5328EA] text-sm font-medium transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!logFilesLoading && logFiles.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm text-center py-2">
                      {TranslationsDictionary[selectedLang]?.["no_files"]}
                    </p>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div className="w-full max-w-md">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-Gotham mb-3">
                  {TranslationsDictionary[selectedLang]?.["badges"]}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {badgesLoading ? (
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm py-4">
                      Chargement des badges...
                    </p>
                  ) : userBadges.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm py-4">
                      {TranslationsDictionary[selectedLang]?.["nothing"]}
                    </p>
                  ) : (
                    userBadges.map((badge, index) => {
                      const badgeInfo = getBadgeDisplayInfo(badge.badgeName);
                      return (
                        <BadgePreview 
                          key={index} 
                          picture={badgeInfo.picture} 
                          name={badgeInfo.name} 
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Profile Modify Modal */}
        <ProfileModify
          isOpen={isProfileModifyOpen} 
          onClose={() => setIsProfileModifyOpen(false)} 
        />
      </div>
    );
  };
  
  export default Profile;
