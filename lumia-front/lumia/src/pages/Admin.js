import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import RedirectionUser from '../components/redirections/RedirectionUser';
import AdminCommentsManager from '../components/admin/AdminCommentsManager';
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterContent, setNewsletterContent] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(''); // To show success/error messages
  const [activeTab, setActiveTab] = useState('users'); // 'users' ou 'comments'
  const selectedLang = useLang();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/allUsers', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    const filtered = users.filter(user =>
      user.userName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleOpenNewsletterModal = () => {
    setIsNewsletterModalOpen(true);
    setNewsletterStatus(''); // Reset status when opening modal
  };

  const handleCloseNewsletterModal = () => {
    setIsNewsletterModalOpen(false);
    setNewsletterSubject('');
    setNewsletterContent('');
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    setNewsletterStatus(TranslationsDictionary[selectedLang]?.["newsletter_sending"] || "Envoi en cours...");
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post('/api/send-news-letter', 
        { 
          subject: newsletterSubject, 
          content: newsletterContent 
        }, 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      setNewsletterStatus(TranslationsDictionary[selectedLang]?.["newsletter_sent_success"] || "Newsletter envoyée avec succès !");
      // Optionally close modal and clear fields after a delay
      setTimeout(() => {
        handleCloseNewsletterModal();
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la newsletter:', error);
      setNewsletterStatus(TranslationsDictionary[selectedLang]?.["newsletter_send_error"] || "Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-14 px-6 text-gray-800 dark:text-white">
      <div className="w-full flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-[#5328EA] dark:text-violet-400 mb-8">{TranslationsDictionary[selectedLang]?.["administration"] || "Administration"}</h1>
        
        {/* Onglets de navigation */}
        <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-[#5328EA] text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#5328EA]'
            }`}
          >
            {TranslationsDictionary[selectedLang]?.["admin_users_tab"] || "Gestion des Utilisateurs"}
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'comments'
                ? 'bg-[#5328EA] text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#5328EA]'
            }`}
          >
            {TranslationsDictionary[selectedLang]?.["admin_comments_tab"] || "Gestion des Commentaires"}
          </button>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'users' ? (
          <>
            {/* Bouton pour ouvrir la popup de la newsletter */}
            <button 
              onClick={handleOpenNewsletterModal}
              className="mb-6 bg-[#5328EA] hover:bg-[#4722b5] text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              {TranslationsDictionary[selectedLang]?.["send_newsletter"] || "Envoyer une Newsletter"}
            </button>

            <SearchBar
              searchTerm={searchTerm}
              onChange={handleSearchChange}
              placeholder={TranslationsDictionary[selectedLang]?.["search_user_by_pseudo"] || "Rechercher un utilisateur par pseudo..."}
            />
            <div className="w-full md:w-3/5 mt-6">
              {filteredUsers.map((user) => (
                <RedirectionUser key={user.id} user={user} />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full">
            <AdminCommentsManager />
          </div>
        )}
      </div>

      {/* Modal pour la newsletter */}
      {isNewsletterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#5328EA] dark:text-violet-400">{TranslationsDictionary[selectedLang]?.["new_newsletter"] || "Nouvelle Newsletter"}</h2>
            <form onSubmit={handleSendNewsletter}>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{TranslationsDictionary[selectedLang]?.["subject"] || "Sujet"}</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={newsletterSubject}
                  onChange={(e) => setNewsletterSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#5328EA] focus:border-[#5328EA] dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{TranslationsDictionary[selectedLang]?.["content"] || "Contenu"}</label>
                <textarea 
                  id="content" 
                  rows="6"
                  value={newsletterContent}
                  onChange={(e) => setNewsletterContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#5328EA] focus:border-[#5328EA] dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              {newsletterStatus && (
                <p className={`mb-4 text-sm ${newsletterStatus.includes('Erreur') ? 'text-red-500' : 'text-green-500'}`}>
                  {newsletterStatus}
                </p>
              )}
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={handleCloseNewsletterModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
                >
                  {TranslationsDictionary[selectedLang]?.["cancel"] || "Annuler"}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#5328EA] hover:bg-[#4722b5] rounded-md disabled:opacity-50"
                  disabled={newsletterStatus === 'Envoi en cours...' || newsletterStatus === 'Newsletter envoyée avec succès !'}
                >
                  {TranslationsDictionary[selectedLang]?.["send"] || "Envoyer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
