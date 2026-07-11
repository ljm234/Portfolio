// /src/components/effects/HananPachaBackground.jsx
"use client";

import { useEffect, useState } from "react";

/**
 * Full page background inspired by the Hanan Pacha, the upper world in
 * Andean cosmology. Three animated SVG scenes cover the day:
 *
 *   dawn  (00:00 to 06:59)  golden sunrise, fading stars, gliding condor
 *   day   (07:00 to 17:59)  high Andean blue, drifting clouds, condor
 *   night (18:00 to 23:59)  Milky Way, twinkling stars, Chakana, shooting star
 *
 * Scene precedence: the theme toggle always wins. Dark mode forces the
 * night scene. Light mode picks dawn or day from the visitor's clock, and
 * during evening hours it falls back to the golden dawn palette so light
 * themed text stays readable. The hour based dark default for evening
 * visitors lives in the layout theme script, not here.
 *
 * Each scene carries a small bilingual caption (Spanish first, English
 * below). Motion respects prefers-reduced-motion via the media query in
 * the embedded stylesheet.
 */

function sceneForHour(hour) {
  if (hour < 7) return "dawn";
  if (hour < 18) return "day";
  return "dusk";
}

const CONDOR_PATH =
  "M0,0 Q-10,-3 -22,-2 L-46,-6 Q-58,-8 -68,-5 L-64,-2 L-70,0 L-65,2 L-71,5 L-64,6 Q-52,8 -40,4 L-20,3 Q-10,4 0,3 Q10,4 20,3 L40,4 Q52,8 64,6 L71,5 L65,2 L70,0 L64,-2 L68,-5 Q58,-8 46,-6 L22,-2 Q10,-3 0,0 Z";

function Condor({ glideAnim, soarDur = "7s" }) {
  return (
    <g className="hp-hide-reduced" style={{ animation: glideAnim }}>
      <g style={{ animation: `hp-soar ${soarDur} ease-in-out infinite` }}>
        <path d={CONDOR_PATH} fill="#2a2018" />
        <ellipse cx="0" cy="2" rx="7" ry="4" fill="#2a2018" />
        <path d="M-4,5 L0,14 L4,5 Z" fill="#2a2018" />
        <circle cx="8" cy="0" r="2.6" fill="#2a2018" />
        <path d="M5,-2 Q8,-5 12,-3" stroke="#f0ece0" strokeWidth="1.2" fill="none" />
      </g>
    </g>
  );
}

function Caption({ es, en, fillTop, fillBottom }) {
  return (
    <g fontFamily="ui-sans-serif, system-ui" fontSize="9" letterSpacing="0.5">
      <text x="40" y="422" fill={fillTop}>{es}</text>
      <text x="40" y="436" fill={fillBottom}>{en}</text>
    </g>
  );
}

export default function HananPachaBackground({ className = "", isDark = false }) {
  const [timeScene, setTimeScene] = useState("day");

  useEffect(() => {
    const update = () => setTimeScene(sceneForHour(new Date().getHours()));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const scene = isDark ? "night" : timeScene === "dusk" ? "dawn" : timeScene;

  return (
    <svg
      className={className}
      viewBox="0 0 680 450"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Animated Andean sky, the Hanan Pacha"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes hp-glide-dawn { 0% { transform: translate(-140px,100px); } 100% { transform: translate(800px,55px); } }
        @keyframes hp-glide-day { 0% { transform: translate(-140px,190px); } 100% { transform: translate(800px,140px); } }
        @keyframes hp-soar { 0%,100% { transform: translateY(0) rotate(0.5deg); } 50% { transform: translateY(-8px) rotate(-1deg); } }
        @keyframes hp-fade { 0%,100% { opacity: 0.5; } 50% { opacity: 0.1; } }
        @keyframes hp-twinkle { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
        @keyframes hp-shoot { 0% { transform: translate(0,0); opacity: 0; } 3% { opacity: 1; } 12% { transform: translate(-190px,95px); opacity: 0; } 100% { transform: translate(-190px,95px); opacity: 0; } }
        @keyframes hp-milky { 0%,100% { opacity: 0.13; } 50% { opacity: 0.21; } }
        @keyframes hp-mist { 0%,100% { transform: translateX(0); opacity: 0.5; } 50% { transform: translateX(16px); opacity: 0.75; } }
        @keyframes hp-sun { 0%,100% { opacity: 0.82; } 50% { opacity: 1; } }
        @keyframes hp-cloud-a { 0% { transform: translateX(0); } 100% { transform: translateX(90px); } }
        @keyframes hp-cloud-b { 0% { transform: translateX(0); } 100% { transform: translateX(-70px); } }
        @keyframes hp-shadow { 0%,100% { opacity: 0.1; } 50% { opacity: 0.18; } }
        @media (prefers-reduced-motion: reduce) {
          .hp-anim, .hp-anim * { animation: none !important; }
          .hp-hide-reduced { display: none; }
        }
      `}</style>

      <defs>
        <linearGradient id="hpDawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3a5e" />
          <stop offset="0.42" stopColor="#5a6a92" />
          <stop offset="0.68" stopColor="#c98a6a" />
          <stop offset="0.85" stopColor="#f0b268" />
          <stop offset="1" stopColor="#fadfa0" />
        </linearGradient>
        <radialGradient id="hpDawnSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff2c8" />
          <stop offset="0.55" stopColor="#ffd98a" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hpDaySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a86c4" />
          <stop offset="0.5" stopColor="#74aada" />
          <stop offset="1" stopColor="#b8d8ee" />
        </linearGradient>
        <radialGradient id="hpDaySun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.5" stopColor="#fff2b8" />
          <stop offset="1" stopColor="#fff2b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hpNightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#131b2e" />
          <stop offset="0.7" stopColor="#1e2c48" />
          <stop offset="1" stopColor="#2a3a56" />
        </linearGradient>
        <clipPath id="hpFrame">
          <rect x="0" y="0" width="680" height="450" />
        </clipPath>
      </defs>

      <g clipPath="url(#hpFrame)" className="hp-anim">
        {scene === "dawn" && (
          <g>
            <rect x="0" y="0" width="680" height="450" fill="url(#hpDawnSky)" />
            <circle cx="150" cy="60" r="1.3" fill="#fff" style={{ animation: "hp-fade 5s ease-in-out infinite" }} />
            <circle cx="290" cy="94" r="1" fill="#fff" style={{ animation: "hp-fade 6s ease-in-out infinite 1s" }} />
            <circle cx="90" cy="140" r="1.1" fill="#fff" style={{ animation: "hp-fade 5.5s ease-in-out infinite 2s" }} />
            <circle cx="440" cy="54" r="1" fill="#fff" style={{ animation: "hp-fade 6.5s ease-in-out infinite 0.5s" }} />
            <circle cx="560" cy="90" r="1.2" fill="#fff" style={{ animation: "hp-fade 5s ease-in-out infinite 1.6s" }} />
            <circle cx="500" cy="300" r="120" fill="url(#hpDawnSun)" style={{ animation: "hp-sun 7s ease-in-out infinite" }} />
            <circle cx="500" cy="300" r="34" fill="#fff2c8" opacity="0.95" />
            <Condor glideAnim="hp-glide-dawn 60s linear infinite" />
            <ellipse cx="200" cy="336" rx="150" ry="13" fill="#fadfa0" opacity="0.5" style={{ animation: "hp-mist 15s ease-in-out infinite" }} />
            <ellipse cx="480" cy="356" rx="130" ry="11" fill="#fadfa0" opacity="0.45" style={{ animation: "hp-mist 18s ease-in-out infinite 2s" }} />
            <path d="M0,366 L90,294 L150,338 L240,282 L330,336 L430,290 L530,338 L610,306 L680,332 L680,450 L0,450 Z" fill="#3a2e40" opacity="0.92" />
            <path d="M90,294 L110,318 L116,311 L130,336 L112,330 L100,340 Z" fill="#f0d8b8" opacity="0.9" />
            <path d="M240,282 L264,308 L271,300 L304,330 L280,323 L264,334 Z" fill="#f0d8b8" opacity="0.9" />
            <path d="M430,290 L452,314 L458,307 L488,332 L464,326 L448,336 Z" fill="#f0d8b8" opacity="0.9" />
            <path d="M0,412 L120,372 L230,406 L360,366 L490,404 L600,372 L680,398 L680,450 L0,450 Z" fill="#241c2e" />
            <Caption
              es="EL CONDOR, AVE DEL HANAN PACHA, CRUZA EL AMANECER"
              en="THE CONDOR, BIRD OF THE UPPER WORLD, CROSSES THE DAWN"
              fillTop="#e8d8b8"
              fillBottom="#c0aa88"
            />
          </g>
        )}

        {scene === "day" && (
          <g>
            <rect x="0" y="0" width="680" height="450" fill="url(#hpDaySky)" />
            <circle cx="560" cy="90" r="100" fill="url(#hpDaySun)" style={{ animation: "hp-sun 7s ease-in-out infinite" }} />
            <circle cx="560" cy="90" r="32" fill="#fffbe8" />
            <g style={{ animation: "hp-cloud-a 70s linear infinite alternate" }} opacity="0.92">
              <ellipse cx="150" cy="110" rx="52" ry="15" fill="#ffffff" />
              <ellipse cx="118" cy="118" rx="34" ry="11" fill="#ffffff" />
              <ellipse cx="184" cy="119" rx="38" ry="12" fill="#ffffff" />
              <ellipse cx="150" cy="122" rx="55" ry="10" fill="#e8f0f8" />
            </g>
            <g style={{ animation: "hp-cloud-b 85s linear infinite alternate" }} opacity="0.88">
              <ellipse cx="400" cy="160" rx="44" ry="13" fill="#ffffff" />
              <ellipse cx="372" cy="167" rx="28" ry="9" fill="#ffffff" />
              <ellipse cx="428" cy="168" rx="30" ry="10" fill="#ffffff" />
            </g>
            <g style={{ animation: "hp-cloud-a 95s linear infinite alternate" }} opacity="0.8">
              <ellipse cx="600" cy="200" rx="36" ry="10" fill="#ffffff" />
              <ellipse cx="578" cy="206" rx="22" ry="7" fill="#ffffff" />
              <ellipse cx="622" cy="206" rx="24" ry="8" fill="#ffffff" />
            </g>
            <Condor glideAnim="hp-glide-day 60s linear infinite" />
            <ellipse cx="240" cy="352" rx="90" ry="14" fill="#1a2e18" style={{ animation: "hp-shadow 12s ease-in-out infinite" }} />
            <ellipse cx="500" cy="372" rx="70" ry="11" fill="#1a2e18" style={{ animation: "hp-shadow 15s ease-in-out infinite 3s" }} />
            <path d="M0,356 L90,248 L150,316 L240,230 L330,312 L430,244 L530,316 L610,270 L680,306 L680,450 L0,450 Z" fill="#8a6b4e" />
            <path d="M0,356 L90,248 L150,316 L200,270 L160,356 Z" fill="#7a5c40" opacity="0.7" />
            <path d="M240,230 L330,312 L380,272 L300,356 Z" fill="#9a7a58" opacity="0.6" />
            <path d="M90,248 L112,284 L118,277 L134,312 L114,304 L100,318 Z" fill="#ffffff" />
            <path d="M240,230 L266,272 L273,264 L308,306 L282,298 L264,314 Z" fill="#ffffff" />
            <path d="M430,244 L454,284 L460,277 L492,312 L466,304 L448,318 Z" fill="#ffffff" />
            <path d="M0,398 L120,346 L230,392 L360,338 L490,388 L600,346 L680,382 L680,450 L0,450 Z" fill="#5a7a3e" />
            <path d="M0,428 L160,388 L320,424 L480,384 L680,420 L680,450 L0,450 Z" fill="#4a6a32" />
            <Caption
              es="EL CONDOR CRUZA EL CIELO DEL MEDIODIA ANDINO"
              en="THE CONDOR CROSSES THE ANDEAN MIDDAY SKY"
              fillTop="#f0f6e8"
              fillBottom="#d0e0c0"
            />
          </g>
        )}

        {scene === "night" && (
          <g>
            <rect x="0" y="0" width="680" height="450" fill="url(#hpNightSky)" />
            <g style={{ animation: "hp-milky 10s ease-in-out infinite" }}>
              <path d="M80,450 Q220,300 380,180 Q500,90 640,0 L680,0 L680,60 Q540,150 420,255 Q280,375 140,450 Z" fill="#8fa8d8" />
            </g>
            <circle cx="90" cy="90" r="1.4" fill="#fff" style={{ animation: "hp-twinkle 4s ease-in-out infinite" }} />
            <circle cx="170" cy="165" r="1" fill="#fff" style={{ animation: "hp-twinkle 5s ease-in-out infinite 1s" }} />
            <circle cx="260" cy="82" r="1.6" fill="#fff" style={{ animation: "hp-twinkle 3.5s ease-in-out infinite 0.5s" }} />
            <circle cx="340" cy="210" r="1" fill="#fff" style={{ animation: "hp-twinkle 6s ease-in-out infinite 2s" }} />
            <circle cx="430" cy="120" r="1.3" fill="#fff" style={{ animation: "hp-twinkle 4.5s ease-in-out infinite 1.5s" }} />
            <circle cx="520" cy="210" r="1" fill="#fff" style={{ animation: "hp-twinkle 5.5s ease-in-out infinite 0.8s" }} />
            <circle cx="600" cy="105" r="1.4" fill="#fff" style={{ animation: "hp-twinkle 4s ease-in-out infinite 2.4s" }} />
            <circle cx="130" cy="270" r="1" fill="#fff" style={{ animation: "hp-twinkle 5s ease-in-out infinite 3s" }} />
            <circle cx="300" cy="300" r="1.1" fill="#fff" style={{ animation: "hp-twinkle 4.2s ease-in-out infinite 1.2s" }} />
            <circle cx="480" cy="300" r="1" fill="#fff" style={{ animation: "hp-twinkle 6s ease-in-out infinite 0.3s" }} />
            <circle cx="640" cy="240" r="1.2" fill="#fff" style={{ animation: "hp-twinkle 4.8s ease-in-out infinite 2s" }} />
            <circle cx="50" cy="345" r="1" fill="#fff" style={{ animation: "hp-twinkle 5.2s ease-in-out infinite 1.7s" }} />
            <g className="hp-hide-reduced" style={{ animation: "hp-shoot 14s linear infinite" }}>
              <line x1="620" y1="60" x2="648" y2="46" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
            </g>
            <g transform="translate(555,180)">
              <circle cx="0" cy="-26" r="2.2" fill="#e8c05a" style={{ animation: "hp-twinkle 4s ease-in-out infinite" }} />
              <circle cx="0" cy="26" r="2.2" fill="#e8c05a" style={{ animation: "hp-twinkle 4s ease-in-out infinite 0.5s" }} />
              <circle cx="-26" cy="0" r="2.2" fill="#e8c05a" style={{ animation: "hp-twinkle 4s ease-in-out infinite 1s" }} />
              <circle cx="26" cy="0" r="2.2" fill="#e8c05a" style={{ animation: "hp-twinkle 4s ease-in-out infinite 1.5s" }} />
              <circle cx="0" cy="0" r="2.6" fill="#f0d070" style={{ animation: "hp-twinkle 4s ease-in-out infinite 0.8s" }} />
              <g stroke="#e8c05a" strokeWidth="0.6" opacity="0.35">
                <line x1="0" y1="-26" x2="0" y2="26" />
                <line x1="-26" y1="0" x2="26" y2="0" />
              </g>
            </g>
            <path d="M0,378 L90,306 L160,350 L250,292 L340,346 L440,300 L540,350 L620,314 L680,342 L680,450 L0,450 Z" fill="#0d1422" />
            <Caption
              es="HANAN PACHA: EL MUNDO DE ARRIBA. LOS INCAS LEIAN EL CIELO"
              en="HANAN PACHA: THE WORLD ABOVE. THE INCAS READ THE SKY"
              fillTop="#a8b4c8"
              fillBottom="#7a8498"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
