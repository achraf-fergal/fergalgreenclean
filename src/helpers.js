/**
 * utils/helpers.js
 * ─────────────────────────────────────────────────────────────────────────
 * Generic helpers extracted verbatim from PremiumPortfolioShowcase.jsx.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useState } from "react";

export function darken(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - Math.round(255 * amount));
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (n & 0xff) - Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}
