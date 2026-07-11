// /src/components/effects/MorayBackground.jsx
"use client";

/**
 * Full page background for the Research page: an aerial, oblique view of
 * Moray, the Inca circular agricultural laboratory near Cusco, where crops
 * were tested across the microclimates of concentric sunken terraces. It is
 * the natural metaphor for a research page: an experiment read ring by ring.
 *
 * The main amphitheatre sits at the lower right so it never competes with
 * the page content on the left. A single, consistent sun (upper left) drives
 * every wall shadow (inner-left) and highlight (outer-right), the green
 * deepens toward the humid centre of the funnel, and a soft cloud shadow
 * drifts across. A smaller second muyu sits inside the frame at the upper
 * right, the way the real site has several. Light is a warm dawn; dark is a
 * cool high-Andean daybreak. Motion respects prefers-reduced-motion.
 *
 * Geometry note: the amphitheatre is centred at x=520 with an outer radius
 * of 150, so it spans x in [370, 670], fully inside the 680-wide viewport,
 * and the second muyu is centred at x=610 with radius <= 46 so it also stays
 * within the frame.
 */

const CAPTIONS = {
  light: {
    es: "MORAY DESDE EL CIELO: LOS ANILLOS DEL EXPERIMENTO INCA, CUSCO",
    en: "MORAY FROM ABOVE: THE RINGS OF THE INCA EXPERIMENT, CUSCO",
    esColor: "#8a7a54",
    enColor: "#a4946c",
  },
  dark: {
    es: "MORAY DESDE EL CIELO: LOS ANILLOS DEL EXPERIMENTO INCA, CUSCO",
    en: "MORAY FROM ABOVE: THE RINGS OF THE INCA EXPERIMENT, CUSCO",
    esColor: "#7c8470",
    enColor: "#5e6656",
  },
};

/* One concentric terrace: stone-wall ring, planted top, inner-left shadow,
   outer-right highlight, plus a couple of tonal grass patches. */
function Terrace({ rx, ry, wall, top, patches = [] }) {
  return (
    <g>
      <ellipse rx={rx} ry={ry} fill={wall} />
      <ellipse rx={rx * 0.92} ry={ry * 0.9} fill={top} />
      {patches.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={p.fill} opacity="0.7" />
      ))}
      <path
        d={`M${-rx},0 A${rx},${ry} 0 0 1 ${-rx * 0.16},${-ry * 0.98}`}
        fill="none"
        stroke="#4a4230"
        strokeWidth="6"
        opacity="0.2"
      />
      <path
        d={`M${rx},0 A${rx},${ry} 0 0 0 ${rx * 0.22},${ry * 0.96}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        opacity="0.14"
      />
    </g>
  );
}

export default function MorayBackground({ className = "", isDark = false }) {
  const mode = isDark ? "dark" : "light";
  const caption = CAPTIONS[mode];

  // Palettes: warm dawn (light) vs cool daybreak (dark).
  const P = isDark
    ? {
        skyTop: "#20262e",
        skyBot: "#2c3038",
        mesa: "#3a4038",
        mist: "#c8d0d4",
        walls: ["#5a5648", "#565244", "#524e40", "#4e4a3c", "#4a4638", "#464234"],
        tops: ["#5c6a4e", "#586648", "#546244", "#4e5c3e", "#485636", "#425030"],
        core: "#38442a",
        stair: "#6a6250",
        birds: "#7a8270",
      }
    : {
        skyTop: "#f4f2ea",
        skyBot: "#e9e2d0",
        mesa: "#cfc08e",
        mist: "#ffffff",
        walls: ["#c9ba92", "#cfc0a0", "#c6b694", "#bcac86", "#b0a078", "#a89468"],
        tops: ["#b2ba72", "#9cb066", "#84a058", "#6f9450", "#5a8846", "#4a7a3e"],
        core: "#4a7a3e",
        stair: "#8a7850",
        birds: "#8a927e",
      };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 680 300"
        preserveAspectRatio="xMaxYMax slice"
        role="img"
        aria-label="Aerial view of the circular Inca terraces of Moray"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes mr-cloud { 0% { transform: translateX(-200px); } 100% { transform: translateX(430px); } }
          @keyframes mr-mist { 0%,100% { transform: translateX(0); opacity: 0.4; } 50% { transform: translateX(16px); opacity: 0.6; } }
          @keyframes mr-bird { 0% { transform: translate(-40px,6px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(760px,-16px); opacity: 0; } }
          @media (prefers-reduced-motion: reduce) {
            .mr-anim, .mr-anim * { animation: none !important; }
          }
        `}</style>

        <defs>
          <linearGradient id="mrSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={P.skyTop} />
            <stop offset="1" stopColor={P.skyBot} />
          </linearGradient>
          <clipPath id="mrFrame">
            <rect x="0" y="0" width="680" height="300" />
          </clipPath>
        </defs>

        <g clipPath="url(#mrFrame)" className="mr-anim">
          <rect width="680" height="300" fill="url(#mrSky)" />

          {/* Distant terraced plots / mesa, upper right */}
          <g opacity={isDark ? "0.3" : "0.4"}>
            <path d="M320,112 L430,98 L478,120 L392,134 Z" fill={P.mesa} />
            <path d="M478,120 L560,106 L616,122 L544,138 Z" fill={P.tops[1]} opacity="0.7" />
            <path d="M392,134 L478,120 L544,138 L452,154 Z" fill={P.mesa} opacity="0.8" />
          </g>

          {/* Valley mist band */}
          <ellipse
            cx="450"
            cy="118"
            rx="180"
            ry="12"
            fill={P.mist}
            opacity="0.5"
            style={{ animation: "mr-mist 18s ease-in-out infinite" }}
          />

          {/* Bird */}
          <g style={{ animation: "mr-bird 36s linear infinite" }}>
            <path d="M0,58 Q-6,53 -11,57 M0,58 Q6,53 11,57" stroke={P.birds} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Second, smaller muyu (upper right, inside frame) */}
          <g transform="translate(610,96) scale(0.3)" opacity={isDark ? "0.5" : "0.55"}>
            <ellipse rx="150" ry="72" fill={P.walls[0]} />
            <ellipse rx="118" ry="55" fill={P.tops[1]} />
            <ellipse rx="86" ry="40" fill={P.walls[2]} />
            <ellipse rx="58" ry="27" fill={P.tops[3]} />
            <ellipse rx="32" ry="15" fill={P.tops[5]} />
          </g>

          {/* Main amphitheatre, lower right, centred at x=520 (spans 370..670) */}
          <g transform="translate(520,192)">
            <Terrace
              rx={150}
              ry={72}
              wall={P.walls[0]}
              top={P.tops[0]}
              patches={[
                { x: 34, y: -18, rx: 16, ry: 6, fill: P.tops[0] },
                { x: -54, y: 24, rx: 13, ry: 5, fill: P.tops[1] },
                { x: 92, y: 18, rx: 11, ry: 4.5, fill: P.tops[0] },
              ]}
            />
            <Terrace
              rx={116}
              ry={54}
              wall={P.walls[1]}
              top={P.tops[1]}
              patches={[
                { x: -26, y: -14, rx: 14, ry: 5.5, fill: P.tops[1] },
                { x: 50, y: 16, rx: 12, ry: 5, fill: P.tops[2] },
              ]}
            />
            <Terrace
              rx={85}
              ry={39}
              wall={P.walls[2]}
              top={P.tops[2]}
              patches={[
                { x: 18, y: -10, rx: 11, ry: 4.5, fill: P.tops[2] },
                { x: -36, y: 12, rx: 10, ry: 4, fill: P.tops[3] },
              ]}
            />
            <Terrace
              rx={57}
              ry={26}
              wall={P.walls[3]}
              top={P.tops[3]}
              patches={[{ x: -12, y: -6, rx: 8, ry: 3.2, fill: P.tops[3] }]}
            />
            <Terrace rx={32} ry={14} wall={P.walls[4]} top={P.tops[4]} />
            <ellipse rx="12" ry="5" fill={P.core} />
            <ellipse cx="2" cy="1.2" rx="8" ry="3" fill={P.core} opacity="0.85" />

            {/* Two radial stairways (cantilevered-stone dots) */}
            <g stroke={P.stair} strokeWidth="2.2" opacity="0.9">
              <line x1="0" y1="-72" x2="0" y2="-5" />
              <line x1="-104" y1="50" x2="-8" y2="3.8" />
            </g>
            <g fill={P.stair} opacity="0.9">
              <circle cx="0" cy="-64" r="1.1" />
              <circle cx="0" cy="-50" r="1.1" />
              <circle cx="0" cy="-37" r="1.1" />
              <circle cx="0" cy="-24" r="1.1" />
              <circle cx="0" cy="-12" r="1.1" />
              <circle cx="-92" cy="44" r="1.1" />
              <circle cx="-70" cy="34" r="1.1" />
              <circle cx="-50" cy="25" r="1.1" />
              <circle cx="-31" cy="15" r="1.1" />
              <circle cx="-16" cy="8" r="1.1" />
            </g>

            {/* Organic cloud shadow drifting across the bowl */}
            <path
              d="M-60,-96 Q-20,-108 30,-100 Q70,-94 84,-78 Q60,-86 20,-88 Q-24,-90 -60,-80 Z"
              fill="#242e1c"
              opacity={isDark ? "0.1" : "0.13"}
              style={{ animation: "mr-cloud 28s linear infinite" }}
            />
          </g>

          {/* Access path toward the terraces */}
          <path
            d="M372,192 Q404,160 444,146"
            fill="none"
            stroke={P.stair}
            strokeWidth="2.4"
            opacity="0.5"
            strokeDasharray="1 6"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 md:bottom-5 md:left-6 select-none">
        <p className="text-[9px] md:text-[10px] tracking-[0.12em]" style={{ color: caption.esColor }}>
          {caption.es}
        </p>
        <p className="mt-0.5 text-[9px] md:text-[10px] tracking-[0.12em]" style={{ color: caption.enColor }}>
          {caption.en}
        </p>
      </div>
    </div>
  );
}
