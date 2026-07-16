"use client";

/**
 * Detail-page background for SALUD: the cantuta, the sacred flower of Peru and
 * the national flower, tubular blooms with five lobes and an orange calyx that
 * hang from arching branches. The flowers frame both sides of the viewBox so
 * the centered text column is never crossed. It reads as something living and
 * human, fitting a project about a language and the people who speak it.
 *
 * preserveAspectRatio is xMidYMid so the framing holds on any aspect ratio.
 * Motion respects prefers-reduced-motion.
 */

const CAPTIONS = {
  es: "LA CANTUTA: LA FLOR SAGRADA DE LOS INCAS",
  en: "THE CANTUTA: THE SACRED FLOWER OF THE INCAS",
};

function Cantuta({ x, y, delay = 0, small = false }) {
  const s = small ? 0.82 : 1;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} className="cant-anim" style={{ transformOrigin: "top", animation: `cant-sway 7.5s ease-in-out infinite ${delay}s` }}>
      <path d="M0,0 Q-4,20 -3,40 L-14,64 Q-8,72 0,70 Q8,72 14,64 L3,40 Q4,20 0,0 Z" fill="url(#cantTube)" />
      <g fill="url(#cantPet)">
        <path d="M0,58 Q-16,66 -14,80 Q-6,78 0,68 Z" />
        <path d="M0,58 Q16,66 14,80 Q6,78 0,68 Z" />
        <path d="M0,60 Q-8,74 0,84 Q8,74 0,60 Z" />
        <path d="M0,62 Q-12,72 -8,82 Z" />
        <path d="M0,62 Q12,72 8,82 Z" />
      </g>
      <circle cx="0" cy="66" r="2.5" fill="#fff4d0" />
    </g>
  );
}

export default function CantutaBackground({ className = "", isDark = false }) {
  const bg = isDark
    ? { from: "#2a0e1e", mid: "#3e162e", to: "#2e3348" }
    : { from: "#4a1630", mid: "#6a2246", to: "#48506a" };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 680 300"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="The cantuta, the sacred flower of Peru"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes cant-sway { 0%,100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }
          @media (prefers-reduced-motion: reduce) { .cant-anim { animation: none !important; } }
        `}</style>

        <defs>
          <linearGradient id="cantBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={bg.from} />
            <stop offset="0.55" stopColor={bg.mid} />
            <stop offset="1" stopColor={bg.to} />
          </linearGradient>
          <linearGradient id="cantPet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f294be" />
            <stop offset="0.6" stopColor="#e05a8e" />
            <stop offset="1" stopColor="#c8306e" />
          </linearGradient>
          <linearGradient id="cantTube" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0b070" />
            <stop offset="1" stopColor="#e07a4a" />
          </linearGradient>
        </defs>

        <rect width="680" height="300" fill="url(#cantBg)" />

        {/* LEFT branch with hanging cantutas */}
        <g>
          <path d="M-10,0 Q14,60 2,130 Q-8,180 12,240" fill="none" stroke="#5a8a5e" strokeWidth="2.5" opacity="0.55" />
          <g stroke="#6a9a6e" strokeWidth="1.4" fill="#4a7a4e" opacity="0.4">
            <path d="M6,70 q-22,-6 -32,6 q20,10 32,-6 Z" />
            <path d="M0,140 q24,-6 34,8 q-22,8 -34,-8 Z" />
          </g>
          <Cantuta x={-2} y={74} delay={0} />
          <Cantuta x={10} y={150} delay={1.2} small />
        </g>

        {/* RIGHT branch with hanging cantutas (mirror) */}
        <g transform="translate(680,0) scale(-1,1)">
          <path d="M-10,0 Q14,60 2,130 Q-8,180 12,240" fill="none" stroke="#5a8a5e" strokeWidth="2.5" opacity="0.55" />
          <g stroke="#6a9a6e" strokeWidth="1.4" fill="#4a7a4e" opacity="0.4">
            <path d="M6,70 q-22,-6 -32,6 q20,10 32,-6 Z" />
            <path d="M0,140 q24,-6 34,8 q-22,8 -34,-8 Z" />
          </g>
          <Cantuta x={-2} y={90} delay={0.6} />
          <Cantuta x={10} y={166} delay={1.8} small />
        </g>

        {/* caption scrim */}
        <rect x="0" y="266" width="680" height="34" fill="#280a1a" opacity="0.5" />
      </svg>

      {/* bilingual caption as HTML overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-[10px] tracking-wider">
        <div className="font-medium text-white drop-shadow">{CAPTIONS.es}</div>
        <div style={{ color: "#f0c0d4" }} className="drop-shadow">{CAPTIONS.en}</div>
      </div>
    </div>
  );
}
