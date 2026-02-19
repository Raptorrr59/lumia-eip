import React, { useLayoutEffect, useState } from 'react';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const TutorialInteractif = ({ target, text, onClose }) => {
    const selectedLang = useLang();
    const [rect, setRect] = useState(null);
    const pad = 10;
    const tooltipWidth = 280;

    useLayoutEffect(() => {
        if (!target) return;

        const update = () => {
            const r = target.getBoundingClientRect();
            setRect(r);
        };

        // Initial position
        update();

        let rafId = null;
        const onScrollOrResize = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                update();
            });
        };

        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);

        // Observe size changes on the target element
        let ro = null;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(onScrollOrResize);
            ro.observe(target);
        }

        return () => {
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
            if (ro) ro.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [target]);

    if (!target || !rect) return null;

    // Off-screen detection
    const isOffscreen =
        rect.bottom < 0 ||
        rect.top > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth;

    const side = rect.left + rect.width / 2 < window.innerWidth / 2 ? 'right' : 'left';

    const highlightStyle = {
        position: 'fixed',
        left: rect.left - pad,
        top: rect.top - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
        borderRadius: 12,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
        zIndex: 10000,
        pointerEvents: 'none'
    };

    const tooltipStyle = {
        position: 'fixed',
        top: Math.max(16, rect.top),
        left: side === 'right'
            ? Math.min(window.innerWidth - tooltipWidth - 16, rect.right + 16)
            : Math.max(16, rect.left - tooltipWidth - 16),
        width: tooltipWidth,
        zIndex: 10001
    };

    // Center arrow that points toward target when it is off-screen
    const centerArrowStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10002,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        pointerEvents: 'auto'
    };

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;
    const dx = targetCenterX - viewportCenterX;
    const dy = targetCenterY - viewportCenterY;
    const arrowRotationDeg = ((Math.atan2(dy, dx) * 180) / Math.PI) + 90;

    return (
        <>
            {isOffscreen ? (
                <>
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000 }} />
                    <div style={centerArrowStyle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-white drop-shadow-lg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ transform: `rotate(${arrowRotationDeg}deg)` }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4l-7 7m7-7l7 7m-7-7v16" />
                        </svg>
                        <span className="text-white text-sm">{TranslationsDictionary[selectedLang]?.["tutorial_follow_arrow"]}</span>
                        <button
                            onClick={onClose}
                            className="ml-3 text-white/80 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div style={highlightStyle} />
                    <div style={tooltipStyle} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between">
                            <p className="text-sm">{text}</p>
                            <button
                                onClick={onClose}
                                className="ml-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{TranslationsDictionary[selectedLang]?.["tutorial_click_highlighted"]}</p>
                    </div>
                </>
            )}
        </>
    );
};

export default TutorialInteractif;