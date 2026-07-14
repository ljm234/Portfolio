// /src/components/effects/MachuPicchuBackground.jsx
"use client";

/**
 * Full page background for the Publications page: Machu Picchu in the morning,
 * with the Salkantay watching from the west. The citadel is drawn from its real
 * anatomy: the double summit of Huayna Picchu with Huchuy Picchu in front, the
 * curved agricultural terraces with their retaining walls and vertical stairs,
 * the Temple of the Three Windows and its trapezoidal openings, the Sun Temple
 * with its semicircular tower, and the Intihuatana on its plinth. A cloud shadow
 * drifts across the terraces, the way it does on the mountain.
 *
 * In dark mode the citadel rests under the Mayu, the celestial river the Andes
 * read in the Milky Way.
 *
 * Framing: the viewBox is 680x400 and the scene is anchored bottom-center with
 * xMidYMax slice, so on 16:9 and 16:10 screens the crop takes sky from the top
 * (which is empty by design) rather than cutting the mountains at the sides.
 * Motion respects prefers-reduced-motion.
 */

const CAPTIONS = {
  light: {
    es: "LA MANANA SOBRE MACHU PICCHU, EL SALKANTAY VIGILA",
    en: "MORNING OVER MACHU PICCHU, THE SALKANTAY WATCHES",
    esColor: "#ffffff",
    enColor: "#d8e2d0",
  },
  dark: {
    es: "MACHU PICCHU BAJO EL MAYU, EL RIO CELESTIAL",
    en: "MACHU PICCHU UNDER THE MAYU, THE CELESTIAL RIVER",
    esColor: "#f0f4f8",
    enColor: "#aeb9c6",
  },
};

function Llama({ x, y, scale = 1, delay = 0, coat = "#eadfc8", legs = "#cabfa4" }) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${scale})`}
      style={{ animation: `mp-llama 3.4s ease-in-out infinite ${delay}s` }}
    >
      <ellipse rx="6.4" ry="4" fill={coat} />
      <rect x="3.8" y="-7.6" width="2.6" height="8" rx="1.2" fill={coat} />
      <circle cx="5.1" cy="-9" r="2.3" fill={coat} />
      <path d="M4.2,-10.8 L3.4,-13.2 M6.2,-10.8 L7.2,-13.2" stroke={coat} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M-3.4,3.8 L-3.4,8 M2.6,3.8 L2.6,8" stroke={legs} strokeWidth="1.3" />
    </g>
  );
}

export default function MachuPicchuBackground({ className = "", isDark = false }) {
  const mode = isDark ? "dark" : "light";
  const caption = CAPTIONS[mode];

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 680 400"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="Machu Picchu and the Huayna Picchu summit"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes mp-shadow { 0% { transform: translateX(-40px); } 100% { transform: translateX(150px); } }
          @keyframes mp-cloud { 0% { transform: translateX(-12px); } 100% { transform: translateX(18px); } }
          @keyframes mp-ray { 0%,100% { opacity: 0.14; } 50% { opacity: 0.3; } }
          @keyframes mp-condor { 0% { transform: translate(408px,140px); opacity: 0; } 15% { opacity: 0.9; } 85% { opacity: 0.9; } 100% { transform: translate(700px,112px); opacity: 0; } }
          @keyframes mp-llama { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
          @keyframes mp-mist { 0%,100% { opacity: 0.3; } 50% { opacity: 0.55; } }
          @keyframes mp-twinkle { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
          @keyframes mp-mayu { 0%,100% { opacity: 0.5; } 50% { opacity: 0.75; } }
          @media (prefers-reduced-motion: reduce) {
            .mp-anim, .mp-anim * { animation: none !important; }
            .mp-hide-reduced { display: none; }
          }
        `}</style>

        <defs>
          <linearGradient id="mpSkyDay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4e90bf" />
            <stop offset="0.32" stopColor="#77b0d0" />
            <stop offset="0.62" stopColor="#a9cddc" />
            <stop offset="0.85" stopColor="#e6d9ba" />
            <stop offset="1" stopColor="#f4e8ce" />
          </linearGradient>
          <linearGradient id="mpWayna" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#92a67c" />
            <stop offset="0.55" stopColor="#6d825a" />
            <stop offset="1" stopColor="#47573d" />
          </linearGradient>
          <linearGradient id="mpTerrace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#abbf80" />
            <stop offset="1" stopColor="#7e9955" />
          </linearGradient>
          <linearGradient id="mpSkyNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0e1730" />
            <stop offset="0.5" stopColor="#1a2744" />
            <stop offset="1" stopColor="#2a3a56" />
          </linearGradient>
          <linearGradient id="mpWaynaNight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#39435a" />
            <stop offset="1" stopColor="#20283a" />
          </linearGradient>
          <linearGradient id="mpMayu" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8d4f0" stopOpacity="0" />
            <stop offset="0.5" stopColor="#c8d4f0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#c8d4f0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {mode === "light" ? (
          <g className="mp-anim">
            <rect width="680" height="400" fill="url(#mpSkyDay)" />

            <g transform="translate(0,100)">
              {/* Salkantay, the snow peak watching from the west */}
              <path d="M20,138 L64,84 L86,108 L108,74 L152,140 Z" fill="#8fa6ae" />
              <path d="M64,84 L86,108 L96,92 L108,74 L118,96 L86,120 L58,98 Z" fill="#eef4f6" />
              <g stroke="#c8d8dc" strokeWidth="1" opacity="0.8">
                <path d="M76,100 L70,124 M100,88 L106,118" />
              </g>

              {/* Distant ranges with haze bands between the planes */}
              <path d="M0,162 L120,142 L196,116 L258,158 L316,132 L372,164 L428,130 L470,158 L540,122 L604,162 L680,138 L680,300 L0,300 Z" fill="#9cb2b6" opacity="0.45" />
              <rect x="0" y="158" width="680" height="10" fill="#eaf2f2" opacity="0.5" />
              <path d="M0,194 L70,162 L140,190 L206,156 L272,196 L340,168 L406,198 L470,164 L536,194 L610,168 L680,188 L680,300 L0,300 Z" fill="#7d9482" opacity="0.7" />
              <rect x="0" y="192" width="680" height="8" fill="#eef4ee" opacity="0.4" />

              {/* Sun rays raking in from the east */}
              <g style={{ animation: "mp-ray 8s ease-in-out infinite" }}>
                <path d="M680,60 L360,196 L420,214 L680,96 Z" fill="#ffe9b0" />
                <path d="M680,20 L470,150 L510,160 L680,52 Z" fill="#fff0c4" />
              </g>

              {/* Huayna Picchu with Huchuy Picchu in front */}
              <path d="M448,300 Q462,240 476,196 Q488,158 502,126 Q512,100 526,86 Q536,76 544,90 Q554,110 560,148 Q568,204 580,300 Z" fill="url(#mpWayna)" />
              <path d="M430,300 Q440,252 452,226 Q462,206 474,198 Q482,194 486,206 Q490,224 492,252 L494,300 Z" fill="#5b6e4e" opacity="0.92" />
              <path d="M526,86 Q536,76 544,90 Q540,102 530,106 Q522,98 526,86 Z" fill="#aab890" opacity="0.7" />
              <g stroke="#46563c" strokeWidth="0.9" opacity="0.5">
                <path d="M490,172 Q516,162 546,174 M482,214 Q514,202 556,216 M474,254 Q514,242 566,258" />
              </g>
              <path d="M544,90 Q560,150 580,300 L562,300 Q552,190 540,116 Z" fill="#38462f" opacity="0.35" />

              {/* The ridge the citadel sits on */}
              <path d="M112,300 Q142,240 196,214 Q260,186 330,182 Q398,180 446,206 Q468,220 482,250 L482,300 Z" fill="#7d945e" />

              {/* Agricultural terraces */}
              <g>
                <path d="M144,278 Q212,254 288,248 Q356,244 412,260 L412,268 Q356,252 288,256 Q212,262 144,286 Z" fill="url(#mpTerrace)" />
                <path d="M151,265 Q217,241 291,235 Q357,231 408,247 L408,255 Q357,239 291,243 Q217,249 151,273 Z" fill="url(#mpTerrace)" />
                <path d="M158,252 Q222,228 294,222 Q358,218 404,234 L404,242 Q358,226 294,230 Q222,236 158,260 Z" fill="url(#mpTerrace)" />
                <path d="M166,239 Q228,216 297,210 Q358,206 400,221 L400,229 Q358,214 297,218 Q228,224 166,247 Z" fill="url(#mpTerrace)" />
                <path d="M174,226 Q234,205 300,199 Q356,195 396,209 L396,217 Q356,202 300,206 Q234,212 174,234 Z" fill="url(#mpTerrace)" />
                <g stroke="#5e7638" strokeWidth="1.1" opacity="0.8">
                  <path d="M144,277 Q212,253 288,247 Q356,243 412,259" />
                  <path d="M151,264 Q217,240 291,234 Q357,230 408,246" />
                  <path d="M158,251 Q222,227 294,221 Q358,217 404,233" />
                  <path d="M166,238 Q228,215 297,209 Q358,205 400,220" />
                  <path d="M174,225 Q234,204 300,198 Q356,194 396,208" />
                </g>
                <g stroke="#93a86c" strokeWidth="0.7" opacity="0.6">
                  <path d="M206,204 L201,282 M256,198 L253,276 M306,196 L304,270 M354,200 L354,264" />
                </g>
              </g>

              {/* A cloud shadow drifting across the terraces */}
              <ellipse
                cx="240"
                cy="238"
                rx="72"
                ry="20"
                fill="#2e4a2a"
                opacity="0.16"
                style={{ animation: "mp-shadow 26s ease-in-out infinite alternate" }}
              />

              {/* The citadel */}
              <g>
                <g fill="#d3cbba" stroke="#a29882" strokeWidth="0.9">
                  <rect x="208" y="188" width="22" height="15" rx="1" />
                  <rect x="236" y="184" width="20" height="19" rx="1" />
                  <rect x="262" y="186" width="24" height="17" rx="1" />
                  <rect x="216" y="167" width="19" height="15" rx="1" />
                  <rect x="241" y="163" width="22" height="18" rx="1" />
                  <rect x="269" y="165" width="19" height="16" rx="1" />
                  <rect x="322" y="182" width="22" height="20" rx="1" />
                  <rect x="350" y="186" width="24" height="16" rx="1" />
                  <rect x="380" y="190" width="20" height="14" rx="1" />
                  <rect x="328" y="160" width="22" height="20" rx="1" />
                  <rect x="356" y="165" width="20" height="16" rx="1" />
                </g>
                <g stroke="#b3a98f" strokeWidth="0.5" opacity="0.8">
                  <path d="M208,193 h22 M208,198 h22 M322,187 h22 M322,193 h22 M328,166 h22 M328,172 h22" />
                </g>
                {/* Trapezoidal doorways, the Inca signature */}
                <g fill="#8a8070">
                  <path d="M243,203 L245,192 L251,192 L253,203 Z" />
                  <path d="M355,202 L357,192 L363,192 L365,202 Z" />
                  <path d="M385,204 L387,196 L392,196 L394,204 Z" />
                </g>
                {/* Temple of the Three Windows */}
                <g transform="translate(292,178)">
                  <rect x="-18" y="0" width="40" height="16" fill="#ddd5c4" stroke="#a29882" strokeWidth="0.9" />
                  <g fill="#7c7462">
                    <path d="M-13,13 L-11.6,4 L-7.4,4 L-6,13 Z" />
                    <path d="M-1,13 L0.4,4 L4.6,4 L6,13 Z" />
                    <path d="M11,13 L12.4,4 L16.6,4 L18,13 Z" />
                  </g>
                  <g stroke="#b3a98f" strokeWidth="0.45" opacity="0.8">
                    <path d="M-18,6 h40 M-18,11 h40" />
                  </g>
                </g>
                {/* Thatched roofs on the two reconstructed huts */}
                <g fill="#d9b06a">
                  <path d="M262,186 L273,175 L286,186 Z" />
                  <path d="M328,160 L338,149 L350,160 Z" />
                </g>
                {/* Main plaza */}
                <ellipse cx="296" cy="214" rx="42" ry="9" fill="#9cbb6c" />
                <ellipse cx="296" cy="214" rx="42" ry="9" fill="none" stroke="#82a054" strokeWidth="0.8" />
                {/* Sun Temple, the only round tower in the city */}
                <g transform="translate(390,176)">
                  <path d="M-12,12 L-12,0 Q-12,-10 0,-10 Q12,-10 12,0 L12,12 Z" fill="#d9d1c0" stroke="#a29882" strokeWidth="1" />
                  <path d="M-7.5,12 L-7.5,2 Q-7.5,-5.5 0,-5.5 Q7.5,-5.5 7.5,2 L7.5,12" fill="none" stroke="#b3a98f" strokeWidth="0.7" />
                  <path d="M-2.4,12 L-1.4,5 L1.4,5 L2.4,12 Z" fill="#8a8070" />
                </g>
                {/* Intihuatana, the stone that ties the sun */}
                <g transform="translate(256,148)">
                  <path d="M-9,9 L-7,2 L7,2 L9,9 Z" fill="#c6bdac" stroke="#a29882" strokeWidth="0.7" />
                  <rect x="-2.6" y="-7" width="5.2" height="9" fill="#d9d1c0" stroke="#a29882" strokeWidth="0.6" />
                </g>

                <Llama x={312} y={215} />
                <Llama x={282} y={219} scale={0.8} delay={1} coat="#d8c9ae" legs="#b8a98e" />
                <Llama x={336} y={220} scale={0.7} delay={0.5} coat="#e2d6bc" legs="#c2b69c" />
              </g>

              {/* Cumulus clouds with volume */}
              <g style={{ animation: "mp-cloud 40s ease-in-out infinite alternate" }}>
                <g transform="translate(210,54)">
                  <ellipse cx="0" cy="4" rx="40" ry="8" fill="#dfe9ec" />
                  <ellipse cx="-14" cy="-2" rx="18" ry="10" fill="#fff" />
                  <ellipse cx="8" cy="-5" rx="22" ry="12" fill="#fff" />
                  <ellipse cx="26" cy="0" rx="15" ry="8" fill="#f4f9fa" />
                </g>
                <g transform="translate(620,42) scale(0.8)">
                  <ellipse cx="0" cy="4" rx="36" ry="7" fill="#dfe9ec" />
                  <ellipse cx="-10" cy="-2" rx="16" ry="9" fill="#fff" />
                  <ellipse cx="10" cy="-4" rx="18" ry="10" fill="#fff" />
                </g>
              </g>

              {/* Sea of clouds in the valley */}
              <g style={{ animation: "mp-cloud 34s ease-in-out infinite alternate" }}>
                <ellipse cx="200" cy="276" rx="175" ry="16" fill="#fff" opacity="0.72" />
                <ellipse cx="516" cy="280" rx="165" ry="14" fill="#fff" opacity="0.66" />
              </g>
              <ellipse cx="340" cy="297" rx="340" ry="14" fill="#fff" opacity="0.78" />
              <g style={{ animation: "mp-mist 12s ease-in-out infinite" }}>
                <ellipse cx="452" cy="250" rx="54" ry="7" fill="#fff" />
                <ellipse cx="168" cy="240" rx="42" ry="6" fill="#fff" />
              </g>
            </g>

            {/* The condor patrols the right half, high above the page text */}
            <g className="mp-hide-reduced" style={{ animation: "mp-condor 32s linear infinite" }}>
              <path d="M0,0 Q-20,-11 -38,-1 M0,0 Q20,-11 38,-1" stroke="#3e3a30" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M-38,-1 q-5,3 -8,1 M38,-1 q5,3 8,1" stroke="#e8e4d8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <ellipse rx="4.8" ry="2.1" fill="#3e3a30" />
              <circle cx="3.4" cy="-1.6" r="1.5" fill="#f2eee2" />
            </g>
          </g>
        ) : (
          <g className="mp-anim">
            <rect width="680" height="400" fill="url(#mpSkyNight)" />

            {/* The Mayu, the celestial river the Andes read in the Milky Way */}
            <g style={{ animation: "mp-mayu 14s ease-in-out infinite" }}>
              <path d="M40,0 L160,0 L560,400 L440,400 Z" fill="url(#mpMayu)" />
              <path d="M78,0 L120,0 L510,400 L468,400 Z" fill="#dce4f8" opacity="0.16" />
            </g>
            <g fill="#ffffff">
              <circle cx="120" cy="60" r="1.1" style={{ animation: "mp-twinkle 4s ease-in-out infinite" }} />
              <circle cx="196" cy="120" r="1.3" style={{ animation: "mp-twinkle 5s ease-in-out infinite 1s" }} />
              <circle cx="268" cy="72" r="1" style={{ animation: "mp-twinkle 4.6s ease-in-out infinite 0.4s" }} />
              <circle cx="330" cy="160" r="1.2" style={{ animation: "mp-twinkle 5.4s ease-in-out infinite 1.8s" }} />
              <circle cx="410" cy="96" r="1.1" style={{ animation: "mp-twinkle 4.2s ease-in-out infinite 0.8s" }} />
              <circle cx="486" cy="188" r="1.3" style={{ animation: "mp-twinkle 6s ease-in-out infinite 2.4s" }} />
              <circle cx="560" cy="72" r="1" style={{ animation: "mp-twinkle 5.2s ease-in-out infinite 1.4s" }} />
              <circle cx="624" cy="140" r="1.2" style={{ animation: "mp-twinkle 4.8s ease-in-out infinite 2s" }} />
              <circle cx="64" cy="150" r="1" style={{ animation: "mp-twinkle 5.6s ease-in-out infinite 0.6s" }} />
              <circle cx="360" cy="40" r="1.1" style={{ animation: "mp-twinkle 4.4s ease-in-out infinite 2.8s" }} />
            </g>

            {/* Waning moon */}
            <g transform="translate(596,72)">
              <circle r="13" fill="#eef2f8" opacity="0.92" />
              <circle cx="6" cy="-3" r="11.4" fill="#1a2744" />
            </g>

            <g transform="translate(0,100)">
              {/* Salkantay keeps its snow under the stars */}
              <path d="M20,138 L64,84 L86,108 L108,74 L152,140 Z" fill="#3c4658" />
              <path d="M64,84 L86,108 L96,92 L108,74 L118,96 L86,120 L58,98 Z" fill="#c4cede" opacity="0.85" />

              <path d="M0,162 L120,142 L196,116 L258,158 L316,132 L372,164 L428,130 L470,158 L540,122 L604,162 L680,138 L680,300 L0,300 Z" fill="#2c3648" opacity="0.75" />
              <path d="M0,194 L70,162 L140,190 L206,156 L272,196 L340,168 L406,198 L470,164 L536,194 L610,168 L680,188 L680,300 L0,300 Z" fill="#242c3c" opacity="0.85" />

              <path d="M448,300 Q462,240 476,196 Q488,158 502,126 Q512,100 526,86 Q536,76 544,90 Q554,110 560,148 Q568,204 580,300 Z" fill="url(#mpWaynaNight)" />
              <path d="M430,300 Q440,252 452,226 Q462,206 474,198 Q482,194 486,206 Q490,224 492,252 L494,300 Z" fill="#1e2534" opacity="0.95" />
              <path d="M502,126 Q512,100 526,86 Q536,76 544,90" fill="none" stroke="#8e9ab4" strokeWidth="1.2" opacity="0.55" />

              <path d="M112,300 Q142,240 196,214 Q260,186 330,182 Q398,180 446,206 Q468,220 482,250 L482,300 Z" fill="#2e3a34" />
              <g fill="#3a4a3c">
                <path d="M144,278 Q212,254 288,248 Q356,244 412,260 L412,268 Q356,252 288,256 Q212,262 144,286 Z" />
                <path d="M158,252 Q222,228 294,222 Q358,218 404,234 L404,242 Q358,226 294,230 Q222,236 158,260 Z" />
                <path d="M174,226 Q234,205 300,199 Q356,195 396,209 L396,217 Q356,202 300,206 Q234,212 174,234 Z" />
              </g>
              <g stroke="#54644e" strokeWidth="0.9" opacity="0.5">
                <path d="M144,277 Q212,253 288,247 Q356,243 412,259 M158,251 Q222,227 294,221 Q358,217 404,233 M174,225 Q234,204 300,198 Q356,194 396,208" />
              </g>

              {/* The stone city sleeping, moonlight on the walls */}
              <g fill="#5e6472" stroke="#3e4450" strokeWidth="0.8">
                <rect x="208" y="188" width="22" height="15" rx="1" />
                <rect x="236" y="184" width="20" height="19" rx="1" />
                <rect x="262" y="186" width="24" height="17" rx="1" />
                <rect x="216" y="167" width="19" height="15" rx="1" />
                <rect x="241" y="163" width="22" height="18" rx="1" />
                <rect x="322" y="182" width="22" height="20" rx="1" />
                <rect x="350" y="186" width="24" height="16" rx="1" />
                <rect x="328" y="160" width="22" height="20" rx="1" />
              </g>
              <g fill="#8e96a8" opacity="0.55">
                <rect x="226" y="188" width="4" height="15" />
                <rect x="282" y="186" width="4" height="17" />
                <rect x="340" y="182" width="4" height="20" />
                <rect x="346" y="160" width="4" height="20" />
              </g>
              <g transform="translate(292,178)">
                <rect x="-18" y="0" width="40" height="16" fill="#666d7c" stroke="#3e4450" strokeWidth="0.8" />
                <g fill="#2a2f3a">
                  <path d="M-13,13 L-11.6,4 L-7.4,4 L-6,13 Z" />
                  <path d="M-1,13 L0.4,4 L4.6,4 L6,13 Z" />
                  <path d="M11,13 L12.4,4 L16.6,4 L18,13 Z" />
                </g>
              </g>
              <ellipse cx="296" cy="214" rx="42" ry="9" fill="#38442e" />
              <g transform="translate(390,176)">
                <path d="M-12,12 L-12,0 Q-12,-10 0,-10 Q12,-10 12,0 L12,12 Z" fill="#666d7c" stroke="#3e4450" strokeWidth="0.9" />
              </g>
              <g transform="translate(256,148)">
                <path d="M-9,9 L-7,2 L7,2 L9,9 Z" fill="#5e6472" stroke="#3e4450" strokeWidth="0.7" />
                <rect x="-2.6" y="-7" width="5.2" height="9" fill="#767d8c" stroke="#3e4450" strokeWidth="0.6" />
              </g>

              {/* Silver sea of clouds */}
              <g style={{ animation: "mp-cloud 34s ease-in-out infinite alternate" }}>
                <ellipse cx="200" cy="276" rx="175" ry="16" fill="#aab8ce" opacity="0.35" />
                <ellipse cx="516" cy="280" rx="165" ry="14" fill="#aab8ce" opacity="0.3" />
              </g>
              <ellipse cx="340" cy="297" rx="340" ry="14" fill="#b8c4d8" opacity="0.4" />
            </g>
          </g>
        )}
      </svg>

      {/* Cinematic scrim so the caption reads over the mountain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
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
