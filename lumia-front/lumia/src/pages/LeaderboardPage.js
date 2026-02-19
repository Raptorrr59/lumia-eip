import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { GameEnum } from '../components/games/GameEnum';
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';
import TutorialPopup from '../components/tutorials/TutorialPopup';
import TutorialInteractif from '../components/tutorials/TutorialInteractif';
import { tutorialLeaderboardFr } from '../utils/TutorialUtilsFR';
import { tutorialLeaderboardEn } from '../utils/TutorialUtilsEN';

function LeaderboardPage() {
  const selectedLang = useLang();

  const [snakeLeaderboardData, setSnakeLeaderboardData] = useState([]);
  const [connect4LeaderboardData, setConnect4LeaderboardData] = useState([]);
  const [imageLeaderboardData, setImageLeaderboardData] = useState([]);
  const [globalLeaderboardData, setGlobalLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableRows, setTableRows] = useState([]);
  const [showTutorialPopup, setShowTutorialPopup] = useState(false);
  const [pendingNavTutorial, setPendingNavTutorial] = useState(false);
  const [navTutorialTarget, setNavTutorialTarget] = useState(null);
  const [isNavTutorialActive, setIsNavTutorialActive] = useState(false);

  // Utilitaire commun pour construire les lignes du tableau
  const buildRows = (snakeList, connect4List, imageList) => {
    const m = new Map();
    const add = (list, key) => {
      list.forEach(p => {
        const name = (p.userName || '').trim();
        const sc = Number(p.score ?? 0) || 0;
        const row = m.get(name) || { userName: name, snake: 0, connect4: 0, image: 0, total: 0 };
        row[key] = Math.max(row[key], sc);
        row.total = row.snake + row.connect4 + row.image;
        m.set(name, row);
      });
    };
    add(snakeList, 'snake');
    add(connect4List, 'connect4');
    add(imageList, 'image');
    return Array.from(m.values()).sort((a, b) => b.total - a.total);
  };
  const gameLabels = selectedLang === 'FR'
    ? { snake: 'Snake', connect4: 'Puissance 4', image: "Reconnaissance d'image" }
    : { snake: 'Snake', connect4: 'Connect Four', image: 'Image Recognition' };

  useEffect(() => {
    const tutoAsk = localStorage.getItem('tutoLeaderboard');
    if (tutoAsk === 'true') {
      setShowTutorialPopup(true);
    }
  }, [selectedLang]);

  useEffect(() => {
    if (pendingNavTutorial && !showTutorialPopup) {
      const target = document.querySelector("[data-tutorial-target='nav-events']");
      if (target) {
        setNavTutorialTarget(target);
        setIsNavTutorialActive(true);
        setPendingNavTutorial(false);
      }
    }
  }, [pendingNavTutorial, showTutorialPopup]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setErrorMsg(TranslationsDictionary[selectedLang]?.["login_required_to_view_leaderboard"] || "Veuillez vous connecter pour voir les classements.");
      setLoading(false);
      return;
    }

    const fetchSnake = axios.get(`/api/ranking/${GameEnum[0].name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const fetchConnect4 = axios.get(`/api/ranking/${GameEnum[1].name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const fetchImage = axios.get(`/api/ranking/${GameEnum[2].name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    Promise.allSettled([fetchSnake, fetchConnect4, fetchImage])
      .then(([s, c, i]) => {
        const snake = s.status === 'fulfilled' && Array.isArray(s.value.data) ? s.value.data : [];
        const connect4 = c.status === 'fulfilled' && Array.isArray(c.value.data) ? c.value.data : [];
        const image = i.status === 'fulfilled' && Array.isArray(i.value.data) ? i.value.data : [];

        setSnakeLeaderboardData(snake);
        setConnect4LeaderboardData(connect4);
        setImageLeaderboardData(image);

        setTableRows(buildRows(snake, connect4, image));

        const totals = new Map();
        [snake, connect4, image].forEach(list => {
          list.forEach(p => {
            const id = p.userName || p.username || p.user || (TranslationsDictionary[selectedLang]?.["unknown_user"] || "Unknown");
            const sc = Number(p.score ?? p.points ?? p.globalScore ?? 0) || 0;
            totals.set(id, (totals.get(id) || 0) + sc);
          });
        });

        const aggregated = Array.from(totals.entries())
          .map(([userName, score]) => ({ userName, score }))
          .sort((a, b) => b.score - a.score);

        setGlobalLeaderboardData(aggregated);
      })
      .catch(() => {
        setErrorMsg(TranslationsDictionary[selectedLang]?.["error_loading_leaderboard"] || "Erreur lors du chargement des classements.");
      })
      .finally(() => {
        setLoading(false);
        setShowLeaderboard(true);
      });
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#010116] text-gray-900 dark:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white dark:bg-[#1a1a2e] shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#5328EA] to-[#7855E6] py-6 px-8">
            <h1 className="text-3xl font-Gotham font-bold text-white">
              {TranslationsDictionary[selectedLang]?.["leaderboard_title"] || "Classements"}
            </h1>
            <p className="text-white/80 mt-2">
              {TranslationsDictionary[selectedLang]?.["leaderboard_subtitle"] || "Classement global et par jeu"}
            </p>
          </div>

          <div className="p-8 space-y-10">
            {loading && (
              <p className="text-center">{TranslationsDictionary[selectedLang]?.["loading"] || "Chargement..."}</p>
            )}

            {errorMsg && (
              <p className="text-center text-red-500">{errorMsg}</p>
            )}

            {!loading && !errorMsg && (
              <>
                {/* Barre de recherche */}
                <div className="flex items-center justify-between mb-6">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={TranslationsDictionary[selectedLang]?.["search_user_by_pseudo"] || "Rechercher un utilisateur par pseudo"}
                    className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#10101c] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7855E6]"
                  />
                </div>

                {/* Tableau des classements */}
                <section>
                  <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
                    {TranslationsDictionary[selectedLang]?.["global_leaderboard"] || "Classement global (meilleur des 3)"}
                  </h2>

                  {(() => {
                    const rows = tableRows.filter(r =>
                      (r.userName || '').toLowerCase().includes((searchTerm || '').toLowerCase())
                    );

                    if (rows.length === 0) {
                      return (
                        <p className="text-center text-gray-600 dark:text-gray-300">
                          {TranslationsDictionary[selectedLang]?.["no_results"] || "Aucun résultat"}
                        </p>
                      );
                    }

                    return (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-[#0f0f18] rounded-lg overflow-hidden">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-[#22223a] text-gray-700 dark:text-gray-200">
                              <th className="px-4 py-3 text-left">
                                {TranslationsDictionary[selectedLang]?.["username"] || "Pseudo"}
                              </th>
                              <th className="px-4 py-3 text-left">{gameLabels.snake}</th>
                              <th className="px-4 py-3 text-left">{gameLabels.connect4}</th>
                              <th className="px-4 py-3 text-left">{gameLabels.image}</th>
                              <th className="px-4 py-3 text-left">
                                {TranslationsDictionary[selectedLang]?.["total"] || "Total"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, idx) => (
                              <tr key={`${row.userName}-${idx}`} className="border-b border-gray-200 dark:border-[#23233b] hover:bg-gray-50 dark:hover:bg-[#1c1c2f]">
                                <td className="px-4 py-2">{row.userName || (TranslationsDictionary[selectedLang]?.["unknown_user"] || 'Unknown')}</td>
                                <td className="px-4 py-2">{row.snake}</td>
                                <td className="px-4 py-2">{row.connect4}</td>
                                <td className="px-4 py-2">{row.image}</td>
                                <td className="px-4 py-2 font-semibold text-[#5328EA] dark:text-[#9579FA]">{row.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </section>
              </>
            )}
          </div>
        </div>
      </motion.div>
      <TutorialPopup
        isOpen={showTutorialPopup}
        onClose={() => {
          setShowTutorialPopup(false);
          localStorage.setItem('tutoLeaderboard', 'false');
        }}
        tutorialPages={selectedLang === 'EN' ? tutorialLeaderboardEn : tutorialLeaderboardFr}
        initial={false}
        onComplete={() => {
          setPendingNavTutorial(true);
        }}
      />
      {isNavTutorialActive && navTutorialTarget && (
        <TutorialInteractif
          target={navTutorialTarget}
          text={selectedLang === 'EN' ? "Click here to open the Events page" : "Clique ici pour ouvrir la page des événements"}
          onClose={() => {
            setIsNavTutorialActive(false);
            setNavTutorialTarget(null);
          }}
        />
      )}
    </div>
  );
}

export default LeaderboardPage;
