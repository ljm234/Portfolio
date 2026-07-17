"use client";

/**
 * Detail-page background for Montenegro-Calla's Medium: the spectacled bear
 * (Tremarctos ornatus), the only bear native to South America and an emblem of
 * the Andean cloud forest. Rendered as a frontal portrait with its
 * characteristic asymmetric cream eye rings, light muzzle, and rounded ears,
 * over a green cloud-forest backdrop with soft light shafts and mist.
 *
 * The bear sits on the right so the text column never crosses it. The
 * bilingual caption is a self-contained HTML overlay with its own scrim,
 * matching the caption format used across the site.
 */

const CAPTIONS = {
  es: "EL OSO DE ANTEOJOS: GUARDIAN DEL BOSQUE NUBLADO",
  en: "THE SPECTACLED BEAR: GUARDIAN OF THE CLOUD FOREST",
};

export default function OsoBackground({ className = "", isDark = false }) {
  const bg = isDark
    ? { from: "#2e4e2e", mid: "#264428", to: "#182e1c" }
    : { from: "#5a8a4e", mid: "#3e6e40", to: "#2a4e30" };

  return (
    <div className={className}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="The spectacled bear, emblem of the Andean cloud forest"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="osoBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={bg.from} />
            <stop offset="0.5" stopColor={bg.mid} />
            <stop offset="1" stopColor={bg.to} />
          </linearGradient>
          <radialGradient id="osoHead" cx="0.42" cy="0.34" r="0.75">
            <stop offset="0" stopColor="#4e4238" />
            <stop offset="0.55" stopColor="#2c2219" />
            <stop offset="1" stopColor="#14100a" />
          </radialGradient>
          <radialGradient id="osoSnout" cx="0.5" cy="0.42" r="0.7">
            <stop offset="0" stopColor="#d0b080" />
            <stop offset="1" stopColor="#8a6a44" />
          </radialGradient>
        </defs>

        <rect width="800" height="400" fill="url(#osoBg)" />

        {/* light shafts through the canopy */}
        <g fill="#e8f0d0" opacity="0.14">
          <path d="M180,0 L270,0 L160,400 L40,400 Z" />
          <path d="M520,0 L590,0 L540,400 L430,400 Z" />
        </g>
        {/* mist */}
        <g fill="#d0e0c8" opacity="0.16">
          <ellipse cx="240" cy="150" rx="200" ry="42" />
          <ellipse cx="620" cy="250" rx="230" ry="52" />
        </g>
        {/* foliage */}
        <g fill="#2a4e30" opacity="0.5">
          <ellipse cx="80" cy="345" rx="64" ry="24" transform="rotate(-15 80 345)" />
          <ellipse cx="130" cy="365" rx="52" ry="20" />
        </g>
        <g fill="#3a6a44" opacity="0.45">
          <circle cx="720" cy="335" r="42" />
          <circle cx="765" cy="365" r="36" />
          <circle cx="60" cy="130" r="30" />
        </g>

        {/* spectacled bear, frontal portrait, right side */}
        <g transform="translate(545,215)">
          <path d="M-130,165 Q-105,58 0,48 Q105,58 130,165 Z" fill="url(#osoHead)" />
          <ellipse cx="0" cy="0" rx="100" ry="94" fill="url(#osoHead)" />
          <circle cx="-74" cy="-68" r="28" fill="url(#osoHead)" />
          <circle cx="74" cy="-68" r="28" fill="url(#osoHead)" />
          <circle cx="-74" cy="-68" r="13" fill="#5a4632" opacity="0.7" />
          <circle cx="74" cy="-68" r="13" fill="#5a4632" opacity="0.7" />
          <ellipse cx="0" cy="40" rx="46" ry="40" fill="url(#osoSnout)" />
          {/* asymmetric cream eye rings, the defining trait */}
          <path d="M-60,-32 Q-68,-64 -30,-62 Q-4,-58 -10,-22 Q-14,6 -48,6 Q-66,2 -60,-32 Z" fill="#ecdcb4" />
          <path d="M60,-30 Q66,-62 34,-60 Q6,-56 14,-20 Q20,8 46,6 Q64,2 60,-30 Z" fill="#ecdcb4" />
          <path d="M-30,-62 Q-18,-76 0,-64 Q-6,-50 -20,-54 Z" fill="#ecdcb4" />
          <path d="M-48,6 Q-40,20 -24,14 Q-30,2 -44,4 Z" fill="#ecdcb4" />
          <circle cx="-38" cy="-28" r="9.5" fill="#100c06" />
          <circle cx="38" cy="-26" r="9.5" fill="#100c06" />
          <circle cx="-35" cy="-31" r="3.2" fill="#ecdcb4" opacity="0.8" />
          <circle cx="41" cy="-29" r="3.2" fill="#ecdcb4" opacity="0.8" />
          <ellipse cx="0" cy="24" rx="17" ry="13" fill="#0a0704" />
          <ellipse cx="-4" cy="19" rx="4.5" ry="3" fill="#4a4038" opacity="0.6" />
          <path d="M0,37 L0,54 M-13,58 Q0,66 13,58" fill="none" stroke="#3a2c1c" strokeWidth="2.5" />
          {/* fur texture */}
          <g stroke="#3a2c1c" strokeWidth="1.5" opacity="0.4" fill="none">
            <path d="M-90,-48 q-10,8 -6,20 M90,-48 q10,8 6,20 M-100,26 q-8,10 0,20 M100,26 q8,10 0,20 M-62,84 q-4,12 4,22 M62,84 q4,12 -4,22" />
          </g>
        </g>
      </svg>

      {/* bilingual caption: HTML overlay with its own scrim, site format */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div
          className="px-4 pb-2 pt-8 text-[10px] leading-[1.6] tracking-wider"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))" }}
        >
          <div className="font-medium text-white drop-shadow">{CAPTIONS.es}</div>
          <div style={{ color: "#d8e8c0" }} className="drop-shadow">{CAPTIONS.en}</div>
        </div>
      </div>
    </div>
  );
}
