"use client";

/**
 * Detail-page background for YACHAY: the tumi of Lambayeque, the ceremonial
 * gold knife of the Sican culture from Peru's north coast, Jordan's home
 * region. The figure is the Sican Lord with his crescent filigree headdress,
 * comma-shaped eyes, hanging bell ear ornaments, inlaid turquoise, arms
 * crossed over the abdomen, and the semicircular blade below.
 *
 * Rendered as a gold silhouette with relief under a soft spotlight, on the
 * right half of the viewBox so the text column never crosses it. The
 * bilingual caption is a self-contained HTML overlay with its own scrim,
 * matching the caption format used across the site. Motion respects
 * prefers-reduced-motion.
 */

const CAPTIONS = {
  es: "EL TUMI: EL ORO CEREMONIAL DE LAMBAYEQUE",
  en: "THE TUMI: THE CEREMONIAL GOLD OF LAMBAYEQUE",
};

export default function TumiBackground({ className = "", isDark = false }) {
  const bg = isDark
    ? { from: "#382809", mid: "#4c380f", to: "#402e0b" }
    : { from: "#5a4011", mid: "#7a5a1b", to: "#664a16" };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 440"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="The tumi, the ceremonial gold knife of Lambayeque, Peru"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes tumi-glow { 0%,100% { opacity: 0.85; } 50% { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) { .tumi-anim { animation: none !important; } }
        `}</style>

        <defs>
          <linearGradient id="tumiBg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={bg.from} />
            <stop offset="0.5" stopColor={bg.mid} />
            <stop offset="1" stopColor={bg.to} />
          </linearGradient>
          <radialGradient id="tumiSpot3" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#f8e8b0" stopOpacity="0.4" />
            <stop offset="1" stopColor="#f8e8b0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tumiG3" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#fbeaa8" />
            <stop offset="0.45" stopColor="#e6c05a" />
            <stop offset="1" stopColor="#b88e30" />
          </linearGradient>
          <linearGradient id="tumiGm3" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#e8c874" />
            <stop offset="1" stopColor="#9c7626" />
          </linearGradient>
        </defs>

        <rect width="800" height="440" fill="url(#tumiBg3)" />

        {/* faint desert striations of the north coast */}
        <g stroke="#c8a862" opacity="0.1" strokeWidth="1">
          <path d="M0,90 L800,70" />
          <path d="M0,220 L800,240" />
          <path d="M0,360 L800,342" />
        </g>

        {/* soft spotlight behind the piece */}
        <ellipse
          cx="610"
          cy="210"
          rx="180"
          ry="210"
          fill="url(#tumiSpot3)"
          className="tumi-anim"
          style={{ animation: "tumi-glow 8s ease-in-out infinite" }}
        />

        {/* the Sican Lord tumi, right half, vertical */}
        <g transform="translate(610,208) scale(1.32)">
          {/* semicircular blade */}
          <path d="M-48,150 A50,42 0 0 0 48,150 L41,170 A44,32 0 0 1 -41,170 Z" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="1" />
          <path d="M-40,154 A42,32 0 0 0 40,154" fill="none" stroke="#7e5e1a" strokeWidth="0.7" opacity="0.6" />
          {/* shaft with a light edge for relief */}
          <rect x="-13" y="72" width="26" height="80" rx="2" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="0.8" />
          <rect x="-13" y="72" width="7" height="80" fill="#fbeaa8" opacity="0.3" />
          {/* crescent headdress */}
          <path d="M-92,-66 A92,80 0 0 1 92,-66 Z" fill="url(#tumiG3)" stroke="#6e5015" strokeWidth="1.4" />
          <path d="M-84,-66 A84,72 0 0 1 84,-66" fill="none" stroke="#8a6620" strokeWidth="1" opacity="0.55" />
          {/* filigree spirals along the crescent */}
          <g fill="none" stroke="#8a6620" strokeWidth="1.1" opacity="0.5">
            <path d="M-64,-80 a5,5 0 1 1 -0.1,0 M-64,-80 q-7,-3 -7,4" />
            <path d="M-38,-92 a5,5 0 1 1 -0.1,0 M-38,-92 q-7,-3 -7,4" />
            <path d="M-12,-99 a5,5 0 1 1 -0.1,0" />
            <path d="M14,-99 a5,5 0 1 1 -0.1,0" />
            <path d="M40,-92 a5,5 0 1 1 -0.1,0 M40,-92 q7,-3 7,4" />
            <path d="M66,-80 a5,5 0 1 1 -0.1,0 M66,-80 q7,-3 7,4" />
          </g>
          {/* turquoise row on the headdress cap */}
          <g fill="#3f9c93">
            <circle cx="-30" cy="-68" r="4" />
            <circle cx="-15" cy="-70" r="4" />
            <circle cx="0" cy="-71" r="4" />
            <circle cx="15" cy="-70" r="4" />
            <circle cx="30" cy="-68" r="4" />
          </g>
          {/* face */}
          <path d="M-40,-64 L40,-64 L40,-6 Q0,7 -40,-6 Z" fill="url(#tumiG3)" stroke="#6e5015" strokeWidth="1.2" />
          {/* hanging bell ear ornaments with turquoise */}
          <path d="M-62,-46 L-46,-46 L-49,-22 Q-54,-16 -59,-22 Z" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="0.8" />
          <path d="M62,-46 L46,-46 L49,-22 Q54,-16 59,-22 Z" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="0.8" />
          <circle cx="-54" cy="-38" r="4.5" fill="#3f9c93" />
          <circle cx="54" cy="-38" r="4.5" fill="#3f9c93" />
          <path d="M-54,-20 l-2,8 m4,-8 l2,8 M54,-20 l-2,8 m4,-8 l2,8" stroke="#6e5015" strokeWidth="1" />
          {/* comma-shaped eyes, the defining solemn Sican trait */}
          <path d="M-24,-46 q14,-2 17,6 q-3,7 -11,5 q-8,-2 -6,-11 Z" fill="#5e440f" />
          <path d="M24,-46 q-14,-2 -17,6 q3,7 11,5 q8,-2 6,-11 Z" fill="#5e440f" />
          {/* straight prominent nose */}
          <path d="M-4,-42 L-7,-20 Q0,-16 7,-20 L4,-42 Z" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="0.8" />
          {/* solemn straight mouth */}
          <path d="M-13,-12 L13,-12" stroke="#5e440f" strokeWidth="2" strokeLinecap="round" />
          {/* body */}
          <path d="M-34,-6 L34,-6 L30,52 L-30,52 Z" fill="url(#tumiG3)" stroke="#6e5015" strokeWidth="1" />
          <path d="M-30,-6 L-26,52 M30,-6 L26,52" stroke="#8a6620" strokeWidth="0.6" opacity="0.4" />
          {/* arms crossed over the abdomen, elbows out */}
          <path d="M-34,8 Q-42,20 -34,30 L-8,24 Q0,22 8,24 L34,30 Q42,20 34,8 L28,14 Q0,22 -28,14 Z" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="0.8" />
          {/* hands meeting at the center */}
          <g fill="url(#tumiG3)" stroke="#6e5015" strokeWidth="0.6">
            <rect x="-11" y="20" width="10" height="13" rx="1.5" />
            <rect x="1" y="20" width="10" height="13" rx="1.5" />
          </g>
          {/* splayed feet */}
          <path d="M-30,52 L-6,52 L-12,66 L-30,64 Z M30,52 L6,52 L12,66 L30,64 Z" fill="url(#tumiGm3)" stroke="#6e5015" strokeWidth="0.6" />
        </g>
      </svg>

      {/* bilingual caption: HTML overlay with its own scrim, site format */}
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
