import { useEffect, useRef } from "react";

const Turnstile = ({ siteKey, onVerify, onError, onExpire }) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onVerify, onError, onExpire });

  useEffect(() => {
    callbacksRef.current = { onVerify, onError, onExpire };
  }, [onVerify, onError, onExpire]);

  useEffect(() => {
    if (window.turnstile && containerRef.current && !widgetIdRef.current) {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => callbacksRef.current.onVerify(token),
        "error-callback": () => callbacksRef.current.onError?.(),
        "expired-callback": () => callbacksRef.current.onExpire?.(),
      });
    }

    return () => {
      if (widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef}></div>;
};

export default Turnstile;