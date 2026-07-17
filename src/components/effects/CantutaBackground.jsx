"use client";

/**
 * Detail-page background for SALUD: the cantuta, the sacred flower of Peru,
 * shown alive in its Andean habitat. A shrub grows from the lower right with
 * arching stems, leaves, and large hanging tubular blooms with five lobes and
 * an orange calyx, against a dusk sky and the silhouettes of Andean hills.
 *
 * The plant occupies the right side so the text column never crosses it. The
 * bilingual caption is a self-contained HTML overlay with its own scrim,
 * matching the caption format used across the site. Motion respects
 * prefers-reduced-motion.
 */

const CAPTIONS = {
  es: "LA CANTUTA: LA FLOR SAGRADA DE LOS INCAS",
  en: "THE CANTUTA: THE SACRED FLOWER OF THE INCAS",
};

function Bloom({ x, y, s = 1, delay = 0 }) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${s})`}
      className="cant-anim"
      style={{ transformOrigin: "top", animation: `cant-sway 8s ease-in-out infinite ${delay}s` }}
    >
      {/* tube with orange calyx */}
      <path d="M0,0 Q-6,26 -4,52 L-18,82 Q-10,93 0,90 Q10,93 18,82 L4,52 Q6,26 0,0 Z" fill="url(#cantTube3)" />
      {/* five magenta lobes */}
      <g fill="url(#cantPet3)">
        <path d="M0,76 Q-22,88 -19,106 Q-8,103 0,90 Z" />
        <path d="M0,76 Q22,88 19,106 Q8,103 0,90 Z" />
        <path d="M0,78 Q-11,96 0,110 Q11,96 0,78 Z" />
        <path d="M0,80 Q-17,94 -11,108 Z" />
        <path d="M0,80 Q17,94 11,108 Z" />
      </g>
      <circle cx="0" cy="86" r="3.5" fill="#fff4d0" />
    </g>
  );
}

export default function CantutaBackground({ className = "", isDark = false }) {
  const bg = isDark
    ? { from: "#3c2434", mid: "#452c3c", to: "#341e2e" }
    : { from: "#7a4a66", mid: "#8a5a72", to: "#6a3a56" };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 440"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="The cantuta, the sacred flower of Peru, growing in the Andes"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes cant-sway { 0%,100% { transform: rotate(-1.2deg); } 50% { transform: rotate(1.2deg); } }
          @media (prefers-reduced-motion: reduce) { .cant-anim { animation: none !important; } }
        `}</style>

        <defs>
          <linearGradient id="cantBg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={bg.from} />
            <stop offset="0.5" stopColor={bg.mid} />
            <stop offset="1" stopColor={bg.to} />
          </linearGradient>
          <linearGradient id="cantHill3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a5a4e" />
            <stop offset="1" stopColor="#3a4a3e" />
          </linearGradient>
          <linearGradient id="cantPet3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f294be" />
            <stop offset="0.6" stopColor="#e05a8e" />
            <stop offset="1" stopColor="#c8306e" />
          </linearGradient>
          <linearGradient id="cantTube3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0b070" />
            <stop offset="1" stopColor="#e07a4a" />
          </linearGradient>
        </defs>

        <rect width="800" height="440" fill="url(#cantBg3)" />

        {/* Andean hill silhouettes */}
        <path
          d="M0,190 L150,128 L320,184 L500,118 L680,178 L800,138 L800,440 L0,440 Z"
          fill="url(#cantHill3)"
          opacity="0.5"
        />
        {/* ground */}
        <path d="M0,356 Q400,336 800,360 L800,440 L0,440 Z" fill="#3a4a38" opacity="0.6" />

        {/* the cantuta shrub, growing from the lower right */}
        <g transform="translate(600,440)">
          {/* arching stems */}
          <g fill="none" stroke="#4a7a4e" strokeWidth="3" opacity="0.75">
            <path d="M0,0 Q-40,-120 -20,-230 Q-10,-280 -40,-320" />
            <path d="M0,0 Q20,-140 10,-250 Q5,-300 30,-330" />
            <path d="M0,0 Q60,-100 80,-210 Q90,-260 70,-300" />
            <path d="M0,0 Q-80,-90 -90,-190" />
          </g>
          {/* leaves */}
          <g fill="#4a7a4e" opacity="0.6" stroke="#5a8a5e" strokeWidth="1">
            <ellipse cx="-30" cy="-180" rx="16" ry="7" transform="rotate(-30 -30 -180)" />
            <ellipse cx="20" cy="-200" rx="16" ry="7" transform="rotate(20 20 -200)" />
            <ellipse cx="60" cy="-150" rx="16" ry="7" transform="rotate(-40 60 -150)" />
            <ellipse cx="-70" cy="-140" rx="14" ry="6" transform="rotate(30 -70 -140)" />
          </g>
          {/* hanging blooms at the stem tips */}
          <Bloom x={-40} y={-320} delay={0} />
          <Bloom x={30} y={-330} delay={1.1} />
          <Bloom x={70} y={-300} s={0.9} delay={0.5} />
          <Bloom x={-90} y={-190} s={0.85} delay={1.7} />
        </g>
      </svg>

      {/* bilingual caption: HTML overlay with its own scrim, site format */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div
          className="px-4 pb-2 pt-8 text-[10px] leading-[1.6] tracking-wider"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
        >
          <div className="font-medium text-white drop-shadow">{CAPTIONS.es}</div>
          <div style={{ color: "#f0c0d4" }} className="drop-shadow">{CAPTIONS.en}</div>
        </div>
      </div>
    </div>
  );
}
