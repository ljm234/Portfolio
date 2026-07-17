"use client";

/**
 * Detail-page background for ER Stress and Mitochondrial Targeting: the vicuna
 * (Vicugna vicugna), the wild relative of the llama that appears on Peru's coat
 * of arms and bears the finest wool in the world. Rendered as a slender profile
 * silhouette with an upright neck, light chest, and long legs, in the golden
 * puna at dusk with Andean hills behind it.
 *
 * The vicuna sits on the right so the text column never crosses it. The
 * bilingual caption is a self-contained HTML overlay with its own scrim,
 * matching the caption format used across the site.
 */

const CAPTIONS = {
  es: "LA VICUNA: EL ORO DE LOS ANDES",
  en: "THE VICUNA: THE GOLD OF THE ANDES",
};

export default function VicunaBackground({ className = "", isDark = false }) {
  const sky = isDark
    ? { from: "#2e2440", mid: "#3e2e42", to: "#4a3a36" }
    : { from: "#4a3a5e", mid: "#6a4e6a", to: "#8a6a5a" };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="The vicuna in the Andean puna at dusk"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vicSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={sky.from} />
            <stop offset="0.5" stopColor={sky.mid} />
            <stop offset="1" stopColor={sky.to} />
          </linearGradient>
          <linearGradient id="vicHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a4e4a" />
            <stop offset="1" stopColor="#4a3436" />
          </linearGradient>
          <linearGradient id="vicVic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c88a52" />
            <stop offset="1" stopColor="#9a6238" />
          </linearGradient>
        </defs>

        <rect width="800" height="400" fill="url(#vicSky)" />

        {/* dusk sun */}
        <circle cx="640" cy="120" r="55" fill="#e8a860" opacity="0.4" />
        {/* puna hills */}
        <path
          d="M0,240 L200,180 L400,235 L600,170 L800,230 L800,400 L0,400 Z"
          fill="url(#vicHill)"
          opacity="0.5"
        />
        <path d="M0,330 Q400,312 800,335 L800,400 L0,400 Z" fill="#5a4038" opacity="0.5" />

        {/* vicuna, slender profile, right side */}
        <g transform="translate(555,250)" fill="url(#vicVic)">
          <ellipse cx="0" cy="14" rx="62" ry="30" />
          <path d="M40,20 Q58,24 60,38 Q48,44 38,36 Z" fill="#f0e0c8" opacity="0.7" />
          <path d="M42,-6 Q52,-56 48,-96 Q47,-110 58,-114 Q68,-110 66,-96 Q62,-52 58,-2 Z" />
          <path d="M52,-114 Q74,-122 80,-106 Q80,-96 68,-94 Q56,-98 52,-106 Z" />
          <path d="M58,-114 Q56,-130 62,-138 Q68,-130 66,-116 Z" />
          <path d="M70,-110 Q72,-126 78,-132 Q80,-122 76,-110 Z" />
          <path d="M76,-106 Q86,-104 86,-96 Q82,-92 74,-96 Z" />
          <rect x="-44" y="40" width="9" height="72" rx="3" />
          <rect x="-20" y="42" width="9" height="70" rx="3" />
          <rect x="18" y="42" width="9" height="70" rx="3" />
          <rect x="40" y="40" width="9" height="72" rx="3" />
          <path d="M-60,8 Q-74,4 -72,18 Q-66,24 -58,16 Z" />
        </g>
        {/* eye */}
        <circle cx="627" cy="140" r="3" fill="#2e2016" />
        <circle cx="628" cy="139" r="1" fill="#fff" opacity="0.7" />
        {/* ground shadow */}
        <ellipse cx="555" cy="364" rx="70" ry="10" fill="#2a1c1a" opacity="0.2" />
      </svg>

      {/* bilingual caption: HTML overlay with its own scrim, site format */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div
          className="px-4 pb-2 pt-8 text-[10px] leading-[1.6] tracking-wider"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
        >
          <div className="font-medium text-white drop-shadow">{CAPTIONS.es}</div>
          <div style={{ color: "#e8c090" }} className="drop-shadow">{CAPTIONS.en}</div>
        </div>
      </div>
    </div>
  );
}
