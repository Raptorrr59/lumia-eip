import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Award, X, CheckCircle, Mail, User, Download, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import { useLang } from '../../LangProvider';
import { useTheme } from '../../contexts/ThemeContext';
import TranslationsDictionary from '../../Translations';
import axios from 'axios';
import Turnstile from '../Turnstile';
import GoogleIcon from '../../icons-svg/GoogleIcon';

const EventModal = ({ event, onClose, onRegister }) => {
  const { isDarkMode } = useTheme();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationMessageType, setRegistrationMessageType] = useState('success'); // 'success' or 'error'
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ firstName: '', lastName: '', email: '' });
  const [participantCount, setParticipantCount] = useState(0);
  const selectedLang = useLang();
  const [token, setToken] = useState(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const calendarButtonRef = useRef(null);
  const popoverRef = useRef(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  // Partage
  const shareButtonRef = useRef(null);
  const sharePopoverRef = useRef(null);
  const [sharePopoverPos, setSharePopoverPos] = useState({ top: 0, left: 0 });
  const [showSharePopover, setShowSharePopover] = useState(false);

  const siteKey = process.env.REACT_APP_SITE_KEY;

  // Fonctions utilitaires
  const isLoggedIn = useCallback(() => {
    return localStorage.getItem('accessToken') !== null;
  }, []);

  const getUserInfo = useCallback(() => {
    try {
      const userInfo = {
        userName: localStorage.getItem('userName'),
        email: localStorage.getItem('email'),
      };
      return userInfo;
    } catch {
      return {};
    }
  }, []);

  // Mapping des événements
  const getEventName = useCallback((eventId) => {
    const eventMapping = {
      1: 'OPEN_BETA_LUMIA_AI',
      2: 'AI_WORKSHOP_NEURAL_NETWORKS',  // AI Workshop: Neural Networks
      3: 'HACKATHON_AI_INNOVATION',      // 48h AI Hackathon
      4: 'WEBINAR_MACHINE_LEARNING',     // Machine Learning Masterclass
      5: 'NETWORKING_TECH_MEETUP',
      6: 'COMPETITION_CODE_CHALLENGE'    // AI Coding Competition
    };

    const eventName = eventMapping[eventId];
    if (!eventName) {
      console.error(`${TranslationsDictionary[selectedLang]?.["event_id"]} ${eventId} ${TranslationsDictionary[selectedLang]?.["not_found_in_mapping"]}`);
      return 'OPEN_BETA_LUMIA_AI'; // Valeur par défaut valide
    }
    return eventName;
  }, []);

  // Récupération du nombre de participants
  const fetchParticipantCount = useCallback(async () => {
    try {
      const eventName = getEventName(event.id);
      const response = await axios.get(`/api/events/${eventName}/registrations/count`);
      setParticipantCount(response.data.registrationCount || 0);
    } catch (error) {
      console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["fetch_participant_count"]}:`, error);
      setParticipantCount(0);
    }
  }, [event.id, getEventName]);

  // Fonction d'inscription
  const registerToEvent = useCallback(async (userEmail, userName) => {
    const eventName = getEventName(event.id);
    try {
      const response = await axios.post(
        `/api/send-event-registration-email`,
        null,
        {
          params: { 'cf-turnstile-response': token, eventName, userEmail, userName }
        }
      );

      if (response.status === 200) {
        setIsRegistered(true);
        await fetchParticipantCount(); // Re-synchroniser avec le backend
        alert(`${TranslationsDictionary[selectedLang]?.['registration_success'] || 'Registration success'}. ${TranslationsDictionary[selectedLang]?.['receive_email'] || 'You will receive an email with everything you need to know about this event !'}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["registration"]}:`, error);
      throw error;
    }
  }, [event.id, getEventName, fetchParticipantCount, token]);

  // Fonction de désinscription
  const unregisterFromEvent = useCallback(async (userEmail) => {
    const eventName = getEventName(event.id);
    try {
      const response = await axios.delete(`/api/unregister-from-event`, {
        params: { 'cf-turnstile-response': token, eventName, userEmail }
      });

      if (response.status === 200) {
        setIsRegistered(false);
        await fetchParticipantCount(); // Re-synchroniser avec le backend
        return true;
      }
      return false;
    } catch (error) {
      console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["unregistration"]}:`, error);
      throw error;
    }
  }, [event.id, getEventName, fetchParticipantCount, token]);

  // Vérification de l'inscription locale
  const checkLocalRegistration = useCallback(() => {
    if (isLoggedIn()) {
      const userId = localStorage.getItem('id');
      const registrationKey = `event_registration_${event.id}_user_${userId}`;
      return localStorage.getItem(registrationKey) === 'true';
    } else {
      const eventPrefix = `event_registration_${event.id}_guest_`;
      const keys = Object.keys(localStorage);
      return keys.some(key => key.startsWith(eventPrefix) && localStorage.getItem(key) === 'true');
    }
  }, [event.id, isLoggedIn]);

  // Vérification de l'inscription au chargement
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const localRegistration = checkLocalRegistration();
        setIsRegistered(localRegistration);

        if (isLoggedIn()) {
          const userInfo = getUserInfo();
          const userEmail = userInfo.email;
          const userId = localStorage.getItem('id');
          const registrationKey = `event_registration_${event.id}_user_${userId}`;

          if (userEmail) {
            try {
              const eventName = getEventName(event.id);
              const response = await axios.get(`/api/check-event-registration/${eventName}`, {
                params: {
                  eventName: eventName,
                  userEmail: userEmail
                }
              });
              const isRegisteredFromAPI = response.data.isRegistered;

              if (isRegisteredFromAPI) {
                setIsRegistered(true);
                localStorage.setItem(registrationKey, 'true');

                const userRegistrations = JSON.parse(localStorage.getItem(`user_${userId}_registrations`) || '[]');
                if (!userRegistrations.includes(event.id)) {
                  userRegistrations.push(event.id);
                  localStorage.setItem(`user_${userId}_registrations`, JSON.stringify(userRegistrations));
                }
              } else {
                setIsRegistered(false);
                localStorage.removeItem(registrationKey);

                const userRegistrations = JSON.parse(localStorage.getItem(`user_${userId}_registrations`) || '[]');
                const updatedRegistrations = userRegistrations.filter(id => id !== event.id);
                localStorage.setItem(`user_${userId}_registrations`, JSON.stringify(updatedRegistrations));
              }
            } catch (apiError) {
              console.warn(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["registration_check"]}:`, apiError);
              setIsRegistered(localRegistration);
            }
          }
        } else {
          const eventPrefix = `event_registration_${event.id}_guest_`;
          const keys = Object.keys(localStorage);
          const hasGuestRegistration = keys.some(key => key.startsWith(eventPrefix) && localStorage.getItem(key) === 'true');
          setIsRegistered(hasGuestRegistration);
        }
      } catch (error) {
        console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["registration_check"]}:`, error);
        const fallbackRegistration = checkLocalRegistration();
        setIsRegistered(fallbackRegistration);
      }
    };

    checkRegistration();
    fetchParticipantCount();
  }, [event.id, isLoggedIn, getUserInfo, checkLocalRegistration, getEventName, fetchParticipantCount]);

  const translations = useMemo(() => ({
    description: TranslationsDictionary[selectedLang]?.['description'] || 'Description',
    location: TranslationsDictionary[selectedLang]?.['location'] || 'Lieu',
    participants: TranslationsDictionary[selectedLang]?.['participants'] || 'Participants',
    register: TranslationsDictionary[selectedLang]?.['register'] || 'S\'inscrire',
    registered: TranslationsDictionary[selectedLang]?.['registered'] || 'Inscrit',
    unregister: TranslationsDictionary[selectedLang]?.['unregister'] || 'Se désinscrire',
    login_required: TranslationsDictionary[selectedLang]?.['login_required'] || 'Connexion requise',
    guest_registration: TranslationsDictionary[selectedLang]?.['guest_registration'] || 'Inscription invité',
    already_registered: TranslationsDictionary[selectedLang]?.['already_registered'] || 'Déjà inscrit',
    email_not_sent: TranslationsDictionary[selectedLang]?.['email_not_sent'] || 'Erreur d\'envoi',
    fill_all_fields: TranslationsDictionary[selectedLang]?.['fill_all_fields'] || 'Remplir tous les champs',
    guest_first_name: TranslationsDictionary[selectedLang]?.['guest_first_name'] || 'Prénom',
    guest_last_name: TranslationsDictionary[selectedLang]?.['guest_last_name'] || 'Nom',
    guest_email: TranslationsDictionary[selectedLang]?.['guest_email'] || 'Email',
    cancel: TranslationsDictionary[selectedLang]?.['cancel'] || 'Annuler'
  }), [selectedLang]);

  // Gestion de l'inscription pour utilisateurs connectés
  const handleRegister = useCallback(async () => {
    if (isRegistered) {
      setRegistrationMessage(translations.already_registered);
      setRegistrationMessageType('success');
      return;
    }

    if (event.maxParticipants && participantCount >= event.maxParticipants) {
      setRegistrationMessage(`${TranslationsDictionary[selectedLang]?.['event_full']} - ${TranslationsDictionary[selectedLang]?.['registration_unavailable']}`);
      setRegistrationMessageType('error');
      return;
    }

    setIsLoading(true);
    setRegistrationMessage('');

    try {
      if (isLoggedIn()) {
        // UTILISATEUR CONNECTÉ - INSCRIPTION DIRECTE (pas de formulaire)
        const userInfo = getUserInfo();
        const userId = localStorage.getItem('id');
        const registrationKey = `event_registration_${event.id}_user_${userId}`;

        const success = await registerToEvent(
          userInfo.email,
          userInfo.userName
        );

        if (success) {
          // Mise à jour du localStorage
          localStorage.setItem(registrationKey, 'true');

          const userRegistrations = JSON.parse(localStorage.getItem(`user_${userId}_registrations`) || '[]');
          if (!userRegistrations.includes(event.id)) {
            userRegistrations.push(event.id);
            localStorage.setItem(`user_${userId}_registrations`, JSON.stringify(userRegistrations));
          }

          setIsRegistered(true);
          await fetchParticipantCount();
          setRegistrationMessage(translations.registered);
          setRegistrationMessageType('success');
          if (onRegister) onRegister(event.id);
        } else {
          setRegistrationMessage(translations.email_not_sent);
          setRegistrationMessageType('error');
        }
      } else {
        // UTILISATEUR NON CONNECTÉ - AFFICHER LE FORMULAIRE
        setShowGuestForm(true);
      }
    } catch (error) {
      console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["registration"]}:`, error);
      if (error.response?.status === 403) {
        setRegistrationMessage(translations.login_required);
        setRegistrationMessageType('error');
      } else if (error.response?.status === 409) {
        setRegistrationMessage(translations.already_registered);
        setRegistrationMessageType('success');
      } else if (error.response?.status === 400) {
        setRegistrationMessage(translations.event_full);
        setRegistrationMessageType('error');
      } else {
        setRegistrationMessage(translations.email_not_sent);
        setRegistrationMessageType('error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isRegistered, translations.already_registered, isLoggedIn, getUserInfo, event.id, event.maxParticipants, participantCount, registerToEvent, onRegister, fetchParticipantCount]);

  // Gestion de la désinscription pour utilisateurs connectés
  const handleUnregister = useCallback(async () => {
    setIsLoading(true);
    setRegistrationMessage('');

    try {
      if (isLoggedIn()) {
        const userInfo = getUserInfo();
        const userId = localStorage.getItem('id');
        const registrationKey = `event_registration_${event.id}_user_${userId}`;

        if (userInfo.email) {
          try {
            const success = await unregisterFromEvent(
              userInfo.email,
              `${userInfo.firstName} ${userInfo.lastName}`
            );

            if (success) {
              localStorage.removeItem(registrationKey);

              const userRegistrations = JSON.parse(localStorage.getItem(`user_${userId}_registrations`) || '[]');
              const updatedRegistrations = userRegistrations.filter(id => id !== event.id);
              localStorage.setItem(`user_${userId}_registrations`, JSON.stringify(updatedRegistrations));

              setIsRegistered(false);
              await fetchParticipantCount();
              setRegistrationMessage(translations.unregistered);
              if (onRegister) onRegister(event.id);
            }
          } catch (error) {
            console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["unregistration"]}:`, error);
            if (error.response?.status === 404) {
              setRegistrationMessage(translations.not_registered);
            } else {
              setRegistrationMessage(translations.email_not_sent);
            }
          }
        } else {
          setRegistrationMessage(translations.user_email_not_found);
        }
      }
    } catch (error) {
      console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["unregistration"]}:`, error);
      setRegistrationMessage(translations.email_not_sent);
    } finally {
      setIsLoading(false);
    }
  }, [event.id, isLoggedIn, getUserInfo, unregisterFromEvent, onRegister]);

  // Gestion de l'inscription invité
  const handleGuestRegister = useCallback(async () => {
    if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email) {
      setRegistrationMessage(translations.fill_all_fields);
      return;
    }

    setIsLoading(true);
    setRegistrationMessage('');

    try {
      const success = await registerToEvent(
        guestInfo.email,
        `${guestInfo.firstName} ${guestInfo.lastName}`
      );

      if (success) {
        const guestKey = `event_registration_${event.id}_guest_${guestInfo.email}`;
        localStorage.setItem(guestKey, 'true');

        await fetchParticipantCount();

        if (onRegister) onRegister(event.id);

        setRegistrationMessage(translations.registered);
        setShowGuestForm(false);
        setGuestInfo({ firstName: '', lastName: '', email: '' });
      }
    } catch (error) {
      console.error(`${TranslationsDictionary[selectedLang]?.["error_occurred_during"]} ${TranslationsDictionary[selectedLang]?.["guest_registration"]}:`, error);
      if (error.response?.status === 400) {
        setRegistrationMessage(translations.already_registered);
      } else {
        setRegistrationMessage(translations.email_not_sent);
      }
    } finally {
      setIsLoading(false);
    }
  }, [guestInfo, registerToEvent, event.id, fetchParticipantCount, onRegister]);

  const handleInputChange = useCallback((field, value) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTurnstileError = () => {
    console.warn("Turnstile error - proceeding without verification in dev mode");
    setTurnstileError(true);
  };

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(selectedLang === 'FR' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [selectedLang]);

  // Helpers calendrier: format UTC, URL Google, et génération ICS
  const pad2 = (n) => String(n).padStart(2, '0');
  const formatUTC = (d) =>
    `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}${pad2(d.getUTCSeconds())}Z`;
  const getEventDateTimes = (e) => {
    try {
      const [y, m, d] = String(e.date || '').split('-').map(Number);
      const [hh, mm] = String(e.time || '09:00').split(':').map(Number);
      const start = new Date(y, (m || 1) - 1, d || 1, hh || 9, mm || 0);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return { start, end };
    } catch {
      const start = new Date();
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return { start, end };
    }
  };
  const buildGoogleCalendarUrl = (e) => {
    const { start, end } = getEventDateTimes(e);
    const dates = `${formatUTC(start)}/${formatUTC(end)}`;
    const text = encodeURIComponent(e.title || 'Event');
    const details = encodeURIComponent(e.description || '');
    const location = encodeURIComponent(e.location || '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}&dates=${dates}`;
  };
  const downloadICS = (e) => {
    const { start, end } = getEventDateTimes(e);
    const dtstamp = formatUTC(new Date());
    const dtstart = formatUTC(start);
    const dtend = formatUTC(end);
    const summary = (e.title || 'Event').replace(/\r?\n/g, ' ');
    const description = (e.description || '').replace(/\r?\n/g, ' ');
    const location = (e.location || '').replace(/\r?\n/g, ' ');
    const uid = `lumia-${e.id || Date.now()}@lumia.ai`;
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lumia//Events//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // État pour la mini-popover calendrier
  const [showCalendarPopover, setShowCalendarPopover] = useState(false);

  // Détection fournisseur (Google vs Autres)
  const detectCalendarProvider = () => {
    const ua = (navigator.userAgent || '').toLowerCase();
    const vendor = navigator.vendor || '';
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isMacSafari = /safari/.test(ua) && !/chrome|crios|android/.test(ua);
    const isEdge = /edg\//.test(ua);
    const isOutlook = /outlook|msoffice|trident/.test(ua);
    const isGoogleChrome = vendor === 'Google Inc.' || /chrome|crios/.test(ua);
    if (isOutlook || isEdge || isMacSafari || isIOS) return 'ics';
    if (isGoogleChrome) return 'google';
    return 'google';
  };
  const calendarProvider = React.useMemo(() => detectCalendarProvider(), []);
  const calendarButtonText = calendarProvider === 'google'
    ? (TranslationsDictionary[selectedLang]?.['calendar_google'] || 'Google')
    : (TranslationsDictionary[selectedLang]?.['calendar_other'] || 'Autres');

  const handleAddToCalendar = () => {
    if (calendarProvider === 'google') {
      const url = buildGoogleCalendarUrl(event);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      downloadICS(event);
    }
  };

  // Fonctions de partage
  const getShareUrl = useCallback(() => {
    const origin = window.location?.origin || '';
    return `${origin}/events?event=${encodeURIComponent(event.id)}`;
  }, [event.id]);

  const shareToTwitter = useCallback(() => {
    const text = encodeURIComponent(event.title || 'Event');
    const url = encodeURIComponent(getShareUrl());
    const intent = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  }, [event.title, getShareUrl]);

  const shareToLinkedIn = useCallback(() => {
    const url = encodeURIComponent(getShareUrl());
    const share = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(share, '_blank', 'noopener,noreferrer');
  }, [getShareUrl]);

  const copyLink = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch (_) {
      // Ignorer silencieusement si indisponible
    }
  }, [getShareUrl]);

  const openCalendarPopover = () => {
    const rect = calendarButtonRef.current?.getBoundingClientRect();
    if (rect) {
      // Position provisoire : bord gauche + bas du bouton
      setPopoverPos({ top: rect.bottom, left: rect.left });
    }
    setShowCalendarPopover(true);
  };

  const openSharePopover = () => {
    const rect = shareButtonRef.current?.getBoundingClientRect();
    if (rect) {
      // Position provisoire : bord gauche + bas du bouton
      setSharePopoverPos({ top: rect.bottom, left: rect.left });
    }
    setShowSharePopover(true);
  };

  useEffect(() => {
    if (!showCalendarPopover) return;
    const updatePosition = () => {
      const rect = calendarButtonRef.current?.getBoundingClientRect();
      const popRect = popoverRef.current?.getBoundingClientRect();
      const height = popRect?.height || popoverRef.current?.offsetHeight || 0;
      if (rect) {
        // Aligner le BAS de la popup sur le BAS du bouton pour le recouvrir
        setPopoverPos({ top: rect.bottom - height, left: rect.left });
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setShowCalendarPopover(false);
    };
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('keydown', handleKey);
    // Premier calcul puis recalcul après rendu pour obtenir la hauteur réelle
    updatePosition();
    const timer = setTimeout(updatePosition, 0);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timer);
    };
  }, [showCalendarPopover]);

  useEffect(() => {
    if (!showSharePopover) return;
    const updateSharePosition = () => {
      const rect = shareButtonRef.current?.getBoundingClientRect();
      const popRect = sharePopoverRef.current?.getBoundingClientRect();
      const height = popRect?.height || sharePopoverRef.current?.offsetHeight || 0;
      if (rect) {
        // Aligner le BAS de la popup de partage sur le BAS du bouton pour le recouvrir
        setSharePopoverPos({ top: rect.bottom - height, left: rect.left });
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setShowSharePopover(false);
    };
    window.addEventListener('resize', updateSharePosition);
    window.addEventListener('scroll', updateSharePosition, true);
    window.addEventListener('keydown', handleKey);
    updateSharePosition();
    const timer = setTimeout(updateSharePosition, 0);
    return () => {
      window.removeEventListener('resize', updateSharePosition);
      window.removeEventListener('scroll', updateSharePosition, true);
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timer);
    };
  }, [showSharePopover]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          {event.isExclusive && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 inline mr-1" />
              Exclusif
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {event.title}
          </h2>

          {/* Event Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-5 h-5 mr-3" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 mr-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 mr-3" />
              <span>
                {participantCount} {translations.participants}
                {event.maxParticipants && ` / ${event.maxParticipants}`}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {translations.description}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Registration Message */}
          {registrationMessage && (
            <div className={`mb-4 p-3 rounded-lg ${registrationMessageType === 'success'
              ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-purple-200 border border-blue-200 dark:border-purple-700'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
              }`}>
              {registrationMessage}
            </div>
          )}

          {showGuestForm && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {translations.guest_registration}
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={translations.guest_first_name}
                    value={guestInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder={translations.guest_last_name}
                    value={guestInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="email"
                  placeholder={translations.guest_email}
                  value={guestInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Turnstile
                  siteKey={siteKey}
                  onVerify={(t) => setToken(t)}
                  onError={handleTurnstileError}
                  onExpire={() => setToken(null)}
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleGuestRegister}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>{translations.register}</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowGuestForm(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                  >
                    {translations.cancel}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Registration Buttons */}
          {!showGuestForm && (
            <>
              {/* Turnstile Verification Section */}
              {(isLoggedIn() || isRegistered) && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Turnstile
                    siteKey={siteKey}
                    onVerify={(t) => setToken(t)}
                    onError={handleTurnstileError}
                    onExpire={() => setToken(null)}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {isRegistered ? (
                  <>
                    {/* Bouton + mini-popover calendrier */}
                  <div className="relative">
                    <button
                      ref={calendarButtonRef}
                      onClick={() => (showCalendarPopover ? setShowCalendarPopover(false) : openCalendarPopover())}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{TranslationsDictionary[selectedLang]?.['add_to_calendar'] || 'Ajouter au calendrier'}</span>
                    </button>
                    {showCalendarPopover && createPortal(
                      <div className="fixed inset-0 z-[1000]" onClick={() => setShowCalendarPopover(false)}>
                        <div
                          className="absolute"
                          style={{ top: popoverPos.top, left: popoverPos.left }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                            ref={popoverRef}
                            className="relative w-56 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                              {TranslationsDictionary[selectedLang]?.['add_to_calendar'] || 'Ajouter au calendrier'}
                            </div>
                            <div className="px-2 pb-2 space-y-1">
                              <button
                                onClick={() => {
                                  const url = buildGoogleCalendarUrl(event);
                                  window.open(url, '_blank', 'noopener,noreferrer');
                                  setShowCalendarPopover(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <GoogleIcon className="w-5 h-5" />
                                <span>{TranslationsDictionary[selectedLang]?.['calendar_google'] || 'Google'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  downloadICS(event);
                                  setShowCalendarPopover(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <Download className="w-5 h-5" />
                                <span>{TranslationsDictionary[selectedLang]?.['calendar_other'] || 'Autres'}</span>
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </div>,
                      document.body
                    )}
                  </div>
                  {/* Bouton de désinscription - visible uniquement si connecté */}
                  {isLoggedIn() && (
                    <button
                      onClick={handleUnregister}
                      disabled={isLoading}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          <span>{translations.unregister}</span>
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : event.maxParticipants && participantCount >= event.maxParticipants ? (
                <div className="flex-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                  <X className="w-5 h-5" />
                  <span>Impossible de s'inscrire - Complet</span>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={isLoading || !token}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>{translations.register}</span>
                    </>
                  )}
                </button>
              )}
              {/* Bouton Partager + popover — toujours visible */}
              <div className="relative">
                <button
                  ref={shareButtonRef}
                  onClick={() => (showSharePopover ? setShowSharePopover(false) : openSharePopover())}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{TranslationsDictionary[selectedLang]?.['share'] || 'Partager'}</span>
                </button>
                {showSharePopover && createPortal(
                  <div
                    className="fixed inset-0 z-[1000]"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setShowSharePopover(false); }}
                  >
                    <div className="absolute" style={{ top: sharePopoverPos.top, left: sharePopoverPos.left }}>
                      <motion.div
                        ref={sharePopoverRef}
                        initial={{ opacity: 0, scale: 0.96, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className="relative w-56 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        role="menu"
                      >
                        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                          {TranslationsDictionary[selectedLang]?.['share'] || 'Partager'}
                        </div>
                        <div className="px-2 pb-2 space-y-1">
                          <button
                            onClick={() => { shareToTwitter(); setShowSharePopover(false); }}
                            className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 text-blue-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            role="menuitem"
                          >
                            <Twitter className="w-5 h-5" />
                            <span>Twitter</span>
                          </button>
                          <button
                            onClick={() => { shareToLinkedIn(); setShowSharePopover(false); }}
                            className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 text-blue-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            role="menuitem"
                          >
                            <Linkedin className="w-5 h-5" />
                            <span>LinkedIn</span>
                          </button>
                          <button
                            onClick={async () => { await copyLink(); setShowSharePopover(false); }}
                            className="w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                            role="menuitem"
                          >
                            <Copy className="w-5 h-5" />
                            <span>{TranslationsDictionary[selectedLang]?.['copy_link'] || 'Copier le lien'}</span>
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>,
                  document.body
                )}
              </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
