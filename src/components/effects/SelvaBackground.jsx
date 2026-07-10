// /src/components/effects/SelvaBackground.jsx
"use client";

/**
 * Animated Peruvian-Amazon background rendered as inline SVG.
 * Scene: dawn sky over the basin with a soft sun, distant snow-capped ranges,
 * a river with flowing highlights and floating Victoria regia lilies, layered
 * canopy hills, heliconia and fern plants on the sides, palms, a swinging
 * monkey on a liana, drifting butterflies, and a pair of birds gliding slowly.
 *
 * The whole scene is wrapped in a viewBox clip so nothing overflows, and it
 * scales to fill its container via preserveAspectRatio="xMidYMid slice".
 * Motion respects prefers-reduced-motion through the CSS media query below.
 * The isDark prop shifts the palette toward a cooler night variant.
 */
export default function SelvaBackground({ className = "", isDark = false }) {
  const sky = isDark
    ? { a: "#2a3f52", b: "#33505c", c: "#3a4a34", d: "#3f4a30" }
    : { a: "#8bbcd6", b: "#bcdae4", c: "#e8e4c0", d: "#f2ecc8" };
  const water = isDark ? { a: "#4a6f88", b: "#3a5872" } : { a: "#9ecadf", b: "#6aa8ca" };
  const hills = isDark
    ? { back: "#4a6b3a", mid: "#3a5a2c", low: "#2e4a22", front1: "#243a1a", front2: "#1c2e14" }
    : { back: "#8fbf5e", mid: "#6ba03e", low: "#54862e", front1: "#3f6a24", front2: "#31531b" };
  const sunOpacity = isDark ? 0.4 : 1;

  return (
    <svg
      className={className}
      viewBox="0 0 680 450"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Animated Peruvian Amazon landscape"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes selva-mistA { 0%,100% { transform: translateX(0); opacity: 0.4; } 50% { transform: translateX(14px); opacity: 0.72; } }
        @keyframes selva-mistB { 0%,100% { transform: translateX(0); opacity: 0.35; } 50% { transform: translateX(-12px); opacity: 0.6; } }
        @keyframes selva-birds { 0% { transform: translate(-60px,8px); opacity: 0; } 6%{opacity:1;} 94%{opacity:1;} 100% { transform: translate(740px,-18px); opacity: 0; } }
        @keyframes selva-flap { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.6); } }
        @keyframes selva-river { 0% { transform: translateX(0); } 100% { transform: translateX(-40px); } }
        @keyframes selva-shimmer { 0%,100% { opacity: 0.45; } 50% { opacity: 0.82; } }
        @keyframes selva-swayA { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(1.2deg); } }
        @keyframes selva-swayB { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-1deg); } }
        @keyframes selva-monkey { 0%,100% { transform: rotate(-2.5deg); } 50% { transform: rotate(2.5deg); } }
        @keyframes selva-sun { 0%,100% { opacity: 0.82; } 50% { opacity: 1; } }
        @keyframes selva-bflyA { 0% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(24px,-14px) rotate(6deg); } 100% { transform: translate(48px,-4px) rotate(-4deg); } }
        @keyframes selva-bflyB { 0% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-20px,-12px) rotate(-6deg); } 100% { transform: translate(-42px,-2px) rotate(5deg); } }
        @keyframes selva-lily { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes selva-helic { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(2.5deg); } }
        .selva-pf { transform-origin: bottom center; animation: selva-swayA 10s ease-in-out infinite; }
        .selva-pg { transform-origin: bottom center; animation: selva-swayB 12s ease-in-out infinite; }
        .selva-hc { transform-origin: bottom center; animation: selva-helic 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .selva-pf, .selva-pg, .selva-hc, [class^="selva-anim"] { animation: none !important; }
          .selva-birds-g { display: none; }
        }
      `}</style>

      <defs>
        <linearGradient id="selvaSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky.a} />
          <stop offset="0.4" stopColor={sky.b} />
          <stop offset="0.72" stopColor={sky.c} />
          <stop offset="1" stopColor={sky.d} />
        </linearGradient>
        <linearGradient id="selvaWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={water.a} />
          <stop offset="1" stopColor={water.b} />
        </linearGradient>
        <radialGradient id="selvaSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset="0.6" stopColor="#ffe9b0" />
          <stop offset="1" stopColor="#ffe9b0" stopOpacity="0" />
        </radialGradient>
        <clipPath id="selvaFrame">
          <rect x="0" y="0" width="680" height="450" />
        </clipPath>
        <clipPath id="selvaRiver">
          <path d="M0,255 Q120,237 250,253 Q380,269 520,249 Q600,239 680,251 L680,296 Q600,306 520,290 Q380,312 250,292 Q120,278 0,296 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#selvaFrame)">
        <rect x="0" y="0" width="680" height="450" fill="url(#selvaSky)" />

        <circle cx="470" cy="145" r="125" fill="url(#selvaSun)" opacity={sunOpacity} style={{ animation: "selva-sun 7s ease-in-out infinite" }} />
        <circle cx="470" cy="145" r="40" fill="#fff6d8" opacity={0.9 * sunOpacity} />

        <g className="selva-birds-g" style={{ animation: "selva-birds 110s linear infinite" }}>
          <g transform="translate(0,60)"><g style={{ transformOrigin: "center", animation: "selva-flap 2.6s ease-in-out infinite" }}><path d="M-9,2 Q0,-6 9,2" fill="none" stroke="#5f7077" strokeWidth="2" strokeLinecap="round" /></g></g>
          <g transform="translate(30,48)"><g style={{ transformOrigin: "center", animation: "selva-flap 2.8s ease-in-out infinite 0.4s" }}><path d="M-7,2 Q0,-5 7,2" fill="none" stroke="#5f7077" strokeWidth="1.8" strokeLinecap="round" /></g></g>
        </g>

        <path d="M0,140 L110,96 L175,120 L270,88 L365,118 L460,92 L555,120 L680,96 L680,180 L0,180 Z" fill="#9fb8c8" opacity="0.45" />
        <path d="M110,96 L128,114 L134,108 L146,128 L130,124 L118,132 Z" fill="#f4f8fa" />
        <path d="M270,88 L292,110 L299,103 L330,128 L308,122 L292,132 Z" fill="#f4f8fa" />
        <path d="M460,92 L480,112 L486,106 L514,128 L492,122 L476,132 Z" fill="#f4f8fa" />

        <ellipse cx="220" cy="158" rx="150" ry="15" fill="#ffffff" style={{ animation: "selva-mistA 16s ease-in-out infinite" }} />
        <ellipse cx="500" cy="172" rx="130" ry="12" fill="#ffffff" style={{ animation: "selva-mistB 19s ease-in-out infinite" }} />

        <path d="M0,168 Q70,150 140,162 Q230,178 320,158 Q420,140 520,160 Q600,174 680,156 L680,215 L0,215 Z" fill={hills.back} opacity="0.92" />
        <path d="M0,200 Q90,182 180,196 Q290,212 400,192 Q510,176 620,194 Q660,200 680,194 L680,255 L0,255 Z" fill={hills.mid} />

        <g className="selva-hc" transform="translate(40,258)">
          <path d="M0,0 L0,-72" fill="none" stroke="#2d6020" strokeWidth="3.5" />
          <path d="M0,-24 Q-16,-32 -22,-22 Q-12,-20 0,-18 Z" fill="#3a7a2c" />
          <path d="M0,-44 Q16,-52 22,-42 Q12,-40 0,-38 Z" fill="#3a7a2c" />
          <path d="M0,-70 L-8,-63 Q-14,-58 -12,-52 Q-6,-55 -2,-61 Z" fill="#e04838" />
          <path d="M-2,-61 L-10,-52 Q-15,-47 -12,-42 Q-7,-45 -3,-51 Z" fill="#e8622a" />
          <path d="M-3,-51 L-10,-42 Q-14,-37 -11,-33 Q-6,-36 -3,-42 Z" fill="#e04838" />
          <path d="M0,-70 L8,-62 Q13,-57 11,-52 Q6,-55 2,-61 Z" fill="#e8622a" />
        </g>
        <g className="selva-hc" transform="translate(640,258)" style={{ animationDelay: "1.5s" }}>
          <path d="M0,0 L0,-66" fill="none" stroke="#2d6020" strokeWidth="3.5" />
          <path d="M0,-22 Q16,-30 22,-20 Q12,-18 0,-16 Z" fill="#3a7a2c" />
          <path d="M0,-42 Q-16,-50 -22,-40 Q-12,-38 0,-36 Z" fill="#3a7a2c" />
          <path d="M0,-64 L-7,-57 Q-12,-52 -10,-47 Q-5,-50 -2,-56 Z" fill="#e04838" />
          <path d="M-2,-56 L-9,-47 Q-13,-42 -10,-38 Q-5,-41 -2,-47 Z" fill="#e8622a" />
          <path d="M0,-64 L7,-56 Q12,-51 10,-46 Q5,-49 2,-55 Z" fill="#e8622a" />
        </g>

        <path d="M0,255 Q120,237 250,253 Q380,269 520,249 Q600,239 680,251 L680,296 Q600,306 520,290 Q380,312 250,292 Q120,278 0,296 Z" fill="url(#selvaWater)" />
        <g clipPath="url(#selvaRiver)">
          <g style={{ animation: "selva-river 11s linear infinite" }}>
            <path d="M-60,268 Q60,262 180,270 Q300,278 420,268 Q540,260 660,268 Q720,272 780,268" fill="none" stroke="#c0e0f0" strokeWidth="5" opacity="0.65" />
            <path d="M-60,282 Q60,276 180,284 Q300,292 420,282 Q540,274 660,282 Q720,286 780,282" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.45" />
            <path d="M-60,258 Q60,252 180,260 Q300,268 420,258 Q540,250 660,258 Q720,262 780,258" fill="none" stroke="#fff2cc" strokeWidth="3" opacity="0.5" />
          </g>
          <ellipse cx="380" cy="272" rx="70" ry="11" fill="#fff6d8" opacity="0.45" style={{ animation: "selva-shimmer 6s ease-in-out infinite" }} />
          <g style={{ animation: "selva-lily 6s ease-in-out infinite" }}>
            <ellipse cx="500" cy="272" rx="24" ry="7.5" fill="#4a8a3a" />
            <ellipse cx="500" cy="271" rx="20" ry="6" fill="#5fa04a" />
            <path d="M500,265 L511,271 A20,6 0 0 1 500,277 Z" fill="#4a8a3a" />
            <ellipse cx="500" cy="271" rx="20" ry="6" fill="none" stroke="#3a6e2c" strokeWidth="1.4" />
          </g>
          <g style={{ animation: "selva-lily 7s ease-in-out infinite 1.2s" }}>
            <ellipse cx="575" cy="280" rx="18" ry="6" fill="#4a8a3a" />
            <ellipse cx="575" cy="279" rx="15" ry="5" fill="#5fa04a" />
            <ellipse cx="575" cy="279" rx="15" ry="5" fill="none" stroke="#3a6e2c" strokeWidth="1.2" />
            <path d="M571,275 Q573,269 577,271 Q581,273 579,277 Q575,279 571,275 Z" fill="#f2c4d8" />
            <circle cx="575" cy="274" r="1.4" fill="#fff" />
          </g>
        </g>

        <path d="M0,293 Q55,277 110,289 Q170,301 230,285 Q290,271 350,287 Q410,303 470,285 Q535,269 600,287 Q645,299 680,285 L680,335 L0,335 Z" fill={hills.low} />

        <g className="selva-pf">
          <path d="M92,335 Q88,264 82,206" fill="none" stroke="#6b4d30" strokeWidth="7" strokeLinecap="round" />
          <path d="M82,206 Q54,188 26,194 M82,206 Q56,200 30,214 M82,206 Q58,214 36,234 M82,206 Q110,188 138,194 M82,206 Q108,200 134,214 M82,206 Q106,214 128,234 M82,206 Q78,180 72,158 M82,206 Q88,180 94,158" fill="none" stroke="#448030" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g className="selva-pg">
          <path d="M602,335 Q606,262 612,202" fill="none" stroke="#6b4d30" strokeWidth="7" strokeLinecap="round" />
          <path d="M612,202 Q584,184 556,190 M612,202 Q586,196 560,210 M612,202 Q588,212 566,232 M612,202 Q640,184 668,190 M612,202 Q638,196 664,210 M612,202 Q634,212 656,232 M612,202 Q608,176 602,154 M612,202 Q618,176 624,154" fill="none" stroke="#448030" strokeWidth="6" strokeLinecap="round" />
        </g>

        <path d="M0,335 Q60,319 120,331 Q185,343 250,327 Q315,311 380,329 Q445,345 510,327 Q575,311 640,329 Q662,335 680,327 L680,385 L0,385 Z" fill={hills.front1} />
        <path d="M0,380 Q80,365 160,377 Q260,391 360,373 Q460,357 560,375 Q640,387 680,377 L680,450 L0,450 Z" fill={hills.front2} />

        <g transform="translate(250,290)">
          <path d="M-40,-40 Q0,-30 40,-38" fill="none" stroke="#4a3520" strokeWidth="4" strokeLinecap="round" />
          <path d="M0,-34 Q-4,-20 -2,-6" fill="none" stroke="#7a5430" strokeWidth="4" strokeLinecap="round" />
          <g style={{ transformOrigin: "0px -34px", animation: "selva-monkey 5.5s ease-in-out infinite" }}>
            <path d="M0,-8 Q-5,4 -3,16 Q-1,22 1,16 Q3,4 0,-8 Z" fill="#7a5430" />
            <ellipse cx="0" cy="-14" rx="6" ry="7" fill="#7a5430" />
            <circle cx="0" cy="-12" r="4.5" fill="#c9a878" />
            <circle cx="-5" cy="-16" r="2.5" fill="#7a5430" />
            <circle cx="5" cy="-16" r="2.5" fill="#7a5430" />
            <circle cx="-2" cy="-13" r="0.8" fill="#1a1a1a" />
            <circle cx="2" cy="-13" r="0.8" fill="#1a1a1a" />
            <path d="M-2,-10 Q0,-8 2,-10" fill="none" stroke="#5a3d22" strokeWidth="0.8" />
            <path d="M-5,-8 Q-11,-4 -9,3 M5,-8 Q11,-4 9,3" fill="none" stroke="#7a5430" strokeWidth="3" strokeLinecap="round" />
            <path d="M-3,12 Q-11,17 -14,10" fill="none" stroke="#7a5430" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        <g transform="translate(330,300)" style={{ animation: "selva-bflyA 9s ease-in-out infinite alternate" }}>
          <path d="M0,0 Q-7,-6 -9,0 Q-7,6 0,0" fill="#f0a838" />
          <path d="M0,0 Q7,-6 9,0 Q7,6 0,0" fill="#d85a28" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#4a2810" strokeWidth="0.8" />
        </g>
        <g transform="translate(150,315)" style={{ animation: "selva-bflyB 11s ease-in-out infinite alternate" }}>
          <path d="M0,0 Q-6,-5 -8,0 Q-6,5 0,0" fill="#6b9de8" />
          <path d="M0,0 Q6,-5 8,0 Q6,5 0,0" fill="#4569d0" />
        </g>

        <g className="selva-pf" transform="translate(130,335)">
          <path d="M0,0 Q-2,-24 0,-46" fill="none" stroke="#2d6020" strokeWidth="2.5" />
          <path d="M0,-46 Q-14,-54 -18,-42 Q-16,-30 -4,-26 Q-10,-38 0,-46 Z" fill="#3f8030" />
          <path d="M0,-46 Q14,-56 18,-44 Q17,-32 5,-27 Q11,-39 0,-46 Z" fill="#4a9038" />
        </g>
        <g className="selva-pg" transform="translate(548,335)">
          <path d="M0,0 Q2,-22 0,-42" fill="none" stroke="#2d6020" strokeWidth="2.5" />
          <path d="M0,-42 Q-13,-50 -17,-39 Q-15,-28 -4,-24 Q-9,-36 0,-42 Z" fill="#3f8030" />
          <path d="M0,-42 Q13,-52 17,-40 Q16,-30 5,-25 Q10,-37 0,-42 Z" fill="#4a9038" />
        </g>
      </g>
    </svg>
  );
}
