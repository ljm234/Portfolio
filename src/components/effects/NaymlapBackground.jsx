// /src/components/effects/NaymlapBackground.jsx
"use client";

/**
 * Full page background for the About page: Naymlap and his fleet arrive
 * from the sea to found Lambayeque. The composition keeps Naymlap's balsa
 * large at the lower right with the fleet fanning out behind him toward
 * the sun, rendered with atmospheric perspective (farther boats are
 * smaller, paler and less detailed).
 *
 * Two palettes cover both themes: light shows the golden dawn over a blue
 * Pacific; dark shows the same fleet under a silver moon. The bilingual
 * caption is an HTML overlay outside the sliced svg so it never clips at
 * tall aspect ratios. Motion respects prefers-reduced-motion.
 */

const CAPTIONS = {
  light: {
    es: "NAYMLAP Y SU FLOTA LLEGAN DEL MAR A FUNDAR LAMBAYEQUE",
    en: "NAYMLAP AND HIS FLEET ARRIVE FROM THE SEA TO FOUND LAMBAYEQUE",
    esColor: "#e8f0f4",
    enColor: "#b8d0dc",
  },
  dark: {
    es: "NAYMLAP Y SU FLOTA LLEGAN DEL MAR A FUNDAR LAMBAYEQUE",
    en: "NAYMLAP AND HIS FLEET ARRIVE FROM THE SEA TO FOUND LAMBAYEQUE",
    esColor: "#a8b8c8",
    enColor: "#78889a",
  },
};

function GhostBoat({ x, y, scale = 1, delay = "0s", sail = true, tone }) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${scale})`}
      style={{ animation: `nl-bob-far 5.5s ease-in-out infinite ${delay}` }}
      opacity="0.5"
    >
      <path
        d="M0,6 Q2,3 7,2 L17,1 Q22,0 25,-3 Q25,3 19,5 L5,7 Z"
        fill={tone}
      />
      {sail && <path d="M10,1 L10,-6 L15,-4 Z" fill={tone} opacity="0.8" />}
    </g>
  );
}

function MediumBalsa({ x, y, delay, hull, sailFill, crew }) {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ animation: `nl-bob-mid 8.6s ease-in-out infinite ${delay}` }}
      opacity="0.84"
    >
      <path
        d="M-30,5 Q-26,-1 -15,-3 L13,-5 Q26,-6 33,-16 Q34,-8 28,-2 Q19,5 7,5 L-21,6 Q-27,6 -30,5 Z"
        fill={hull}
      />
      <path d="M-25,3 L29,-12" stroke={hull} strokeWidth="1" opacity="0.55" />
      <path d="M-4,-4 L-4,-18 M-4,-18 L8,-12" stroke={hull} strokeWidth="1.3" fill="none" />
      <path d="M-4,-18 L8,-12 L-4,-8 Z" fill={sailFill} opacity="0.92" />
      <path d="M13,-4 Q12,-10 14,-14 Q16,-10 15,-4 Z" fill={crew} />
      <circle cx="14" cy="-16" r="2.4" fill={crew} />
    </g>
  );
}

export default function NaymlapBackground({ className = "", isDark = false }) {
  const mode = isDark ? "dark" : "light";
  const caption = CAPTIONS[mode];

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 680 450"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Naymlap and his fleet arriving from the sea"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes nl-wave-a { 0% { transform: translateX(0); } 100% { transform: translateX(-72px); } }
          @keyframes nl-wave-b { 0% { transform: translateX(0); } 100% { transform: translateX(-56px); } }
          @keyframes nl-bob-main { 0%,100% { transform: translate(0,0) rotate(-1.5deg); } 50% { transform: translate(11px,-4px) rotate(1.5deg); } }
          @keyframes nl-bob-mid { 0%,100% { transform: translate(0,0) rotate(1deg); } 50% { transform: translate(8px,-3px) rotate(-1.2deg); } }
          @keyframes nl-bob-far { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
          @keyframes nl-vbirds { 0% { transform: translate(-60px,10px); } 100% { transform: translate(760px,-26px); } }
          @keyframes nl-pelican { 0% { transform: translate(740px,0); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translate(-80px,-8px); opacity: 0; } }
          @keyframes nl-flap { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.72); } }
          @keyframes nl-glow { 0%,100% { opacity: 0.82; } 50% { opacity: 1; } }
          @keyframes nl-glitter { 0%,100% { opacity: 0.35; } 50% { opacity: 0.8; } }
          @keyframes nl-twinkle { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .nl-anim, .nl-anim * { animation: none !important; }
            .nl-hide-reduced { display: none; }
          }
        `}</style>

        <defs>
          <linearGradient id="nlSkyDawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#aed4e8" />
            <stop offset="0.55" stopColor="#f5d9b0" />
            <stop offset="1" stopColor="#f2b98a" />
          </linearGradient>
          <linearGradient id="nlSeaDawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a90b4" />
            <stop offset="1" stopColor="#2e6288" />
          </linearGradient>
          <radialGradient id="nlSunGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff6da" />
            <stop offset="0.55" stopColor="#ffdf9e" />
            <stop offset="1" stopColor="#ffdf9e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nlSkyNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#131b2e" />
            <stop offset="1" stopColor="#26364e" />
          </linearGradient>
          <linearGradient id="nlSeaNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#16283c" />
            <stop offset="1" stopColor="#0e1c2c" />
          </linearGradient>
          <radialGradient id="nlMoonGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e8eef4" />
            <stop offset="0.55" stopColor="#c2d2e0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#c2d2e0" stopOpacity="0" />
          </radialGradient>
          <clipPath id="nlFrame">
            <rect x="0" y="0" width="680" height="450" />
          </clipPath>
        </defs>

        <g clipPath="url(#nlFrame)" className="nl-anim">
          {mode === "light" ? (
            <g>
              <rect width="680" height="270" fill="url(#nlSkyDawn)" />
              <rect y="270" width="680" height="180" fill="url(#nlSeaDawn)" />
              <circle cx="150" cy="228" r="120" fill="url(#nlSunGlow)" style={{ animation: "nl-glow 7s ease-in-out infinite" }} />
              <circle cx="150" cy="228" r="30" fill="#fff6da" />
              <g style={{ animation: "nl-glitter 5s ease-in-out infinite" }}>
                <path
                  d="M142,282 L158,282 M138,296 L162,296 M142,310 L158,310 M136,326 L164,326 M140,344 L160,344 M134,364 L166,364"
                  stroke="#ffe9b0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>
              <path d="M600,254 L634,236 L666,254 Z M556,258 L582,244 L606,258 Z" fill="#7a92a0" opacity="0.72" />
              <g style={{ animation: "nl-vbirds 44s linear infinite" }}>
                <path d="M0,76 Q-6,71 -11,75 M0,76 Q6,71 11,75" stroke="#5a6a74" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                <path d="M26,66 Q21,62 17,65 M26,66 Q31,62 35,65" stroke="#5a6a74" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M52,78 Q47,74 43,77 M52,78 Q57,74 61,77" stroke="#5a6a74" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M24,88 Q19,84 15,87 M24,88 Q29,84 33,87" stroke="#5a6a74" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </g>
              <g className="nl-hide-reduced" style={{ animation: "nl-pelican 36s linear infinite" }}>
                <g style={{ transformOrigin: "center", animation: "nl-flap 1.8s ease-in-out infinite" }}>
                  <path d="M0,262 Q-14,254 -28,258 M0,262 Q14,254 28,258" stroke="#6b4e30" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
                <path d="M-2,262 Q6,260 16,264 L22,267 Q14,268 6,266 Z" fill="#6b4e30" />
                <circle cx="14" cy="263" r="2.2" fill="#e8dcc8" />
              </g>

              <GhostBoat x={236} y={282} delay="0s" tone="#84a0b4" />
              <GhostBoat x={326} y={287} delay="1.8s" tone="#7a94a8" sail={false} />
              <GhostBoat x={158} y={285} scale={0.9} delay="3.2s" tone="#84a0b4" />

              <MediumBalsa x={235} y={318} delay="1s" hull="#8a6038" sailFill="#ead8b8" crew="#5c4430" />
              <MediumBalsa x={405} y={330} delay="2.6s" hull="#84582f" sailFill="#ead8b8" crew="#5c4430" />

              <g transform="translate(498,398)" style={{ animation: "nl-bob-main 8s ease-in-out infinite" }}>
                <path
                  d="M-56,10 Q-48,-2 -26,-4 L30,-9 Q54,-11 68,-28 Q70,-13 59,-3 Q44,9 18,10 L-38,12 Q-52,12 -56,10 Z"
                  fill="#7a5230"
                />
                <path d="M-50,7 L62,-23" stroke="#5a3a1e" strokeWidth="1.3" opacity="0.7" />
                <path d="M-43,9 L52,-15" stroke="#5a3a1e" strokeWidth="1.2" opacity="0.6" />
                <path d="M-17,-6 L-17,-37 M-17,-37 Q0,-46 16,-37" stroke="#5a3a1e" strokeWidth="1.7" fill="none" />
                <path d="M-17,-37 Q0,-46 16,-37 L16,-22 Q0,-28 -17,-24 Z" fill="#f0e6d0" opacity="0.95" />
                <path d="M-17,-29 Q0,-35 16,-28" stroke="#c96f4a" strokeWidth="2.2" fill="none" opacity="0.8" />
                <g transform="translate(5,-10)">
                  <path d="M0,0 Q-4.4,-12 0,-23 Q4.4,-12 0,0 Z" fill="#a83a2e" />
                  <path d="M-6.5,-5 Q0,-11 6.5,-5 L6.5,-15 Q0,-19 -6.5,-15 Z" fill="#3aa8a0" />
                  <circle cx="0" cy="-27" r="5" fill="#6b4424" />
                  <path d="M-10,-29 Q-5,-35 -1,-30 M1,-30 Q5,-35 10,-29" fill="none" stroke="#e8b83a" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M-8,-36 L0,-42 L8,-36" fill="none" stroke="#e8b83a" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="0" cy="-39" r="1.6" fill="#3aa8a0" />
                </g>
                <path d="M-33,-5 Q-35,-14 -33,-20 Q-30,-14 -31,-5 Z" fill="#8a5c2e" />
                <circle cx="-32" cy="-23" r="3.7" fill="#8a5c2e" />
                <circle cx="38" cy="-16" r="2.4" fill="#a83a2e" />
                <circle cx="47" cy="-19" r="2" fill="#3aa8a0" />
              </g>

              <g style={{ animation: "nl-wave-a 11s linear infinite" }}>
                <path
                  d="M-72,294 Q-54,285 -36,294 T0,294 T36,294 T72,294 T108,294 T144,294 T180,294 T216,294 T252,294 T288,294 T324,294 T360,294 T396,294 T432,294 T468,294 T504,294 T540,294 T576,294 T612,294 T648,294 T684,294 T720,294 T756,294"
                  fill="none"
                  stroke="#8ec4dc"
                  strokeWidth="1.8"
                  opacity="0.68"
                />
                <path
                  d="M-40,294 Q-40,286 -32,286 Q-27,286 -27,291 M168,294 Q168,286 176,286 Q181,286 181,291 M376,294 Q376,286 384,286 Q389,286 389,291 M584,294 Q584,286 592,286 Q597,286 597,291"
                  fill="none"
                  stroke="#f0f6f8"
                  strokeWidth="1.3"
                  opacity="0.75"
                />
              </g>
              <g style={{ animation: "nl-wave-b 15s linear infinite reverse" }}>
                <path
                  d="M-56,350 Q-42,342 -28,350 T0,350 T28,350 T56,350 T84,350 T112,350 T140,350 T168,350 T196,350 T224,350 T252,350 T280,350 T308,350 T336,350 T364,350 T392,350 T420,350 T448,350 T476,350 T504,350 T532,350 T560,350 T588,350 T616,350 T644,350 T672,350 T700,350"
                  fill="none"
                  stroke="#5aa0c4"
                  strokeWidth="1.6"
                  opacity="0.6"
                />
              </g>
              <g style={{ animation: "nl-wave-a 17s linear infinite" }}>
                <path
                  d="M-72,412 Q-54,404 -36,412 T0,412 T36,412 T72,412 T108,412 T144,412 T180,412 T216,412 T252,412 T288,412 T324,412 T360,412 T396,412 T432,412 T468,412 T504,412 T540,412 T576,412 T612,412 T648,412 T684,412 T720,412 T756,412"
                  fill="none"
                  stroke="#3d7ea4"
                  strokeWidth="1.6"
                  opacity="0.55"
                />
              </g>
            </g>
          ) : (
            <g>
              <rect width="680" height="270" fill="url(#nlSkyNight)" />
              <rect y="270" width="680" height="180" fill="url(#nlSeaNight)" />
              <circle cx="120" cy="80" r="1.3" fill="#fff" style={{ animation: "nl-twinkle 4s ease-in-out infinite" }} />
              <circle cx="300" cy="60" r="1" fill="#fff" style={{ animation: "nl-twinkle 5s ease-in-out infinite 1s" }} />
              <circle cx="430" cy="110" r="1.2" fill="#fff" style={{ animation: "nl-twinkle 4.5s ease-in-out infinite 0.5s" }} />
              <circle cx="560" cy="70" r="1.1" fill="#fff" style={{ animation: "nl-twinkle 5.5s ease-in-out infinite 2s" }} />
              <circle cx="620" cy="150" r="1" fill="#fff" style={{ animation: "nl-twinkle 4.2s ease-in-out infinite 1.4s" }} />
              <circle cx="360" cy="160" r="1" fill="#fff" style={{ animation: "nl-twinkle 6s ease-in-out infinite 0.8s" }} />
              <circle cx="150" cy="228" r="110" fill="url(#nlMoonGlow)" style={{ animation: "nl-glow 8s ease-in-out infinite" }} />
              <circle cx="150" cy="228" r="26" fill="#e8eef4" />
              <circle cx="142" cy="222" r="5" fill="#c8d4de" opacity="0.6" />
              <circle cx="158" cy="234" r="3.5" fill="#c8d4de" opacity="0.5" />
              <g style={{ animation: "nl-glitter 6s ease-in-out infinite" }}>
                <path
                  d="M142,282 L158,282 M138,298 L162,298 M142,314 L158,314 M136,332 L164,332 M140,352 L160,352"
                  stroke="#c2d2e0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </g>
              <path d="M600,254 L634,236 L666,254 Z M556,258 L582,244 L606,258 Z" fill="#2c3a48" opacity="0.9" />

              <GhostBoat x={236} y={282} delay="0s" tone="#3a4a5c" />
              <GhostBoat x={326} y={287} delay="1.8s" tone="#34424f" sail={false} />
              <GhostBoat x={158} y={285} scale={0.9} delay="3.2s" tone="#3a4a5c" />

              <MediumBalsa x={235} y={318} delay="1s" hull="#26201a" sailFill="#8fa2b8" crew="#1a1612" />
              <MediumBalsa x={405} y={330} delay="2.6s" hull="#221c16" sailFill="#8fa2b8" crew="#1a1612" />

              <g transform="translate(498,398)" style={{ animation: "nl-bob-main 8s ease-in-out infinite" }}>
                <path
                  d="M-56,10 Q-48,-2 -26,-4 L30,-9 Q54,-11 68,-28 Q70,-13 59,-3 Q44,9 18,10 L-38,12 Q-52,12 -56,10 Z"
                  fill="#241e16"
                />
                <path d="M-17,-6 L-17,-37 M-17,-37 Q0,-46 16,-37" stroke="#161210" strokeWidth="1.7" fill="none" />
                <path d="M-17,-37 Q0,-46 16,-37 L16,-22 Q0,-28 -17,-24 Z" fill="#a4b6c8" opacity="0.9" />
                <path d="M-17,-29 Q0,-35 16,-28" stroke="#5c6c7e" strokeWidth="2" fill="none" opacity="0.7" />
                <g transform="translate(5,-10)">
                  <path d="M0,0 Q-4.4,-12 0,-23 Q4.4,-12 0,0 Z" fill="#1a1612" />
                  <circle cx="0" cy="-27" r="5" fill="#1a1612" />
                  <path d="M-10,-29 Q-5,-35 -1,-30 M1,-30 Q5,-35 10,-29" fill="none" stroke="#c9b46a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M-8,-36 L0,-42 L8,-36" fill="none" stroke="#c9b46a" strokeWidth="2" strokeLinecap="round" />
                </g>
                <path d="M-33,-5 Q-35,-14 -33,-20 Q-30,-14 -31,-5 Z" fill="#1e1a14" />
                <circle cx="-32" cy="-23" r="3.7" fill="#1e1a14" />
              </g>

              <g style={{ animation: "nl-wave-a 11s linear infinite" }}>
                <path
                  d="M-72,294 Q-54,285 -36,294 T0,294 T36,294 T72,294 T108,294 T144,294 T180,294 T216,294 T252,294 T288,294 T324,294 T360,294 T396,294 T432,294 T468,294 T504,294 T540,294 T576,294 T612,294 T648,294 T684,294 T720,294 T756,294"
                  fill="none"
                  stroke="#3a5a74"
                  strokeWidth="1.8"
                  opacity="0.6"
                />
              </g>
              <g style={{ animation: "nl-wave-b 15s linear infinite reverse" }}>
                <path
                  d="M-56,350 Q-42,342 -28,350 T0,350 T28,350 T56,350 T84,350 T112,350 T140,350 T168,350 T196,350 T224,350 T252,350 T280,350 T308,350 T336,350 T364,350 T392,350 T420,350 T448,350 T476,350 T504,350 T532,350 T560,350 T588,350 T616,350 T644,350 T672,350 T700,350"
                  fill="none"
                  stroke="#2c4a62"
                  strokeWidth="1.6"
                  opacity="0.55"
                />
              </g>
            </g>
          )}
        </g>
      </svg>
      <div className="absolute bottom-5 left-5 md:bottom-8 md:left-10 select-none">
        <p className="text-[10px] md:text-xs tracking-[0.15em]" style={{ color: caption.esColor }}>
          {caption.es}
        </p>
        <p className="mt-1 text-[10px] md:text-xs tracking-[0.15em]" style={{ color: caption.enColor }}>
          {caption.en}
        </p>
      </div>
    </div>
  );
}
