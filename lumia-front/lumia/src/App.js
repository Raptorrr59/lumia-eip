import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactGA from 'react-ga4';
import { getUserBadges } from './components/badge/BadgeService';

import {LangProvider} from './LangProvider';
import { WebSocketProvider, useWebSocket } from './contexts/WebSocketContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Ajouter l'import
import Accueil from './pages/Accueil';
import Games from './pages/Games';
import AllGamesPage from './pages/AllGamesPage';
import Game from './pages/Game';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Contact from './pages/Contact';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './components/CourseDetails';
import { CGU, CGV, MentionsLegales, Confidentialite } from "./pages/LegalPages";
import FormationPage from './pages/FormationPage';
import Admin from './pages/Admin';
import FAQ from './pages/FAQ';
import Events from './pages/Events';
import { NotFoundPage } from './pages/NotFoundPage';
import Messages from './components/messages/Messages';
import FriendsButton from './components/messages/FriendsButton';
import LeaderboardPage from './pages/LeaderboardPage';
import MessageBubbleButton from './components/messages/MessageBubbleButton';

// Composant pour défiler vers le haut à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Initialize Google Analytics
const TRACKING_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
}

// Inner app that uses router hooks (must be inside <Router>)
const AppContent = ({ setUserId, userDataLoaded }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);

  // Get unread count from WebSocket context (real-time updates)
  const { unreadCount } = useWebSocket();

  // Close modal when navigating to a different page
  useEffect(() => {
      setIsMessagesModalOpen(false);
  }, [location.pathname]);

  // derive visibility from latest localStorage + location so it updates on navigation
  const showFriendsButton = (() => {
    const idNow = localStorage.getItem("id") || null;
    if (!idNow) return false;
    return true;
  })();

  // keep userId in sync when location changes (login/navigation may update localStorage)
  useEffect(() => {
    const currentUserId = localStorage.getItem("id");
    setUserId(currentUserId);
    
    // Send pageview to GA
    if (TRACKING_ID) {
      // Link GA session to your User ID if logged in
      if (currentUserId) {
        ReactGA.set({ userId: currentUserId });
      }
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location, setUserId]);

  return (
    <div className="App min-h-screen transition-colors duration-200 dark:bg-bg-dark dark:text-white">
      <Header key={userDataLoaded} />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/games" element={<Games />} />
          <Route path="/all-games" element={<AllGamesPage />} />
          <Route path="/game/:gameId" element={<Game />} />
          <Route path="/courses" element={
            <ProtectedRoute requireVerification={true}>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="/courses/:courseId" element={
            <ProtectedRoute requireVerification={true}>
              <CourseDetails />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={
            <ProtectedRoute requireVerification={true}>
              <Subscription />
            </ProtectedRoute>
          }/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/cgu" element={<CGU />}/>
          <Route path="/cgv" element={<CGV />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/formation/:id" element={
            <ProtectedRoute requireVerification={true}>
              <FormationPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/events" element={<Events />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/leaderboard" element={
            <ProtectedRoute requireVerification={true}>
              <LeaderboardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Render Friends button and modal */}
      {showFriendsButton && (
        <>
          <FriendsButton 
            onClick={() => setIsMessagesModalOpen(true)}
            unreadCount={unreadCount}
            isOpen={isMessagesModalOpen}
          />
          <Messages 
            isOpen={isMessagesModalOpen}
            onClose={() => setIsMessagesModalOpen(false)}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

function App() {
  const [userDataLoaded, setUserDataLoaded] = useState(true); // Nouvel état
  const [userId, setUserId] = useState(localStorage.getItem("id"));
 
  useEffect(() => {
    const fetchUserData = async () => {
      setUserId(localStorage.getItem("id"));
      const accessToken = localStorage.getItem("accessToken");

      if (userId && accessToken) {
        try {
          // Existing user data fetch
          const responseUser = await axios.get(`/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
          localStorage.setItem("emailVerified", responseUser.data.emailVerified);
          localStorage.setItem("userName", responseUser.data.userName);
          localStorage.setItem("email", responseUser.data.email);
          localStorage.setItem("lumiaCoin", responseUser.data.lumiaCoin);
          localStorage.setItem("roles", JSON.stringify(responseUser.data.roles || []));
          localStorage.setItem("xp", responseUser.data.xp || 0);
          localStorage.setItem("level", responseUser.data.level || 1);
          localStorage.setItem("newsletter", responseUser.data.subscribed);
          console.log(localStorage.getItem("newsletter"));
          if (!localStorage.getItem("tuto")) {
            localStorage.setItem("tuto", false);
          }
          
          const completedModulesResponse = await axios.get(`/api/user/${userId}/completed-modules`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          localStorage.setItem("completedModules", JSON.stringify(completedModulesResponse.data));
          
          const userProgressResponse = await axios.get(`/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          localStorage.setItem("userProgress", JSON.stringify(userProgressResponse.data));
          
          try {
            const userBadges = await getUserBadges(userId);
            localStorage.setItem("userBadges", JSON.stringify(userBadges));
            console.log("User badges loaded:", userBadges);
          } catch (badgeError) {
            console.error("Error fetching user badges:", badgeError);
            localStorage.setItem("userBadges", JSON.stringify([]));
          }
          
          setUserDataLoaded(prev => !prev);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        localStorage.removeItem("userBadges");
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (!e || !e.key) {
        // fallback: update userId from localStorage
        setUserId(localStorage.getItem("id"));
        return;
      }
      if (e.key === "id" || e.key === "accessToken") {
        setUserId(localStorage.getItem("id"));
      }
    };

    // update immediately (in case localStorage was modified elsewhere before mount)
    setUserId(localStorage.getItem("id"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <LangProvider>
      <WebSocketProvider>
        <Router>
          <AppContent setUserId={setUserId} userDataLoaded={userDataLoaded} />
        </Router>
      </WebSocketProvider>
    </LangProvider>
  );
}

export default App;
