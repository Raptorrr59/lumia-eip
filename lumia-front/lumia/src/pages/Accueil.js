import React, { useState, useEffect, Suspense } from 'react';
import RankingRow from '../components/ranking/RankingRow';
import { GamesData } from './Games';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import CarousselPresentation from '../components/CarousselPresentation';
import ReviewsCommunity from '../components/review/ReviewsCommunity';
import EmailVerificationPopup from '../components/modal/EmailVerificationPopup';
import TutorialPopup from '../components/tutorials/TutorialPopup';
import TutorialInteractif from '../components/tutorials/TutorialInteractif';
import LoginModal from '../components/modal/LoginModal';
import SignUpModal from '../components/modal/SignUpModal';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, Users, Trophy, Zap, Brain, Target } from 'lucide-react';
import { tutorialHomeFr } from '../utils/TutorialUtilsFR';
import { tutorialHomeEn } from '../utils/TutorialUtilsEN';

const statsData = [
  { icon: Users, value: "20+", label: "Étudiants actifs" },
  { icon: Trophy, value: "10+", label: "Défis complétés" },
  { icon: Brain, value: "30+", label: "Modules IA" },
  { icon: Target, value: "90%", label: "Taux de réussite" }
];

const Accueil = () => {
  const selectedLang = useLang();
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showEmailVerificationPopup, setShowEmailVerificationPopup] = useState(false);
  const [showTutorialPopup, setShowTutorialPopup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [pendingNavTutorial, setPendingNavTutorial] = useState(false);
  const [navTutorialTarget, setNavTutorialTarget] = useState(null);
  const [isNavTutorialActive, setIsNavTutorialActive] = useState(false);

  const handleLeaderboardClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/leaderboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const openLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const openSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await axios.get('/api/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          /*if (!response.data.valid) {
            localStorage.clear();
            window.location.reload();
          }*/
        } catch (error) {
          /*localStorage.clear();
          window.location.reload();*/
        }
      }
    };
    verifyToken();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const fetchSnake = axios.get('/api/ranking/snake', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchConnect4 = axios.get('/api/ranking/connect4', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchImage = axios.get('/api/ranking/image', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const [s, c, i] = await Promise.allSettled([fetchSnake, fetchConnect4, fetchImage]);

        const snake = s.status === 'fulfilled' && Array.isArray(s.value.data) ? s.value.data : [];
        const connect4 = c.status === 'fulfilled' && Array.isArray(c.value.data) ? c.value.data : [];
        const image = i.status === 'fulfilled' && Array.isArray(i.value.data) ? i.value.data : [];

        // Aggregate scores by user (keep best score per game, sum totals)
        const userScores = new Map();

        const processScores = (list, gameKey) => {
          list.forEach(p => {
            const name = (p.userName || '').trim();
            const sc = Number(p.score ?? 0) || 0;
            if (!userScores.has(name)) {
              userScores.set(name, { userName: name, snake: 0, connect4: 0, image: 0, score: 0 });
            }
            const row = userScores.get(name);
            row[gameKey] = Math.max(row[gameKey], sc);
            row.score = row.snake + row.connect4 + row.image;
          });
        };

        processScores(snake, 'snake');
        processScores(connect4, 'connect4');
        processScores(image, 'image');

        const aggregated = Array.from(userScores.values())
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        setLeaderboardData(aggregated);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const checkEmailVerification = () => {
      const userId = localStorage.getItem('id');
      const emailVerified = JSON.parse(localStorage.getItem("emailVerified"));

      if (userId && emailVerified === 'false') {
        setTimeout(() => {
          setShowEmailVerificationPopup(true);
        }, 3000);
      }
    };

    checkEmailVerification();
  }, []);

  useEffect(() => {
    const checkTutorialAsk = () => {
      const tutoAsk = localStorage.getItem('tutoAsk');
      if (tutoAsk === 'true') {
        setShowTutorialPopup(true);
      }
    };

    checkTutorialAsk();
  }, []);

  useEffect(() => {
    if (pendingNavTutorial && !showTutorialPopup) {
      const target = document.querySelector("[data-tutorial-target='nav-courses']");
      if (target) {
        setNavTutorialTarget(target);
        setIsNavTutorialActive(true);
        setPendingNavTutorial(false);
      }
    }
  }, [pendingNavTutorial, showTutorialPopup]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='dark:bg-[#010116]'>
      {/* Hero Section corrigée */}
      <motion.section
        className='relative w-full min-h-screen flex items-center justify-center'
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Background image fixe et optimisée */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('https://i.imgur.com/k1YX1VY.jpeg')",
            backgroundAttachment: 'fixed'
          }}
        />

        {/* Overlay gradient amélioré */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#010116]/90 via-[#010116]/85 to-[#5328EA]/30' />

        {/* Contenu principal */}
        <div className='relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 sm:px-8 md:px-12 text-center py-20'>
          <motion.div
            variants={slideUp}
            className="mb-8"
          >
            <motion.h1
              className='text-white font-Gotham font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6'
              variants={slideUp}
            >
              {TranslationsDictionary[selectedLang]?.["become"]}
              <span className='text-[#9579FA] block sm:inline'>
                {" "}{TranslationsDictionary[selectedLang]?.["creators"]}{" "}
              </span>
              {TranslationsDictionary[selectedLang]?.["tomorrow_ai"]},
              <br className="hidden sm:block" />
              <span className='text-[#9579FA]'>
                {TranslationsDictionary[selectedLang]?.["by_playing"]}{" "}
              </span>
              {TranslationsDictionary[selectedLang]?.["today"]}.
            </motion.h1>
          </motion.div>

          <motion.p
            className='text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mb-10 leading-relaxed px-4'
            variants={slideUp}
          >
            {TranslationsDictionary[selectedLang]?.["discover_accueil"]}
            {TranslationsDictionary[selectedLang]?.["discover_accueil2"]}
          </motion.p>

          {/* Boutons corrigés et simplifiés */}
          <motion.div
            variants={slideUp}
            className="flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-md"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to='/games'
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5328EA] hover:bg-[#7855E6] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                <Zap className="w-5 h-5" />
                {TranslationsDictionary[selectedLang]?.["play"]}
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to='/courses'
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#9579FA] text-[#9579FA] hover:bg-[#9579FA] hover:text-white font-bold rounded-xl transition-all duration-300'
              >
                <Brain className="w-5 h-5" />
                {TranslationsDictionary[selectedLang]?.["discover_courses"]}
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-[#9579FA]" />
          </motion.div>
        </div>
      </motion.section>

      {/* Section Statistiques */}
      <motion.section
        className="py-16 bg-gradient-to-r from-[#010116] to-[#1a1a2e]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#5328EA] to-[#9579FA] rounded-full mb-4 group-hover:shadow-lg group-hover:shadow-[#5328EA]/30 transition-all duration-300">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">{TranslationsDictionary[selectedLang]?.[stat.label]}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Section Intro Cours/Jeux */}
      <motion.section
        className='py-16 px-4 lg:px-20 xl:px-32'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 mb-16'>
            {/* Carte Cours */}
            <motion.div
              className='group relative bg-gradient-to-br from-[#030318] to-[#1a1a2e] rounded-2xl overflow-hidden p-6 md:p-8'
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#5328EA] to-[#9579FA] rounded-full flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className='text-white font-bold text-xl md:text-2xl mb-4'>
                {TranslationsDictionary[selectedLang]?.["our_courses"]}
              </h3>

              <p className='text-gray-300 mb-6 leading-relaxed text-sm md:text-base'>
                {TranslationsDictionary[selectedLang]?.["master_concept_ai"]}
              </p>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to='/courses'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-[#5328EA] text-white font-semibold rounded-xl hover:bg-[#7855E6] transition-colors duration-300'
                >
                  {TranslationsDictionary[selectedLang]?.["start"]}
                  <span>→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Carte Jeux */}
            <motion.div
              className='group relative bg-gradient-to-br from-[#030318] to-[#1a1a2e] rounded-2xl overflow-hidden p-6 md:p-8'
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#9579FA] to-[#5328EA] rounded-full flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className='text-white font-bold text-xl md:text-2xl mb-4'>
                {TranslationsDictionary[selectedLang]?.["interact_games"]}
              </h3>

              <p className='text-gray-300 mb-6 leading-relaxed text-sm md:text-base'>
                {TranslationsDictionary[selectedLang]?.["learn_fun"]}
              </p>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to='/games'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-[#5328EA] text-white font-semibold rounded-xl hover:bg-[#7855E6] transition-colors duration-300'
                >
                  {TranslationsDictionary[selectedLang]?.["play_now"]}
                  <span>→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Section Vidéo */}
          <motion.div
            className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='relative rounded-2xl overflow-hidden shadow-2xl'
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                width="100%"
                height="250px"
                src="https://www.youtube.com/embed/gPVVsw2OWdM"
                title="YouTube video player"
                className="rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            <div className='space-y-6'>
              <motion.h2
                className='text-[#5328EA] dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-tight'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {TranslationsDictionary[selectedLang]?.["learn_ai"]}
              </motion.h2>

              <motion.p
                className='text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {TranslationsDictionary[selectedLang]?.["description_video_accueil"]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to='/courses'
                    className='inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#5328EA] hover:bg-[#7855E6] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg'
                  >
                    {TranslationsDictionary[selectedLang]?.["our_courses"]}
                    <Brain className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section Jeux avec carousel */}
          <motion.div
            className='mt-16'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className='text-[#5328EA] dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-12'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {TranslationsDictionary[selectedLang]?.["discover_games"]}
            </motion.h2>

            <Suspense fallback={
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-[#5328EA] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <CarousselPresentation data={GamesData} />
            </Suspense>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Classement */}
      <motion.section
        className='py-16 bg-gradient-to-br from-[#010116] via-[#1a1a2e] to-[#010116]'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Texte et bouton */}
            <motion.div
              className='text-center md:text-left space-y-6'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-white font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight'>
                {TranslationsDictionary[selectedLang]?.["create_powerful_ai"]}
              </h2>

              <p className='text-gray-300 text-lg md:text-xl'>
                {TranslationsDictionary[selectedLang]?.["follow_ranking"]}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to='/leaderboard'
                    className='inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-[#9579FA] text-[#9579FA] hover:bg-[#9579FA] hover:text-white font-semibold rounded-xl transition-all duration-300'
                  >
                    <Users className="w-5 h-5" />
                    {TranslationsDictionary[selectedLang]?.["see_ranking"]}
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Classement */}
            <motion.div
              className='relative'
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#5328EA]/10 to-[#9579FA]/10 rounded-2xl backdrop-blur-sm p-6 border border-white/10">
                <RankingRow rankingData={leaderboardData} />
                <button
                  onClick={handleLeaderboardClick}
                  className="mt-4 block w-full text-center text-[#9579FA] hover:text-white text-sm font-medium transition-colors duration-300 hover:underline cursor-pointer"
                >
                  {TranslationsDictionary[selectedLang]?.["want_to_see_global_leaderboard"] || "Want to see the global leaderboard?"} →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section Avis */}
      <motion.section
        className='py-16 px-4 lg:px-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-[#5328EA] dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl mb-4'>
              {TranslationsDictionary[selectedLang]?.["community_ratings"]}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              {TranslationsDictionary[selectedLang]?.["discover_community"]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ReviewsCommunity moduleId={1000} courseId={1000} isMainPage={true} />
          </motion.div>
        </div>
      </motion.section>
      <EmailVerificationPopup
        isOpen={showEmailVerificationPopup}
        onClose={() => setShowEmailVerificationPopup(false)}
      />
      <TutorialPopup
        isOpen={showTutorialPopup}
        onClose={() => {
          setShowTutorialPopup(false);
          localStorage.setItem('tutorialHomeSeen', 'true');
          localStorage.setItem('tutoAsk', 'false');
        }}
        tutorialPages={selectedLang === 'EN' ? tutorialHomeEn : tutorialHomeFr}
        initial={true}
        onComplete={() => {
          setPendingNavTutorial(true);
        }}
      />
      {isNavTutorialActive && navTutorialTarget && (
        <TutorialInteractif
          target={navTutorialTarget}
          text={selectedLang === 'EN' ? "Click here to open the Courses page" : "Clique ici pour ouvrir la page des cours"}
          onClose={() => {
            setIsNavTutorialActive(false);
            setNavTutorialTarget(null);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignUpClick={openSignUp}
          redirectTo="/leaderboard"
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          onClose={() => setShowSignUpModal(false)}
          onLoginClick={openLogin}
          redirectTo="/leaderboard"
        />
      )}
    </div>
  );
};

export default Accueil;
