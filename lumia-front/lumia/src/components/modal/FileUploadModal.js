import React, { useState, useEffect } from "react";
import axios from "axios";
import TranslationsDictionary from "../../Translations";
import { useLang } from "../../LangProvider";
import { motion } from "framer-motion";
import { GameEnum } from "../games/GameEnum";

function FileUploadModal({onClose, game, isLoading, setIsLoading, setIsUploaded}) {
    const selectedLang = useLang();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            console.log(TranslationsDictionary[selectedLang]?.["selected_file"] + " :", selectedFile.name);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setFileName(droppedFile.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert(TranslationsDictionary[selectedLang]?.["select_your_ai_file"]);
            return;
        }

        setIsUploading(true);
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("game", GameEnum[game.id].name);
        formData.append("isTraining", false);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            alert(TranslationsDictionary[selectedLang]?.["file_sent"]);
            localStorage.setItem("lumiaCoin", Number(localStorage.getItem("lumiaCoin")) - Number(20));
            console.log(TranslationsDictionary[selectedLang]?.["server_response"] + " :", response.data);
            onClose();
            setIsUploaded(true);
        } catch (error) {
            console.error(TranslationsDictionary[selectedLang]?.["upload_error"] + " :", error);

            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert(TranslationsDictionary[selectedLang]?.["unknown_error"]);
            }
        } finally {
            setIsUploading(false);
        }
    };

    const isLoggedInAndVerified = localStorage.getItem("id") !== null && JSON.parse(localStorage.getItem("emailVerified"));

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Backdrop amélioré */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md"
                onClick={onClose}
            />
            
            {/* Modal container avec design moderne */}
            <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 w-full max-w-md z-50 relative overflow-hidden"
            >
                {/* Header avec gradient */}
                <div className="bg-gradient-to-r from-[#5328EA] to-[#7C3AED] p-6 text-white relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">
                                {TranslationsDictionary[selectedLang]?.["send_your_file"] || "Envoyez votre fichier"}
                            </h1>
                            <p className="text-white/80 text-sm mt-1">{TranslationsDictionary[selectedLang]?.["slide_file"] || "Glissez-déposez votre fichier ici"}</p>
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Zone de drop améliorée */}
                        <div 
                            className={`relative group w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                                isDragging 
                                    ? 'border-[#5328EA] bg-gradient-to-br from-[#5328EA]/10 to-[#7C3AED]/10 scale-[1.02]' 
                                    : file 
                                        ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20' 
                                        : 'border-gray-300 hover:border-[#5328EA] hover:bg-gradient-to-br hover:from-[#5328EA]/5 hover:to-[#7C3AED]/5 dark:border-gray-600 dark:hover:border-[#5328EA]'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-upload').click()}
                        >
                            {/* Effet de brillance */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                            
                            {file ? (
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-xs">{fileName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{TranslationsDictionary[selectedLang]?.["slide_file"] || "Envoyez votre fichier"}</p>
                                </motion.div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {TranslationsDictionary[selectedLang]?.["drag_drop_or_click"] || "Glissez-déposez ou cliquez"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        Formats: .py
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        
                        {/* Boutons d'action */}
                        {isLoggedInAndVerified ? (
                            <motion.button 
                                type="submit" 
                                disabled={isUploading || !file}
                                whileHover={{ scale: file && !isUploading ? 1.02 : 1 }}
                                whileTap={{ scale: file && !isUploading ? 0.98 : 1 }}
                                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                                    isUploading 
                                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-wait shadow-inner' 
                                        : !file 
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' 
                                            : 'bg-gradient-to-r from-[#5328EA] to-[#7C3AED] hover:from-[#4320c0] hover:to-[#6B21A8] text-white shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isUploading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>{TranslationsDictionary[selectedLang]?.["uploading"] || "Téléchargement..."}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span>{TranslationsDictionary[selectedLang]?.["upload"] || "Télécharger"}</span>
                                    </div>
                                )}
                            </motion.button>
                        ) : (
                            <div
                                className="text-center space-y-3"
                            >
                                <button
                                    type="button"
                                    className="w-full py-4 px-6 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 font-semibold"
                                    disabled
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>{TranslationsDictionary[selectedLang]?.["upload"] || "Télécharger"}</span>
                                    </div>
                                </button>
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <span>{TranslationsDictionary[selectedLang]?.["please_login_to_upload"] || "Veuillez vous connecter pour télécharger"}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default FileUploadModal;