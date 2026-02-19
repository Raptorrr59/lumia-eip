import React, { useState, useEffect } from "react";
import TranslationsDictionary from '../Translations';
import SubscriptionBox from "../components/SubscriptionBox";
import { useLang } from "../LangProvider";
 import { motion, AnimatePresence } from "framer-motion";
 import axios from 'axios';
 import TutorialPopup from '../components/tutorials/TutorialPopup';
 import TutorialInteractif from '../components/tutorials/TutorialInteractif';
 import { tutorialShopFr } from '../utils/TutorialUtilsFR';
 import { tutorialShopEn } from '../utils/TutorialUtilsEN';

const plansData = [
  {
    title: "Starter",
    priceEUR: "5",
    priceUSD: "6",
    credits: "50",
    bonus: "5",
  },
  {
    title: "Basic",
    priceEUR: "10",
    priceUSD: "12",
    credits: "100",
    bonus: "20",
    recommended: true,
  },
  {
    title: "Advanced",
    priceEUR: "20",
    priceUSD: "24",
    credits: "250",
    bonus: "50",
  },
  {
    title: "Pro",
    priceEUR: "35",
    priceUSD: "42",
    credits: "500",
    bonus: "100",
  },
  {
    title: "Expert",
    priceEUR: "50",
    priceUSD: "60",
    credits: "800",
    bonus: "200",
  },  
  {
    title: "Master",
    priceEUR: "75",
    priceUSD: "90",
    credits: "1300",
    bonus: "300",
  },
  {
    title: "Ultimate",
    priceEUR: "100",
    priceUSD: "120",
    credits: "2000",
    bonus: "500",
  },
  {
    title: "Legend",
    priceEUR: "150",
    priceUSD: "180",
    credits: "3500",
    bonus: "1000",
  },
];

function Subscription() {
    const selectedLang = useLang();
    const [currency, setCurrency] = useState("EUR");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showTutorialPopup, setShowTutorialPopup] = useState(false);
     const [pendingNavTutorial, setPendingNavTutorial] = useState(false);
     const [navTutorialTarget, setNavTutorialTarget] = useState(null);
     const [isNavTutorialActive, setIsNavTutorialActive] = useState(false);

     useEffect(() => {
       const tutoAsk = localStorage.getItem('tutoShop');
       if (tutoAsk === 'true') {
         setShowTutorialPopup(true);
       }
     }, []);

     useEffect(() => {
       if (pendingNavTutorial && !showTutorialPopup) {
         const target = document.querySelector("[data-tutorial-target='nav-home']");
         if (target) {
           setNavTutorialTarget(target);
           setIsNavTutorialActive(true);
           setPendingNavTutorial(false);
         }
       }
     }, [pendingNavTutorial, showTutorialPopup]);

    const handlePlanClick = async (plan) => { // Made function async
      setSelectedPlan(plan);
      setShowPopup(true);
      const currentLumiaCoin = Number(localStorage.getItem("lumiaCoin") || 0);
      const newLumiaCoin = currentLumiaCoin + Number(plan.credits) + Number(plan.bonus);
      localStorage.setItem("lumiaCoin", newLumiaCoin.toString());

      // Added Axios PATCH request
      const userId = localStorage.getItem('id');
      const accessToken = localStorage.getItem('accessToken');

      if (userId && accessToken) {
        try {
          await axios.patch('/api/update-lumia-coin', null, {
            params : { 
              userId: userId,
              lumiaCoin: Number(plan.credits) + Number(plan.bonus) // Send the amount to add, not the total after addition
            },
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log('LumiaCoin updated successfully on the backend.');
        } catch (error) {
          console.error('Error updating LumiaCoin on the backend:', error);
        }
      }
      
      console.log(localStorage.getItem("lumiaCoin"));
    };

    const closePopup = () => {
      setShowPopup(false);
    };
    
    // Get currency symbol based on selected currency
    const getCurrencySymbol = () => currency === "EUR" ? "€" : "$";

    return (
        <div className="min-h-screen dark:bg-[#010116] pb-20">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full bg-gradient-to-r from-[#5328EA] to-[#9579FA] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden"
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                    <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-white opacity-5 rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-Gotham font-bold text-white mb-6">
                      {TranslationsDictionary[selectedLang]?.["our_offers"]}
                    </h1>
                    <p className="text-xl text-white max-w-3xl mx-auto opacity-90">
                      {TranslationsDictionary[selectedLang]?.["buy_credits"]}
                    </p>
                    
                    {/* Currency toggle */}
                    <div className="mt-8 inline-flex items-center bg-white bg-opacity-20 p-1 rounded-full">
                        <button 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === "EUR" ? 'bg-white text-[#5328EA]' : 'text-white'}`}
                            onClick={() => setCurrency("EUR")}
                        >
                            EUR (€)
                        </button>
                        <button 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === "USD" ? 'bg-white text-[#5328EA]' : 'text-white'}`}
                            onClick={() => setCurrency("USD")}
                        >
                            USD ($)
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-20">
                {/* Subscription cards */}
                <div className="relative">
                  {/* Plans grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plansData.map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <SubscriptionBox
                          title={plan.title}
                          price={currency === "EUR" ? plan.priceEUR : plan.priceUSD}
                          currency={getCurrencySymbol()}
                          credits={plan.credits}
                          recommended={plan.recommended}
                          bonus={plan.bonus}
                          onClick={() => handlePlanClick(plan)}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Confirmation popup */}
                  <AnimatePresence>
                    {showPopup && selectedPlan && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={closePopup}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="bg-white dark:bg-[#1A1A2E] p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl border border-[#5328EA]/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-[#5328EA]/10 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5328EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
                            {TranslationsDictionary[selectedLang]?.["purchased_credits"] || "Achat confirmé!"}
                          </h3>
                          
                          <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
                            {TranslationsDictionary[selectedLang]?.["credits_added"] || 
                            `${TranslationsDictionary[selectedLang]?.["you_add"]} `}
                            <span className="font-bold text-[#5328EA]">{Number(selectedPlan.credits) + (Number(selectedPlan.bonus) || 0)}</span>
                            {` ${TranslationsDictionary[selectedLang]?.["credits_acc"]}`}
                          </p>
                          
                          <div className="flex justify-center">
                            <button
                              onClick={closePopup}
                              className="bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                            >
                              OK
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Credits explanation */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#1A1A2E] rounded-xl shadow-xl p-8 mt-16 max-w-3xl mx-auto border border-gray-100 dark:border-gray-800"
                >
                    <h3 className="text-2xl font-bold text-[#5328EA] mb-4">{TranslationsDictionary[selectedLang]?.["credits_how"]}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {TranslationsDictionary[selectedLang]?.["credits_can"]}
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5328EA]/10 flex items-center justify-center mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5328EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-3 text-gray-700 dark:text-gray-300">{TranslationsDictionary[selectedLang]?.["credits_upload"]}</span>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5328EA]/10 flex items-center justify-center mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5328EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-3 text-gray-700 dark:text-gray-300">{TranslationsDictionary[selectedLang]?.["credits_access"]}</span>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5328EA]/10 flex items-center justify-center mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5328EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-3 text-gray-700 dark:text-gray-300">{TranslationsDictionary[selectedLang]?.["credits_buy"]}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Payment logos */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center mt-16 gap-4 pt-4 pb-10"
                >
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                        {TranslationsDictionary[selectedLang]?.["credits_secure"]}
                    </p>
                    <div className="flex space-x-8">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                    </div>
                </motion.div>
            </div>
            <TutorialPopup
              isOpen={showTutorialPopup}
              onClose={() => {
                setShowTutorialPopup(false);
                localStorage.setItem('tutoShop', 'false');
              }}
              tutorialPages={selectedLang === 'EN' ? tutorialShopEn : tutorialShopFr}
              initial={false}
              onComplete={() => {
                setPendingNavTutorial(true);
              }}
            />
            {isNavTutorialActive && navTutorialTarget && (
              <TutorialInteractif
                target={navTutorialTarget}
                text={selectedLang === 'EN' ? "Click here to return to Home" : "Clique ici pour retourner à l'accueil"}
                onClose={() => {
                  setIsNavTutorialActive(false);
                  setNavTutorialTarget(null);
                }}
              />
            )}
        </div>
    );
};

export default Subscription;
