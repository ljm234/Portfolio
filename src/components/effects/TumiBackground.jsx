"use client";

/**
 * Detail-page background for YACHAY: the tumi, the ceremonial gold knife of the
 * Sican (Lambayeque) culture from Peru's north coast, Jordan's home region. The
 * figure is the god Naylamp with his fan headdress, ear ornaments, and inlaid
 * turquoise, above the crescent blade. It reads as precision and ancestry: the
 * north coast worked gold with mathematical exactness centuries ago.
 *
 * The tumi sits on the right half of the viewBox so the text column on the left
 * is never crossed. preserveAspectRatio is xMidYMid so the piece stays centered
 * vertically on any aspect ratio. Motion respects prefers-reduced-motion.
 */

const CAPTIONS = {
  es: "EL TUMI: EL ORO CEREMONIAL DE LAMBAYEQUE",
  en: "THE TUMI: THE CEREMONIAL GOLD OF LAMBAYEQUE",
};

export default function TumiBackground({ className = "", isDark = false }) {
  const bg = isDark
    ? { from: "#3a2a0e", mid: "#4e3a14", to: "#5e4a1e" }
    : { from: "#6e4e16", mid: "#8e6a24", to: "#b0903c" };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 680 300"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="The tumi, a ceremonial gold knife from Lambayeque, Peru"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes tumi-shine { 0%,100% { opacity: 0.9; } 50% { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) { .tumi-anim { animation: none !important; } }
        `}</style>

        <defs>
          <linearGradient id="tumiBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={bg.from} />
            <stop offset="0.55" stopColor={bg.mid} />
            <stop offset="1" stopColor={bg.to} />
          </linearGradient>
          <linearGradient id="tumiGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8e4a0" />
            <stop offset="0.5" stopColor="#e8c460" />
            <stop offset="1" stopColor="#c89a34" />
          </linearGradient>
          <linearGradient id="tumiGoldD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d8b050" />
            <stop offset="1" stopColor="#a87e28" />
          </linearGradient>
        </defs>

        <rect width="680" height="300" fill="url(#tumiBg)" />

        {/* faint sand striations of the north coast desert */}
        <g stroke="#c8a862" opacity="0.14" strokeWidth="1">
          <path d="M0,70 L680,50" />
          <path d="M0,150 L680,170" />
          <path d="M0,230 L680,212" />
        </g>

        {/* the tumi, right half, vertical, centered */}
        <g transform="translate(548,150)" className="tumi-anim" style={{ animation: "tumi-shine 6s ease-in-out infinite" }}>
          {/* crescent blade (bottom) */}
          <path d="M-58,50 A60,46 0 0 0 58,50 L48,66 A50,36 0 0 1 -48,66 Z" fill="url(#tumiGoldD)" stroke="#7a5a1a" strokeWidth="1" />
          <path d="M-50,54 A52,38 0 0 0 50,54" fill="none" stroke="#8a6a24" strokeWidth="0.8" opacity="0.6" />
          {/* handle */}
          <rect x="-10" y="-8" width="20" height="58" fill="url(#tumiGoldD)" stroke="#7a5a1a" strokeWidth="0.8" />
          {/* body / tunic (trapezoid) */}
          <path d="M-34,-16 L34,-16 L22,-8 L-22,-8 Z" fill="url(#tumiGold)" stroke="#7a5a1a" strokeWidth="0.8" />
          {/* head (semicircle) */}
          <path d="M-46,-16 A46,46 0 0 1 46,-16 Z" fill="url(#tumiGold)" stroke="#7a5a1a" strokeWidth="1" />
          {/* fan headdress (stepped rays) */}
          <g fill="url(#tumiGold)" stroke="#7a5a1a" strokeWidth="0.7">
            <path d="M-46,-18 l-14,-16 l7,-2 l11,14 Z" />
            <path d="M-28,-44 l-7,-20 l7,0 l4,18 Z" />
            <path d="M-9,-58 l-2,-22 l7,0 l0,22 Z" />
            <path d="M15,-54 l7,-20 l6,2 l-7,18 Z" />
            <path d="M35,-38 l16,-14 l3,6 l-14,12 Z" />
          </g>
          {/* ear ornaments with turquoise */}
          <circle cx="-44" cy="-8" r="8" fill="url(#tumiGold)" stroke="#7a5a1a" strokeWidth="0.8" />
          <circle cx="44" cy="-8" r="8" fill="url(#tumiGold)" stroke="#7a5a1a" strokeWidth="0.8" />
          <circle cx="-44" cy="-8" r="3.4" fill="#4a9a94" />
          <circle cx="44" cy="-8" r="3.4" fill="#4a9a94" />
          {/* winged eyes (Sican style) and nose */}
          <path d="M-24,-26 q9,-7 18,0 q-9,4 -18,0 Z" fill="#7a5a1a" />
          <path d="M6,-26 q9,-7 18,0 q-9,4 -18,0 Z" fill="#7a5a1a" />
          <path d="M-4,-22 l0,11 l7,0" fill="none" stroke="#7a5a1a" strokeWidth="1" />
          {/* inlaid turquoise on the chest */}
          <circle cx="0" cy="-11" r="3.4" fill="#4a9a94" />
        </g>
      </svg>

      {/* bilingual caption: HTML overlay with its own scrim, independent of SVG scaling */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div
          className="px-4 pb-2 pt-8 text-[10px] leading-[1.6] tracking-wider"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
        >
          <div className="font-medium text-white drop-shadow">{CAPTIONS.es}</div>
          <div style={{ color: "#f4e0a0" }} className="drop-shadow">{CAPTIONS.en}</div>
        </div>
      </div>
    </div>
  );
}
