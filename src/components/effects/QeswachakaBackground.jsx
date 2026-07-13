// /src/components/effects/QeswachakaBackground.jsx
"use client";

/**
 * Full page background for the Collaborations page: the Q'eswachaka, the last
 * Inca rope bridge, which four communities near Cusco reweave together every
 * year over the Apurimac river. It is the literal image of collaboration: a
 * crossing that only exists because people build it together.
 *
 * Light shows the renewal itself (people in colored ponchos carrying the woven
 * rope and crossing the deck). Dark shows the finished bridge resting under the
 * moon, the result of the collective work. Bilingual captions render as HTML
 * overlays in both modes so they never clip at tall aspect ratios.
 *
 * Framing: the bridge spans the middle of the viewBox (x from 104 to 560) and
 * the condor flies only over the right half and high above the content, so the
 * page text on the left is never crossed. preserveAspectRatio is xMidYMax so
 * the gorge and the river stay anchored to the bottom on every aspect ratio.
 * Motion respects prefers-reduced-motion.
 */

const CAPTIONS = {
  light: {
    es: "LA RENOVACION DEL Q'ESWACHAKA: CUATRO COMUNIDADES TEJEN EL PUENTE SOBRE EL APURIMAC",
    en: "THE Q'ESWACHAKA RENEWAL: FOUR COMMUNITIES WEAVE THE BRIDGE OVER THE APURIMAC",
    esColor: "#ffffff",
    enColor: "#c8dce2",
  },
  dark: {
    es: "EL Q'ESWACHAKA DESCANSA BAJO LA LUNA SOBRE EL APURIMAC",
    en: "THE Q'ESWACHAKA RESTS UNDER THE MOON OVER THE APURIMAC",
    esColor: "#f0f4f8",
    enColor: "#aeb9c6",
  },
};

function Comunero({ x, y, poncho, hat, wave = false }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse rx="4.5" ry="7" fill={poncho} />
      <circle cy="-9" r="3.2" fill="#4e382a" />
      {hat && <rect x="-4.2" y="-12" width="8.4" height="2.5" rx="1" fill={hat} />}
      {wave && (
        <g style={{ transformOrigin: "0px -6px", animation: "qe-wave 2.4s ease-in-out infinite" }}>
          <path d="M3,-6 L10,-14" stroke={poncho} strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="-14" r="1.4" fill={poncho} />
        </g>
      )}
    </g>
  );
}

export default function QeswachakaBackground({ className = "", isDark = false }) {
  const mode = isDark ? "dark" : "light";
  const caption = CAPTIONS[mode];

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 680 300"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="The Q'eswachaka rope bridge over the Apurimac river"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes qe-sway { 0%,100% { transform: translateY(0); } 50% { transform: translateY(2.5px); } }
          @keyframes qe-flow { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -80; } }
          @keyframes qe-foam { 0%,100% { opacity: 0.5; } 50% { opacity: 0.95; } }
          @keyframes qe-wave { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-10deg); } }
          @keyframes qe-flag { 0%,100% { transform: skewX(0deg); } 50% { transform: skewX(-9deg); } }
          @keyframes qe-condor { 0% { transform: translate(360px,34px); opacity: 0; } 15% { opacity: 0.75; } 85% { opacity: 0.75; } 100% { transform: translate(700px,14px); opacity: 0; } }
          @keyframes qe-cloud { 0% { transform: translateX(0); } 100% { transform: translateX(46px); } }
          @keyframes qe-carry { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.2px); } }
          @keyframes qe-twinkle { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
          @keyframes qe-glow { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .qe-anim, .qe-anim * { animation: none !important; }
            .qe-hide-reduced { display: none; }
          }
        `}</style>

        <defs>
          <linearGradient id="qeSkyDay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6db4d6" />
            <stop offset="0.55" stopColor="#c6e2e2" />
            <stop offset="1" stopColor="#ece2c6" />
          </linearGradient>
          <linearGradient id="qeRiverDay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4cb2c0" />
            <stop offset="0.55" stopColor="#2a8aa2" />
            <stop offset="1" stopColor="#1a6a86" />
          </linearGradient>
          <linearGradient id="qeWallL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9a7e58" />
            <stop offset="1" stopColor="#c2a678" />
          </linearGradient>
          <linearGradient id="qeWallR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#8e7250" />
            <stop offset="1" stopColor="#b89c70" />
          </linearGradient>
          <linearGradient id="qeSkyNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141c2e" />
            <stop offset="1" stopColor="#28364c" />
          </linearGradient>
          <linearGradient id="qeRiverNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14324a" />
            <stop offset="1" stopColor="#0a2034" />
          </linearGradient>
          <radialGradient id="qeMoon" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e8eef4" />
            <stop offset="0.55" stopColor="#c0d0e0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#c0d0e0" stopOpacity="0" />
          </radialGradient>
          <clipPath id="qeFrame">
            <rect x="0" y="0" width="680" height="300" />
          </clipPath>
        </defs>

        <g clipPath="url(#qeFrame)" className="qe-anim">
          {mode === "light" ? (
            <g>
              <rect width="680" height="300" fill="url(#qeSkyDay)" />

              <g style={{ animation: "qe-cloud 75s linear infinite alternate" }} opacity="0.9">
                <ellipse cx="230" cy="42" rx="46" ry="10" fill="#ffffff" />
                <ellipse cx="200" cy="49" rx="28" ry="8" fill="#ffffff" />
                <ellipse cx="256" cy="49" rx="26" ry="7" fill="#f4fbfd" />
                <ellipse cx="560" cy="32" rx="38" ry="8" fill="#ffffff" opacity="0.75" />
              </g>

              {/* Condor: right half only, high above, never over the page text */}
              <g className="qe-hide-reduced" style={{ animation: "qe-condor 30s linear infinite" }}>
                <path d="M0,0 Q-16,-8 -30,0 M0,0 Q16,-8 30,0" stroke="#54503f" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <ellipse cx="0" cy="0" rx="4" ry="2" fill="#54503f" />
              </g>

              <path d="M0,300 L0,168 Q54,160 104,188 L138,300 Z" fill="url(#qeWallL)" />
              <path d="M680,300 L680,146 Q610,150 552,180 L518,300 Z" fill="url(#qeWallR)" />
              <g stroke="#7a6040" strokeWidth="0.9" opacity="0.5">
                <path d="M14,198 L78,190 M8,226 L92,216 M20,254 L98,244 M30,282 L104,272" />
                <path d="M602,188 L664,182 M584,216 L668,208 M568,246 L672,238 M556,274 L660,266" />
              </g>
              <g stroke="#6f8a44" strokeWidth="1.6" opacity="0.7" strokeLinecap="round">
                <path d="M60,206 q-3,-8 -7,-11 M60,206 q2,-9 6,-12 M64,206 q4,-6 8,-8" />
                <path d="M618,198 q-3,-8 -7,-11 M618,198 q3,-9 7,-12" />
              </g>

              <path d="M96,214 Q170,206 250,224 Q340,246 430,224 Q510,204 566,212 L566,300 L96,300 Z" fill="#8cae5e" />
              <path d="M96,230 Q180,222 260,240 Q350,260 440,238 Q515,220 566,228" fill="none" stroke="#6e8a46" strokeWidth="1.2" opacity="0.6" />

              <path d="M118,258 Q220,244 330,262 Q440,280 562,258 L562,300 L118,300 Z" fill="url(#qeRiverDay)" />
              <g stroke="#c8ecf2" strokeWidth="1.7" fill="none" strokeDasharray="9 13" opacity="0.8" style={{ animation: "qe-flow 4s linear infinite" }}>
                <path d="M124,268 Q228,254 338,272 Q448,290 556,268" />
                <path d="M124,284 Q228,270 338,288 Q448,306 556,284" />
              </g>
              <ellipse cx="255" cy="273" rx="9" ry="4.5" fill="#5a4a34" />
              <ellipse cx="452" cy="279" rx="7" ry="3.8" fill="#5a4a34" />
              <g fill="#eefafc" style={{ animation: "qe-foam 2.6s ease-in-out infinite" }}>
                <ellipse cx="243" cy="274" rx="7" ry="2" />
                <ellipse cx="268" cy="274" rx="8" ry="2.2" />
                <ellipse cx="441" cy="280" rx="6" ry="1.8" />
                <ellipse cx="463" cy="280" rx="7" ry="2" />
                <ellipse cx="180" cy="266" rx="10" ry="2" />
                <ellipse cx="520" cy="266" rx="9" ry="2" />
              </g>
              <path d="M170,272 Q330,296 500,268" fill="none" stroke="#0e4a5e" strokeWidth="5" opacity="0.14" style={{ animation: "qe-sway 6s ease-in-out infinite" }} />

              {/* Stone portals (real anchors) */}
              <g fill="#9a8058" stroke="#6e5636" strokeWidth="1">
                <path d="M84,186 L120,178 L124,206 L88,214 Z" />
                <path d="M92,178 L114,173 L116,186 L94,191 Z" fill="#ab9064" />
                <path d="M540,176 L578,168 L582,196 L546,204 Z" />
                <path d="M548,168 L570,163 L572,176 L550,181 Z" fill="#a68a5e" />
              </g>
              <g stroke="#5e4a2e" strokeWidth="0.7" opacity="0.6">
                <path d="M90,196 L120,190 M88,206 L122,199 M546,194 L578,187 M544,201 L580,195" />
              </g>

              {/* The line of comuneros carrying the q'oya rope up the slope */}
              <g style={{ animation: "qe-carry 2.8s ease-in-out infinite" }}>
                <path d="M132,224 Q158,216 186,214 Q214,212 238,216" fill="none" stroke="#caa85e" strokeWidth="3" strokeLinecap="round" />
                <Comunero x={140} y={228} poncho="#b6472e" hat="#d9a441" />
                <Comunero x={170} y={224} poncho="#3a8a86" hat="#b6472e" />
                <Comunero x={202} y={222} poncho="#7a5a9a" hat="#3a8a86" />
                <Comunero x={232} y={224} poncho="#d9a441" />
              </g>

              {/* The bridge */}
              <g style={{ animation: "qe-sway 6s ease-in-out infinite" }}>
                <path d="M104,190 Q330,238 560,180" fill="none" stroke="#d9b96a" strokeWidth="1.7" opacity="0.8" />
                <path d="M104,232 Q330,282 560,222" fill="none" stroke="#8a6a3a" strokeWidth="1.7" opacity="0.75" />
                <g stroke="#a88a4a" strokeWidth="0.9" opacity="0.6">
                  <line x1="150" y1="203" x2="150" y2="244" />
                  <line x1="195" y1="212" x2="195" y2="254" />
                  <line x1="240" y1="220" x2="240" y2="262" />
                  <line x1="285" y1="226" x2="285" y2="269" />
                  <line x1="330" y1="229" x2="330" y2="272" />
                  <line x1="375" y1="228" x2="375" y2="271" />
                  <line x1="420" y1="225" x2="420" y2="267" />
                  <line x1="465" y1="218" x2="465" y2="260" />
                  <line x1="510" y1="209" x2="510" y2="250" />
                </g>
                <path d="M104,200 Q330,248 560,190" fill="none" stroke="#9a7a4a" strokeWidth="3.6" />
                <path d="M104,200 Q330,248 560,190" fill="none" stroke="#c9a45e" strokeWidth="1.4" strokeDasharray="3 4" opacity="0.85" />
                <path d="M104,220 Q330,270 560,210" fill="none" stroke="#77542a" strokeWidth="4" />
                <path d="M104,220 Q330,270 560,210" fill="none" stroke="#a5824a" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" />
                <g stroke="#5c4424" strokeWidth="1.6" opacity="0.85">
                  <line x1="144" y1="207" x2="144" y2="227" />
                  <line x1="184" y1="214" x2="184" y2="235" />
                  <line x1="224" y1="221" x2="224" y2="242" />
                  <line x1="264" y1="227" x2="264" y2="248" />
                  <line x1="304" y1="231" x2="304" y2="252" />
                  <line x1="344" y1="233" x2="344" y2="254" />
                  <line x1="384" y1="232" x2="384" y2="253" />
                  <line x1="424" y1="228" x2="424" y2="249" />
                  <line x1="464" y1="222" x2="464" y2="243" />
                  <line x1="504" y1="213" x2="504" y2="234" />
                  <line x1="540" y1="204" x2="540" y2="224" />
                </g>
                <Comunero x={250} y={218} poncho="#b6472e" hat="#d9a441" />
                <Comunero x={330} y={227} poncho="#3a8a86" hat="#b6472e" />
                <Comunero x={410} y={224} poncho="#d9a441" hat="#7a5a9a" />
                <Comunero x={482} y={213} poncho="#7a5a9a" wave />
              </g>

              {/* Festival flags on the portals */}
              <g style={{ transformOrigin: "104px 182px", animation: "qe-flag 3s ease-in-out infinite" }}>
                <path d="M104,182 L104,158" stroke="#6e5636" strokeWidth="1.5" />
                <path d="M104,158 L124,163 L104,168 Z" fill="#b6472e" />
                <path d="M104,168 L121,172 L104,177 Z" fill="#d9a441" />
              </g>
              <g style={{ transformOrigin: "560px 172px", animation: "qe-flag 3.4s ease-in-out infinite 0.5s" }}>
                <path d="M560,172 L560,148" stroke="#6e5636" strokeWidth="1.5" />
                <path d="M560,148 L580,153 L560,158 Z" fill="#3a8a86" />
                <path d="M560,158 L577,162 L560,167 Z" fill="#7a5a9a" />
              </g>
            </g>
          ) : (
            <g>
              <rect width="680" height="300" fill="url(#qeSkyNight)" />
              <circle cx="130" cy="66" r="1.2" fill="#fff" style={{ animation: "qe-twinkle 4s ease-in-out infinite" }} />
              <circle cx="300" cy="44" r="1" fill="#fff" style={{ animation: "qe-twinkle 5s ease-in-out infinite 1s" }} />
              <circle cx="420" cy="80" r="1.1" fill="#fff" style={{ animation: "qe-twinkle 4.5s ease-in-out infinite 0.5s" }} />
              <circle cx="620" cy="60" r="1" fill="#fff" style={{ animation: "qe-twinkle 5.5s ease-in-out infinite 1.6s" }} />
              <circle cx="240" cy="96" r="0.9" fill="#fff" style={{ animation: "qe-twinkle 6s ease-in-out infinite 2.2s" }} />

              <circle cx="520" cy="96" r="90" fill="url(#qeMoon)" style={{ animation: "qe-glow 8s ease-in-out infinite" }} />
              <circle cx="520" cy="96" r="19" fill="#e8eef4" />
              <circle cx="514" cy="91" r="4" fill="#c8d4de" opacity="0.6" />
              <circle cx="526" cy="102" r="2.6" fill="#c8d4de" opacity="0.5" />

              <path d="M0,300 L0,168 Q54,160 104,188 L138,300 Z" fill="#3e3626" />
              <path d="M680,300 L680,146 Q610,150 552,180 L518,300 Z" fill="#38301f" />
              <path d="M96,214 Q170,206 250,224 Q340,246 430,224 Q510,204 566,212 L566,300 L96,300 Z" fill="#31402a" />

              <path d="M118,258 Q220,244 330,262 Q440,280 562,258 L562,300 L118,300 Z" fill="url(#qeRiverNight)" />
              <g style={{ animation: "qe-glow 6s ease-in-out infinite" }}>
                <path
                  d="M500,262 L540,262 M492,274 L548,274 M498,286 L542,286"
                  stroke="#c0d0e0"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </g>
              <g stroke="#5a7a92" strokeWidth="1.4" fill="none" strokeDasharray="9 13" opacity="0.5" style={{ animation: "qe-flow 5s linear infinite" }}>
                <path d="M124,270 Q228,256 338,274 Q448,292 556,270" />
              </g>

              <g fill="#7a6844" stroke="#4a3e26" strokeWidth="1" opacity="0.9">
                <path d="M84,186 L120,178 L124,206 L88,214 Z" />
                <path d="M540,176 L578,168 L582,196 L546,204 Z" />
              </g>

              <g style={{ animation: "qe-sway 6s ease-in-out infinite" }}>
                <path d="M104,190 Q330,238 560,180" fill="none" stroke="#8a94a8" strokeWidth="1.4" opacity="0.5" />
                <path d="M104,232 Q330,282 560,222" fill="none" stroke="#4a3e28" strokeWidth="1.6" opacity="0.7" />
                <g stroke="#4a4030" strokeWidth="0.9" opacity="0.5">
                  <line x1="195" y1="212" x2="195" y2="254" />
                  <line x1="285" y1="226" x2="285" y2="269" />
                  <line x1="375" y1="228" x2="375" y2="271" />
                  <line x1="465" y1="218" x2="465" y2="260" />
                </g>
                <path d="M104,200 Q330,248 560,190" fill="none" stroke="#4e422c" strokeWidth="3.6" />
                <path d="M104,200 Q330,248 560,190" fill="none" stroke="#a8b4c4" strokeWidth="1" strokeDasharray="3 4" opacity="0.55" />
                <path d="M104,220 Q330,270 560,210" fill="none" stroke="#3c3220" strokeWidth="4" />
                <g stroke="#2c2416" strokeWidth="1.6" opacity="0.85">
                  <line x1="144" y1="207" x2="144" y2="227" />
                  <line x1="184" y1="214" x2="184" y2="235" />
                  <line x1="224" y1="221" x2="224" y2="242" />
                  <line x1="264" y1="227" x2="264" y2="248" />
                  <line x1="304" y1="231" x2="304" y2="252" />
                  <line x1="344" y1="233" x2="344" y2="254" />
                  <line x1="384" y1="232" x2="384" y2="253" />
                  <line x1="424" y1="228" x2="424" y2="249" />
                  <line x1="464" y1="222" x2="464" y2="243" />
                  <line x1="504" y1="213" x2="504" y2="234" />
                  <line x1="540" y1="204" x2="540" y2="224" />
                </g>
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* Cinematic scrim: a soft transparent-to-dark gradient along the foot of
          the scene so the caption reads over the river, the grass, or the rock. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
      />
      <div className="absolute bottom-4 left-4 md:bottom-5 md:left-6 select-none">
        <p className="text-[9px] md:text-[10px] tracking-[0.14em]" style={{ color: caption.esColor }}>
          {caption.es}
        </p>
        <p className="mt-0.5 text-[9px] md:text-[10px] tracking-[0.14em]" style={{ color: caption.enColor }}>
          {caption.en}
        </p>
      </div>
    </div>
  );
}
