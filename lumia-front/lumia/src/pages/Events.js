import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Award, Check, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import EventModal from '../components/modal/EventModal';
import axios from 'axios';
import TutorialPopup from '../components/tutorials/TutorialPopup';
import TutorialInteractif from '../components/tutorials/TutorialInteractif';
import { tutorialEventsFr } from '../utils/TutorialUtilsFR';
import { tutorialEventsEn } from '../utils/TutorialUtilsEN';

const Events = () => {
  const selectedLang = useLang();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTutorialPopup, setShowTutorialPopup] = useState(false);
  const [onlyRegistered, setOnlyRegistered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [compactMode, setCompactMode] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState(null);
  const [shareMenuOpenId, setShareMenuOpenId] = useState(null);
  const [sharePopoverPos, setSharePopoverPos] = useState({ top: 0, left: 0 });
  const sharePopoverRef = useRef(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [pendingNavTutorial, setPendingNavTutorial] = useState(false);
  const [navTutorialTarget, setNavTutorialTarget] = useState(null);
  const [isNavTutorialActive, setIsNavTutorialActive] = useState(false);
  
	useEffect(() => {
		const checkTutorialAsk = () => {
			const tutoAsk = localStorage.getItem('tutoEvents');
			if (tutoAsk === 'true') {
				setShowTutorialPopup(true);
			}
		};

		checkTutorialAsk();
	}, []);

  useEffect(() => {
    if (pendingNavTutorial && !showTutorialPopup) {
      const target = document.querySelector("[data-tutorial-target='nav-shop']");
      if (target) {
        setNavTutorialTarget(target);
        setIsNavTutorialActive(true);
        setPendingNavTutorial(false);
      }
    }
  }, [pendingNavTutorial, showTutorialPopup]);

  // Mapping des événements frontend vers backend EventName
  const getEventName = useCallback((eventId) => {
    const eventMapping = {
      1: 'OPEN_BETA_LUMIA_AI',
      2: 'AI_WORKSHOP_NEURAL_NETWORKS',  // AI Workshop: Neural Networks
      3: 'HACKATHON_AI_INNOVATION',      // 48h AI Hackathon
      4: 'WEBINAR_MACHINE_LEARNING',     // Machine Learning Masterclass
      5: 'COMPETITION_CODE_CHALLENGE',
      6: 'COMPETITION_CODE_CHALLENGE',   // AI Coding Competition
    };
    const eventName = eventMapping[eventId];
    if (!eventName) {
      console.error(`Aucun mapping trouvé pour l'événement ID: ${eventId}`);
      return 'OPEN_BETA_LUMIA_AI'; // Valeur par défaut
    }
    return eventName;
  }, []);

  // Fonction pour récupérer le nombre de participants depuis l'API
  const fetchParticipantCount = useCallback(async (eventId) => {
    try {
      const eventName = getEventName(eventId);
      
      const response = await axios.get(`/api/events/${eventName}/registrations/count`);
      
      return response.data.registrationCount;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de participants:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
      // Retourner 0 en cas d'erreur
      return 0;
    }
  }, [getEventName]);
  
  // Transformer eventsData en état dynamique avec participants initialisés à 0
  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: TranslationsDictionary[selectedLang]?.['open_beta_title'] || 'Open Beta - Lumia AI Platform',
      description: TranslationsDictionary[selectedLang]?.['open_beta_desc'] || 'Soyez parmi les premiers à tester notre plateforme IA révolutionnaire ! Participez à notre Open Beta exclusive et obtenez un badge collector unique. Places limitées à 20 participants seulement.',
      date: '2026-03-15',
      time: '10:00',
      location: 'Online',
      category: 'beta',
      participants: 0, // Sera mis à jour par l'API
      maxParticipants: 20,
      rating: 5.0,
      image: 'https://i.imgur.com/dU4HQZn.png',
      price: 'Free',
      isExclusive: true,
      badge: {
        name: 'Beta Pioneer',
        description: 'Badge exclusif pour les testeurs de la première heure',
        icon: '🏆'
      }
    },
    {
      id: 2,
      title: TranslationsDictionary[selectedLang]?.['ai_workshop_title'] || 'AI Workshop: Neural Networks',
      description: TranslationsDictionary[selectedLang]?.['ai_workshop_desc'] || 'Learn the fundamentals of neural networks and deep learning in this hands-on workshop.',
      date: '2026-03-16',
      time: '14:00',
      location: 'Online',
      category: 'workshop',
      participants: 0, // Sera mis à jour par l'API
      maxParticipants: 50,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      price: 'Free'
    },
    {
      id: 6,
      title: TranslationsDictionary[selectedLang]?.['coding_competition_title'] || 'AI Coding Competition',
      description: TranslationsDictionary[selectedLang]?.['coding_competition_desc'] || 'Compete with other developers to create the best AI solution for real-world problems.',
      date: '2026-03-20',
      time: '10:00',
      location: 'Paris, France',
      category: 'competition',
      participants: 0, // Sera mis à jour par l'API
      maxParticipants: 150,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      price: 'Free'
    },
    {
      id: 3,
      title: TranslationsDictionary[selectedLang]?.['hackathon_title'] || '48h AI Hackathon',
      description: TranslationsDictionary[selectedLang]?.['hackathon_desc'] || 'Build innovative AI solutions in 48 hours with a team of passionate developers.',
      date: '2026-04-01',
      time: '09:00',
      location: 'London, UK',
      category: 'hackathon',
      participants: 0, // Sera mis à jour par l'API
      maxParticipants: 100,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
      price: 'Free'
    },
    {
      id: 4,
      title: TranslationsDictionary[selectedLang]?.['masterclass_title'] || 'Machine Learning Masterclass',
      description: TranslationsDictionary[selectedLang]?.['masterclass_desc'] || 'Advanced techniques in machine learning with practical examples and case studies.',
      date: '2026-04-10',
      time: '13:00',
      location: 'Online',
      category: 'workshop',
      participants: 0, // Sera mis à jour par l'API
      maxParticipants: 40,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      price: 'Free'
    },
    {
      id: 5,
      title: TranslationsDictionary[selectedLang]?.['networking_title'] || 'AI Professionals Networking',
      description: TranslationsDictionary[selectedLang]?.['networking_desc'] || 'Connect with AI professionals, researchers, and enthusiasts in your area.',
      date: '2026-04-15',
      time: '19:00',
      location: 'Berlin, Germany',
      category: 'networking',
      participants: 0, // Sera mis à jour par l'API
      maxParticipants: 80,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop',
      price: 'Free'
    }
  ]);

  // Charger les données réelles des participants au montage du composant
  useEffect(() => {
    const loadParticipantCounts = async () => {
      const updatedEvents = await Promise.all(
        eventsData.map(async (event) => {
          const realParticipantCount = await fetchParticipantCount(event.id);
          return {
            ...event,
            participants: realParticipantCount
          };
        })
      );
      setEventsData(updatedEvents);
    };

    loadParticipantCounts();
  }, []); // Exécuter seulement au montage

  const categories = [
    { id: 'all', name: TranslationsDictionary[selectedLang]?.['all_events'] || 'All Events' },
    { id: 'beta', name: TranslationsDictionary[selectedLang]?.['beta_events'] || 'Beta Events' },
    { id: 'workshop', name: TranslationsDictionary[selectedLang]?.['workshops'] || 'Workshops' },
    { id: 'competition', name: TranslationsDictionary[selectedLang]?.['competitions'] || 'Competitions' },
    { id: 'webinar', name: TranslationsDictionary[selectedLang]?.['webinars'] || 'Webinars' },
    { id: 'hackathon', name: TranslationsDictionary[selectedLang]?.['hackathons'] || 'Hackathons' },
    { id: 'networking', name: TranslationsDictionary[selectedLang]?.['networking'] || 'Networking' }
  ];

  const getRegisteredEventIds = () => {
    const userId = localStorage.getItem('id');
    if (!userId) return [];
    try {
      const raw = localStorage.getItem(`user_${userId}_registrations`);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  };

  const filteredEvents = (() => {
    const byCategory = selectedCategory === 'all'
      ? eventsData
      : eventsData.filter(event => event.category === selectedCategory);
    if (!onlyRegistered) return byCategory;
    const registeredIds = new Set(getRegisteredEventIds());
    const registeredFiltered = byCategory.filter(event => registeredIds.has(event.id));
    return registeredFiltered;
  })();

  // Ensemble des IDs d'événements où l'utilisateur est inscrit
  const registeredIds = new Set(getRegisteredEventIds());

  // Appliquer le filtre de recherche (titre et description)
  const searchFilteredEvents = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filteredEvents;
    return filteredEvents.filter(ev => (
      (ev.title || '').toLowerCase().includes(q) ||
      (ev.description || '').toLowerCase().includes(q)
    ));
  })();

  const getShareUrl = (event) => {
    const base = window.location?.origin || '';
    const url = `${base}/events?event=${encodeURIComponent(event.id)}`;
    return url;
  };

  const shareToTwitter = (event) => {
    const text = encodeURIComponent(`${event.title}`);
    const url = encodeURIComponent(getShareUrl(event));
    const intent = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = (event) => {
    const url = encodeURIComponent(getShareUrl(event));
    const share = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(share, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async (event) => {
    const url = getShareUrl(event);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedEventId(event.id);
      setTimeout(() => setCopiedEventId(null), 1500);
    } catch (_) {
      // Silencieux si clipboard indisponible
    }
  };

  // Positionnement dynamique du popover de partage (comme calendrier)
  useEffect(() => {
    if (!shareMenuOpenId || !shareAnchorEl) return;
    const updatePosition = () => {
      const rect = shareAnchorEl.getBoundingClientRect();
      setSharePopoverPos({ top: rect.top, left: rect.left });
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') { setShareMenuOpenId(null); setShareAnchorEl(null); }
    };
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('keydown', handleKey);
    updatePosition();
    const timer = setTimeout(updatePosition, 0);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timer);
    };
  }, [shareMenuOpenId, shareAnchorEl]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(selectedLang === 'FR' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegister = async (eventId) => {
    
    // Récupérer le nombre réel de participants après inscription
    const realParticipantCount = await fetchParticipantCount(eventId);
    
    // Mettre à jour le nombre de participants avec la valeur réelle
    setEventsData(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, participants: realParticipantCount }
          : event
      )
    );
    
    // Mettre à jour l'événement sélectionné si c'est le même
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(prevEvent => ({
        ...prevEvent,
        participants: realParticipantCount
      }));
    }
  };

  // Fonction pour gérer le clic sur le bouton beta
  const handleBetaClick = () => {
    window.open('https://forms.gle/6dHCPymkJ4eJ7Mv67', '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#010116] py-16 px-4 sm:px-6 lg:px-16 xl:px-24">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {TranslationsDictionary[selectedLang]?.['events_title'] || 'Events'}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {TranslationsDictionary[selectedLang]?.['events_subtitle'] || 'Join our community events, workshops, and competitions to enhance your AI skills and connect with fellow developers.'}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-[#5328EA] text-white shadow-lg transform scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
        <button
          onClick={() => setOnlyRegistered(v => !v)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            onlyRegistered
              ? 'bg-[#5328EA] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-pressed={onlyRegistered}
        >
          {TranslationsDictionary[selectedLang]?.['registered_only'] || 'Inscrit uniquement'}
        </button>
        <button
          onClick={() => setCompactMode(v => !v)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            compactMode
              ? 'bg-[#5328EA] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-pressed={compactMode}
        >
          {TranslationsDictionary[selectedLang]?.['compact_mode'] || 'Mode compact'}
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={TranslationsDictionary[selectedLang]?.['search_events'] || 'Rechercher un évènement...'}
          className="w-64 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5328EA]"
          aria-label={TranslationsDictionary[selectedLang]?.['search_events'] || 'Rechercher un évènement'}
        />
      </motion.div>

      {/* Events Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${compactMode ? 'gap-4' : 'gap-6'}`}
      >
        {searchFilteredEvents.map((event, index) => (
          <motion.div
            onClick={() => handleEventClick(event)}
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className={`bg-white dark:bg-gray-800 ${compactMode ? 'rounded-lg shadow' : 'rounded-xl shadow-md hover:shadow-lg'} transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer ${
              event.isExclusive ? 'ring-2 ring-[#5328EA] ring-opacity-50' : ''
            }`}
          >
            {/* Top Group: Image + Content */}
            <div className="flex-grow">
              {/* Event Image */}
              <div className={`relative ${compactMode ? 'h-28' : 'h-36'} overflow-hidden`}>
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                  {event.price}
                </div>
                {registeredIds.has(event.id) && (
                  <div className="absolute top-4 right-24 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm">
                    <Check size={12} className="mr-1" />
                    {TranslationsDictionary[selectedLang]?.['registered'] || 'Inscrit'}
                  </div>
                )}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  event.isExclusive 
                    ? 'bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white animate-pulse'
                    : 'bg-[#5328EA] text-white'
                }`}>
                  {event.isExclusive && '⭐ '}
                  {TranslationsDictionary[selectedLang]?.[event.category] || event.category}
                </div>
                {event.isExclusive && (
                  <div className="absolute bottom-4 left-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <Award size={12} className="mr-1" />
                    EXCLUSIF
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className={`${compactMode ? 'p-3' : 'p-4'} pb-0`}>
                <h3 className={`${compactMode ? 'text-base' : 'text-lg'} font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2`}>
                  {event.title}
                </h3>
                {!compactMode && (
                  <p className={`${compactMode ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-300 mb-3 line-clamp-3`}>
                    {event.description}
                  </p>
                )}

                {/* Badge Info for Beta Event */}
                {event.badge && !compactMode && (
                  <div className={`bg-gradient-to-r from-[#5328EA]/10 to-[#9579FA]/10 border border-[#5328EA]/20 rounded-lg ${compactMode ? 'p-2' : 'p-3'} mb-3`}>
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{event.badge.icon}</span>
                      <span className={`${compactMode ? 'text-xs' : 'text-sm'} font-semibold text-[#5328EA] dark:text-[#9579FA]`}>
                        Badge: {event.badge.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {event.badge.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Group: Event Details + Progress Bar + Button */}
            <div className={`${compactMode ? 'p-3 pt-2' : 'p-4 pt-3'} mt-auto relative`}>
              <div className={`flex items-center ${compactMode ? 'text-[11px] mb-2' : 'text-xs mb-1.5'} text-gray-500 dark:text-gray-400`}>
                <Calendar size={compactMode ? 12 : 14} className="mr-2" />
                {formatDate(event.date)}
              </div>
              
              {/* Event Details & Progress Bar cachés en mode compact */}
              {!compactMode && (
                <>
                  <div className={`${compactMode ? 'space-y-1 mb-2.5' : 'space-y-1.5 mb-3'}`}>
                    <div className={`flex items-center ${compactMode ? 'text-[11px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
                      <Clock size={compactMode ? 12 : 14} className="mr-2" />
                      {event.time}
                    </div>
                    <div className={`flex items-center ${compactMode ? 'text-[11px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
                      <MapPin size={compactMode ? 12 : 14} className="mr-2" />
                      {event.location}
                    </div>
                    <div className={`flex items-center justify-between ${compactMode ? 'text-[11px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
                      <div className="flex items-center">
                        <Users size={compactMode ? 12 : 14} className="mr-2" />
                        <span className={event.isExclusive ? 'text-[#5328EA] font-medium' : ''}>
                          {event.participants}/{event.maxParticipants} {TranslationsDictionary[selectedLang]?.['participants'] || 'participants'}
                        </span>
                        {event.isExclusive && (
                          <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            LIMITÉ
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star size={compactMode ? 12 : 14} className="mr-1 text-yellow-400 fill-current" />
                        {event.rating}
                      </div>
                    </div>
                  </div>

                  <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${compactMode ? 'h-1 mb-2.5' : 'h-1.5 mb-3'}`}>
                    <div 
                      className={`${compactMode ? 'h-1' : 'h-1.5'} rounded-full transition-all duration-300 ${
                        event.isExclusive 
                          ? 'bg-gradient-to-r from-[#5328EA] to-[#9579FA]'
                          : 'bg-[#5328EA]'
                      }`}
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </>
              )}

              {/* Share Button + Popover Menu */}
              <div className="flex items-center justify-between mb-2">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextId = shareMenuOpenId === event.id ? null : event.id;
                      setShareMenuOpenId(nextId);
                      if (nextId) {
                        setShareAnchorEl(e.currentTarget);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setSharePopoverPos({ top: rect.top, left: rect.left });
                      } else {
                        setShareAnchorEl(null);
                      }
                    }}
                    className={`flex items-center space-x-1 ${compactMode ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs'} rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700`}
                    aria-haspopup="menu"
                    aria-expanded={shareMenuOpenId === event.id}
                  >
                    <Share2 size={compactMode ? 12 : 14} />
                    <span>{TranslationsDictionary[selectedLang]?.['share'] || 'Partager'}</span>
                  </button>
                  {shareMenuOpenId === event.id && createPortal(
                    <div
                      className="fixed inset-0 z-[1000]"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); setShareMenuOpenId(null); setShareAnchorEl(null); }}
                    >
                      <div className="absolute" style={{ top: sharePopoverPos.top, left: sharePopoverPos.left }}>
                        <motion.div
                          ref={sharePopoverRef}
                          initial={{ opacity: 0, scale: 0.96, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                          className="relative w-44 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                          role="menu"
                        >
                          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                            {TranslationsDictionary[selectedLang]?.['share'] || 'Partager'}
                          </div>
                          <div className="px-2 py-2">
                            <button
                              onClick={() => { shareToTwitter(event); setShareMenuOpenId(null); setShareAnchorEl(null); }}
                              className="w-full flex items-center px-2 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-700 rounded-md"
                              role="menuitem"
                            >
                              <Twitter size={14} className="mr-2" /> Twitter
                            </button>
                            <button
                              onClick={() => { shareToLinkedIn(event); setShareMenuOpenId(null); setShareAnchorEl(null); }}
                              className="w-full flex items-center px-2 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-700 rounded-md"
                              role="menuitem"
                            >
                              <Linkedin size={14} className="mr-2" /> LinkedIn
                            </button>
                            <button
                              onClick={async () => { await copyLink(event); setShareMenuOpenId(null); setShareAnchorEl(null); }}
                              className="w-full flex items-center px-2 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md"
                              role="menuitem"
                            >
                              <Copy size={14} className="mr-2" /> {TranslationsDictionary[selectedLang]?.['copy_link'] || 'Copier le lien'}
                              {copiedEventId === event.id && (
                                <span className="ml-2 text-[10px] text-green-600">{TranslationsDictionary[selectedLang]?.['copied'] || 'Copié !'}</span>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>

              {/* En savoir plus */}
              <button
                className={`w-full ${compactMode ? 'py-1.5 text-xs' : 'py-2 text-sm'} rounded-md font-medium transition-all duration-300 ${
                  event.isExclusive
                    ? 'bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white hover:from-[#7855E6] hover:to-[#B794FF] shadow-md'
                    : 'bg-[#5328EA] text-white hover:bg-[#7855E6]'
                }`}
              >
                {TranslationsDictionary[selectedLang]?.['learn_more'] || 'En savoir plus'}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-500 dark:text-gray-400">
            {TranslationsDictionary[selectedLang]?.['no_events'] || 'No events found for this category.'}
          </p>
        </motion.div>
      )}

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
            onRegister={handleRegister}
          />
        )}
      </AnimatePresence>
      <TutorialPopup
				isOpen={showTutorialPopup}
				onClose={() => {
					setShowTutorialPopup(false);
					localStorage.setItem('tutoEvents', 'false');
				}}
				tutorialPages={selectedLang === 'EN' ? tutorialEventsEn : tutorialEventsFr}
				initial={false}
        onComplete={() => {
          setPendingNavTutorial(true);
        }}
			/>
      {isNavTutorialActive && navTutorialTarget && (
        <TutorialInteractif
          target={navTutorialTarget}
          text={selectedLang === 'EN' ? "Click here to open the Shop page" : "Clique ici pour ouvrir la page de la boutique"}
          onClose={() => {
            setIsNavTutorialActive(false);
            setNavTutorialTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default Events;
