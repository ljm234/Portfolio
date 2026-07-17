"use client";

/**
 * Detail-page background for SALUD: the cantuta, the sacred flower of Peru,
 * shown alive in its Andean habitat. A compact shrub grows from the lower
 * right with arching stems, leaves, and large hanging tubular blooms with five
 * lobes and an orange calyx, against a dusk sky and the silhouettes of Andean
 * hills.
 *
 * The blooms sit in the middle-right band of the viewBox, the region that the
 * xMidYMid slice never crops on wide viewports. Each bloom splits its
 * transforms across two nested groups: the outer group carries the static SVG
 * translate/scale that positions it, and the inner group carries only the CSS
 * sway rotation. CSS transforms override an element's own transform attribute,
 * so keeping them on separate elements lets them compose instead of the sway
 * wiping out the position. The bilingual caption is a self-contained HTML
 * overlay with its own scrim, matching the caption format used across the
 * site. Motion respects prefers-reduced-motion.
 */

const CAPTIONS = {
  es: "LA CANTUTA: LA FLOR SAGRADA DE LOS INCAS",
  en: "THE CANTUTA: THE SACRED FLOWER OF THE INCAS",
};

function Bloom({ x, y, s = 1, delay = 0 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <g
        className="cant-anim"
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 0%",
          animation: `cant-sway 8s ease-in-out infinite ${delay}s`,
        }}
      >
        {/* tube with orange calyx */}
        <path d="M0,0 Q-7,30 -5,60 L-20,94 Q-11,106 0,102 Q11,106 20,94 L5,60 Q7,30 0,0 Z" fill="url(#cantTube5)" />
        {/* five magenta lobes */}
        <g fill="url(#cantPet5)">
          <path d="M0,88 Q-26,102 -22,122 Q-9,118 0,104 Z" />
          <path d="M0,88 Q26,102 22,122 Q9,118 0,104 Z" />
          <path d="M0,90 Q-13,110 0,126 Q13,110 0,90 Z" />
          <path d="M0,92 Q-20,108 -13,124 Z" />
          <path d="M0,92 Q20,108 13,124 Z" />
        </g>
        <circle cx="0" cy="99" r="4" fill="#fff4d0" />
      </g>
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
          <linearGradient id="cantBg5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={bg.from} />
            <stop offset="0.5" stopColor={bg.mid} />
            <stop offset="1" stopColor={bg.to} />
          </linearGradient>
          <linearGradient id="cantHill5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a5a4e" />
            <stop offset="1" stopColor="#3a4a3e" />
          </linearGradient>
          <linearGradient id="cantPet5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f294be" />
            <stop offset="0.6" stopColor="#e05a8e" />
            <stop offset="1" stopColor="#c8306e" />
          </linearGradient>
          <linearGradient id="cantTube5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0b070" />
            <stop offset="1" stopColor="#e07a4a" />
          </linearGradient>
        </defs>

        <rect width="800" height="440" fill="url(#cantBg5)" />

        {/* Andean hill silhouettes */}
        <path
          d="M0,190 L150,128 L320,184 L500,118 L680,178 L800,138 L800,440 L0,440 Z"
          fill="url(#cantHill5)"
          opacity="0.5"
        />
        {/* ground */}
        <path d="M0,356 Q400,336 800,360 L800,440 L0,440 Z" fill="#3a4a38" opacity="0.6" />

        {/* the cantuta shrub, compact, growing from the lower right; blooms
            kept in the middle-right band so the slice never crops them */}
        <g transform="translate(650,440)">
          {/* shorter arching stems */}
          <g fill="none" stroke="#4a7a4e" strokeWidth="4" opacity="0.8">
            <path d="M0,0 Q-50,-90 -80,-180" />
            <path d="M0,0 Q-10,-100 -30,-200" />
            <path d="M0,0 Q40,-90 30,-190" />
            <path d="M0,0 Q90,-70 120,-150" />
          </g>
          {/* leaves */}
          <g fill="#4a7a4e" opacity="0.65" stroke="#5a8a5e" strokeWidth="1">
            <ellipse cx="-55" cy="-110" rx="18" ry="8" transform="rotate(-35 -55 -110)" />
            <ellipse cx="-15" cy="-130" rx="18" ry="8" transform="rotate(15 -15 -130)" />
            <ellipse cx="25" cy="-115" rx="18" ry="8" transform="rotate(-25 25 -115)" />
            <ellipse cx="75" cy="-95" rx="16" ry="7" transform="rotate(-45 75 -95)" />
          </g>
          {/* large hanging blooms at the stem tips */}
          <Bloom x={-80} y={-180} delay={0} />
          <Bloom x={-30} y={-200} delay={1.1} />
          <Bloom x={30} y={-190} s={0.92} delay={0.5} />
          <Bloom x={120} y={-150} s={0.88} delay={1.7} />
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
