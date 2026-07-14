// src/app/contact/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------- Page ---------------- */

export default function Contact() {
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ok" | "error"
  const [err, setErr] = useState("");
  const msgRef = useRef(null);

  // Auto-resize message textarea
  useEffect(() => {
    const el = msgRef.current;
    if (!el) return;
    const fit = () => {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 400) + "px";
    };
    fit();
    el.addEventListener("input", fit);
    return () => el.removeEventListener("input", fit);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setStatus("loading");

    const form = new FormData(e.currentTarget);

    // Honeypot (bots only)
    if ((form.get("company") || "").toString().trim()) {
      setStatus("ok");
      return;
    }

    const payload = {
      name: (form.get("name") || "").toString().trim(),
      email: (form.get("email") || "").toString().trim(),
      message: (form.get("message") || "").toString().trim(),
    };

    // Basic client validation
    if (payload.name.length < 2) {
      setStatus("idle");
      setErr("Please enter your full name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      setStatus("idle");
      setErr("Please enter a valid email address.");
      return;
    }
    if (payload.message.length < 10) {
      setStatus("idle");
      setErr("A little more detail would help - 10+ characters please.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("ok");
    } catch {
      setStatus("error");
      setErr("Something went wrong. Mind trying again in a minute?");
    }
  }

  return (
    <div className="relative min-h-[80vh]">
      {/* Animated beach background with click splashes */}
      <BeachFX />

      {/* Foreground content on the About template */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-2 pb-16 md:pt-3 space-y-8">
        {/* Hero on the About template, verbatim classes. The beach below has a
            night variant so the cream dark-mode text stays readable. */}
        <section className="pt-4 md:pt-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Contact
          </h1>
          <p className="mt-2 max-w-2xl italic text-neutral-800 dark:text-[#ece7d8] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            Let&apos;s talk. A short note with a clear goal helps me reply faster.
          </p>
        </section>

        <section
          className="mx-auto w-full max-w-3xl animate-fadeUp rounded-3xl border bg-white/70 p-6 shadow-xl backdrop-blur-md dark:bg-neutral-950/60 md:p-10"
          aria-live="polite"
        >
          {/* Form / Success */}
          {status === "ok" ? (
            <SuccessCard />
          ) : (
            <form onSubmit={submit} className="mx-auto max-w-xl space-y-4">
              {/* name + email grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* message */}
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  ref={msgRef}
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="What do you want to build, measure, or fix?"
                  className="w-full resize-none rounded-xl border px-3 py-2 leading-relaxed outline-none ring-emerald-400/50 focus:ring-2 dark:bg-transparent"
                />
                <div className="mt-1 text-xs text-neutral-500">
                  No spam; not stored on this server permanently.
                </div>
              </div>

              {/* Honeypot */}
              <div className="hidden">
                <input name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Actions (stack on mobile to avoid overflow) */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="mailto:jordanmontenegroc.99@gmail.com"
                  className="max-w-full break-words text-sm underline opacity-80 hover:opacity-100"
                >
                  Prefer email? jordanmontenegroc.99@gmail.com
                </a>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative inline-flex items-center gap-2 self-end rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70 sm:self-auto"
                >
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-400/0 via-sky-400/0 to-indigo-400/0 opacity-0 blur transition group-hover:opacity-40" />
                  {status === "loading" ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="-ml-0.5"
                      >
                        <path d="M22 2L11 13" />
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      Send
                    </>
                  )}
                </button>
              </div>

              {/* Error note */}
              {err && (
                <p className="text-sm text-rose-600 dark:text-rose-400">{err}</p>
              )}
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------------- UI bits ---------------- */

function Field({ label, name, type = "text", autoComplete, required }) {
  const id = `f-${name}`;
  return (
    <div className="block">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border px-3 py-2 outline-none ring-emerald-400/50 focus:ring-2 dark:bg-transparent"
      />
    </div>
  );
}

function Label(props) {
  return (
    <label
      {...props}
      className={
        "mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500 " +
        (props.className || "")
      }
    />
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}

function SuccessCard() {
  return (
    <div className="mx-auto mt-6 max-w-xl rounded-2xl border p-6 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="mt-3 text-lg font-semibold">Thanks - got it!</h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-neutral-700 dark:text-neutral-300">
        I’ll reply shortly. If it’s urgent, email{" "}
        <a
          className="underline"
          href="mailto:jordanmontenegroc.99@gmail.com"
        >
          jordanmontenegroc.99@gmail.com
        </a>
        .
      </p>
      <a
        href="/"
        className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
      >
        Back to home
      </a>
    </div>
  );
}

/* ---------------- Animated beach background (with water splash) ---------------- */

function BeachFX() {
  const hostRef = useRef(null);

  // Create splash ring + multiple droplets
  const splashAt = (x, y) => {
    const host = hostRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const px = x - rect.left;
    const py = y - rect.top;

    // ring
    const ring = document.createElement("span");
    ring.className = "splash-ring";
    ring.style.left = `${px}px`;
    ring.style.top = `${py}px`;
    host.appendChild(ring);
    ring.addEventListener("animationend", () => ring.remove(), { once: true });

    // droplets
    const COUNT = 12;
    for (let i = 0; i < COUNT; i++) {
      const drop = document.createElement("span");
      drop.className = "drop";
      drop.style.left = `${px}px`;
      drop.style.top = `${py}px`;

      // Randomized arc (soft fountain upward then back down)
      const dx = (Math.random() * 140 - 70) | 0; // -70..70 px
      const peak = -(60 + Math.random() * 60) | 0; // -60..-120 px (up)
      const dy = 30 + Math.random() * 80; // 30..110 px (down)
      const size = 4 + Math.random() * 4; // 4..8 px

      drop.style.setProperty("--dx", `${dx}px`);
      drop.style.setProperty("--peak", `${peak}px`);
      drop.style.setProperty("--dy", `${dy}px`);
      drop.style.setProperty("--size", `${size}px`);
      drop.style.setProperty("--time", `${600 + Math.random() * 500}ms`);

      host.appendChild(drop);
      drop.addEventListener("animationend", () => drop.remove(), { once: true });
    }

    // tiny mist
    const MIST = 16;
    for (let i = 0; i < MIST; i++) {
      const dot = document.createElement("span");
      dot.className = "mist";
      dot.style.left = `${px}px`;
      dot.style.top = `${py}px`;

      const dx = (Math.random() * 90 - 45) | 0;
      const dy = (Math.random() * -40) | 0;
      const life = 350 + Math.random() * 250;
      dot.style.setProperty("--dx", `${dx}px`);
      dot.style.setProperty("--dy", `${dy}px`);
      dot.style.setProperty("--time", `${life}ms`);

      host.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove(), { once: true });
    }
  };

  // Works for mouse + touch
  const onPointerDown = (e) => {
    if (e.touches && e.touches.length) {
      for (const t of e.touches) splashAt(t.clientX, t.clientY);
    } else {
      splashAt(e.clientX, e.clientY);
    }
  };

  return (
    <>
      <div
        ref={hostRef}
        className="fixed inset-0 z-0 overflow-hidden"
        onPointerDown={onPointerDown}
      >
        <div className="sky absolute inset-0" />
        <div className="sun absolute" />
        <div className="ocean absolute left-0 right-0" />
        <div className="wave wave1 absolute left-[-20vw] right-[-20vw]" />
        <div className="wave wave2 absolute left-[-20vw] right-[-20vw]" />
        <div className="shore absolute bottom-0 left-0 right-0" />
        <div className="birds absolute left-0 right-0">
          <span className="bird b1" />
          <span className="bird b2" />
          <span className="bird b3" />
        </div>

        {/* The long Pimentel pier reaching toward the horizon (anchored bottom-right) */}
        <svg
          className="pier pointer-events-none absolute"
          viewBox="0 0 720 300"
          preserveAspectRatio="xMaxYMax meet"
          aria-hidden="true"
        >
          <path d="M40,232 L676,52 L706,52 L86,238 Z" fill="#a5824a" stroke="#8a6a3a" strokeWidth="1" />
          <path d="M58,230 L682,54 M74,234 L694,53" stroke="#8a6a3a" strokeWidth="0.9" opacity="0.6" />
          <g stroke="#6e5636" strokeWidth="3">
            <line x1="100" y1="233" x2="100" y2="262" />
            <line x1="160" y1="216" x2="160" y2="243" />
          </g>
          <g stroke="#6e5636" strokeWidth="2.5">
            <line x1="222" y1="199" x2="222" y2="224" />
            <line x1="282" y1="182" x2="282" y2="205" />
          </g>
          <g stroke="#6e5636" strokeWidth="2">
            <line x1="340" y1="166" x2="340" y2="187" />
            <line x1="396" y1="150" x2="396" y2="169" />
          </g>
          <g stroke="#6e5636" strokeWidth="1.6">
            <line x1="450" y1="135" x2="450" y2="152" />
            <line x1="500" y1="121" x2="500" y2="136" />
          </g>
          <g stroke="#6e5636" strokeWidth="1.3">
            <line x1="548" y1="107" x2="548" y2="120" />
            <line x1="592" y1="95" x2="592" y2="106" />
          </g>
          <g stroke="#6e5636" strokeWidth="1">
            <line x1="632" y1="84" x2="632" y2="93" />
            <line x1="666" y1="74" x2="666" y2="81" />
          </g>
          <path d="M52,226 L672,50" fill="none" stroke="#7a5a2a" strokeWidth="1.3" />
          <rect x="680" y="40" width="22" height="12" fill="#8a6a3a" />
          <path d="M676,40 L708,40 L699,32 L685,32 Z" fill="#6e5636" />
          <line x1="674" y1="52" x2="674" y2="30" stroke="#5a4a34" strokeWidth="1.4" />
          <circle className="pier-light" cx="674" cy="27" r="3" fill="#ffd98a" />
          <g fill="#5a4a3a">
            <ellipse cx="300" cy="160" rx="2.6" ry="4.4" />
            <circle cx="300" cy="154" r="1.8" />
          </g>
          <g fill="#6a5a48">
            <ellipse cx="352" cy="146" rx="2.2" ry="3.8" />
            <circle cx="352" cy="141" r="1.5" />
          </g>
          <g fill="#c9a860" opacity="0.85">
            <ellipse cx="34" cy="262" rx="3.4" ry="5" />
            <ellipse cx="52" cy="252" rx="3.2" ry="4.7" />
            <ellipse cx="70" cy="244" rx="3" ry="4.4" />
          </g>
        </svg>

        {/* Sand keepsakes: the spondylus, a scuttling crab, stones and kelp */}
        <svg className="spondylus pointer-events-none absolute" viewBox="0 0 30 30" aria-hidden="true">
          <path d="M15,3 Q26,6 28,17 Q26,27 15,28 Q4,27 2,17 Q4,6 15,3 Z" fill="#d96a5a" />
          <g stroke="#b64a3e" strokeWidth="1">
            <path d="M15,3 L15,28 M9,5 L6,25 M21,5 L24,25" />
          </g>
          <g fill="#f2c4b0">
            <circle cx="5" cy="13" r="1.3" />
            <circle cx="25" cy="13" r="1.3" />
            <circle cx="7" cy="23" r="1.3" />
            <circle cx="23" cy="23" r="1.3" />
            <circle cx="15" cy="2" r="1.4" />
          </g>
        </svg>
        <svg className="crab pointer-events-none absolute" viewBox="0 0 30 20" aria-hidden="true">
          <ellipse cx="15" cy="12" rx="7" ry="4.4" fill="#d97a4e" />
          <circle cx="12.4" cy="7" r="1.4" fill="#22221f" />
          <circle cx="17.6" cy="7" r="1.4" fill="#22221f" />
          <path d="M8,14 L3,17 M9,16 L5,19 M22,14 L27,17 M21,16 L25,19" stroke="#c96a40" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8,9 Q3,5 5,2 M22,9 Q27,5 25,2" stroke="#c96a40" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
        <svg className="stones pointer-events-none absolute" viewBox="0 0 40 16" aria-hidden="true">
          <ellipse cx="14" cy="9" rx="10" ry="5" fill="#b0a488" />
          <ellipse cx="30" cy="11" rx="7" ry="3.6" fill="#c2b696" />
        </svg>
        <svg className="alga pointer-events-none absolute" viewBox="0 0 24 26" aria-hidden="true">
          <path d="M8,24 q6,-10 2,-18 q8,6 6,16 q6,-6 8,-2 q-8,4 -8,8" fill="none" stroke="#6f8a48" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Caption scrim + bilingual caption: Spanish above, English below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute bottom-4 left-4 md:bottom-5 md:left-6 select-none">
          <p className="cap-es">EL LARGO MUELLE DE PIMENTEL Y EL SPONDYLUS: CHICLAYO, LA CIUDAD DONDE NACI</p>
          <p className="cap-en">THE LONG PIMENTEL PIER AND THE SPONDYLUS: CHICLAYO, THE CITY WHERE I WAS BORN</p>
        </div>
      </div>

      <style>{`
        :root { --horizon: 60vh; }

        /* Subtle motion + accent palette */
        .sky { background: linear-gradient(180deg,#cfe9fb 0%,#f3f8ff 48%,#cfe9fb 100%); }
        .sun {
          left: 50%; top: 12vh; width: 34vmin; height: 34vmin; transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle at 50% 55%, #ffeaa7 0%, #ffdf86 28%, rgba(255,255,255,0) 62%);
          filter: blur(10px); opacity: .75; animation: sunPulse 8s ease-in-out infinite;
        }
        @keyframes sunPulse { 0%,100%{ transform: translateX(-50%) scale(1)} 50%{ transform: translateX(-50%) scale(1.03)} }

        .ocean {
          top: var(--horizon); height: 40vh;
          background: linear-gradient(180deg, rgba(78,176,201,.55) 0%, rgba(64,165,195,.72) 30%, #0ea5e9 70%, #0b79b2 100%);
          mask-image: linear-gradient(to top, #000 75%, rgba(0,0,0,.5) 92%, transparent 100%);
        }

        .wave {
          height: 22vh; opacity: .65; mix-blend-mode: screen;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.85), transparent 90%);
          pointer-events: none;
        }
        .wave1 {
          top: calc(var(--horizon) - 1rem);
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='90' viewBox='0 0 240 90'><path d='M0 55 Q30 35 60 55 T120 55 T180 55 T240 55 V90 H0Z' fill='rgba(255,255,255,.60)'/></svg>");
          background-size: 240px 90px; background-repeat: repeat-x;
          animation: waveX 9s linear infinite, bob 6s ease-in-out infinite;
        }
        .wave2 {
          top: calc(var(--horizon) - .6rem); opacity:.5;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='110' viewBox='0 0 300 110'><path d='M0 60 Q37 40 75 60 T150 60 T225 60 T300 60 V110 H0Z' fill='rgba(255,255,255,.45)'/></svg>");
          background-size: 300px 110px; background-repeat: repeat-x;
          animation: waveX2 12s linear infinite, bob 8s ease-in-out infinite; filter: blur(.3px);
        }
        @keyframes waveX  { 0%{background-position:0 0} 100%{background-position:800px 0} }
        @keyframes waveX2 { 0%{background-position:0 0} 100%{background-position:-900px 0} }
        @keyframes bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

        .shore {
          height: 22vh;
          background:
            linear-gradient(180deg,#f6e4bd 0%,#efd3a1 55%,#e6bf86 100%),
            radial-gradient(60vmin 40vmin at 40% -6%, rgba(255,255,255,.7), rgba(255,255,255,0) 60%);
          box-shadow: inset 0 10px 28px rgba(255,255,255,.85);
        }

        .birds { top: 10vh; height: 34vh; pointer-events: none; }
        .bird {
          position:absolute; width:28px; height:14px; opacity:.55;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='14' viewBox='0 0 28 14'><path d='M1 9 Q8 1 14 7 Q20 1 27 9' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/></svg>");
          animation: fly linear infinite; filter: drop-shadow(0 1px 1px rgba(0,0,0,.1));
        }
        .b1{ top:6vh;  left:-15%; animation-duration:26s; }
        .b2{ top:11vh; left:-18%; animation-duration:22s; animation-delay:-5s; transform:scale(.9) }
        .b3{ top:15vh; left:-12%; animation-duration:28s; animation-delay:-9s; transform:scale(1.1); opacity:.45 }
        @keyframes fly { 0%{transform:translateX(0)} 100%{transform:translateX(130vw)} }

        /* --- Pimentel shore layers --- */
        .pier { right: 0; bottom: 13vh; height: 31vh; width: min(48vw, 740px); }
        .pier-light { animation: pierLight 4s ease-in-out infinite; }
        @keyframes pierLight { 0%,100%{ opacity:.75 } 50%{ opacity:1 } }
        .spondylus { left: 9%; bottom: 6.5vh; width: 46px; height: 46px; }
        .crab { left: 21%; bottom: 4vh; width: 40px; height: 27px; animation: crabWalk 4.5s ease-in-out infinite; }
        @keyframes crabWalk { 0%,100%{ transform: translateX(0) } 25%{ transform: translateX(10px) } 75%{ transform: translateX(-8px) } }
        .stones { left: 33%; bottom: 3.2vh; width: 56px; height: 22px; }
        .alga { left: 4%; bottom: 11vh; width: 30px; height: 32px; }
        .cap-es, .cap-en { font-size: 10px; letter-spacing: .12em; text-shadow: 0 1px 2px rgba(0,0,0,.4); }
        .cap-es { color: #ffffff; }
        .cap-en { color: #e2d4b8; margin-top: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .pier-light, .crab { animation: none; }
        }

        /* --- Night over Pimentel (dark mode): same beach, after sundown --- */
        .dark .sky { background: linear-gradient(180deg,#16213a 0%,#1e2c46 55%,#233450 100%); }
        .dark .sun {
          background: radial-gradient(circle at 50% 50%, #e8eef4 0%, #c8d6e4 26%, rgba(255,255,255,0) 60%);
          opacity: .7; filter: blur(6px);
        }
        .dark .ocean {
          background: linear-gradient(180deg, rgba(26,58,84,.55) 0%, rgba(18,44,66,.75) 30%, #0e3450 70%, #0a2438 100%);
        }
        .dark .wave { opacity: .22; }
        .dark .shore {
          background:
            linear-gradient(180deg,#8a795c 0%,#6e5f46 55%,#57492f 100%),
            radial-gradient(60vmin 40vmin at 40% -6%, rgba(255,255,255,.18), rgba(255,255,255,0) 60%);
          box-shadow: inset 0 10px 28px rgba(255,255,255,.14);
        }
        .dark .bird { opacity: .18; }
        .dark .pier, .dark .spondylus, .dark .crab, .dark .stones, .dark .alga {
          filter: brightness(.55) saturate(.85);
        }
        .dark .pier-light { filter: none; }

        /* --- Splash effects --- */

        /* Expanding ring on the surface */
        .splash-ring {
          position:absolute; z-index:50;
          width:8px; height:8px; border-radius:9999px;
          border:2px solid rgba(255,255,255,.95);
          transform:translate(-50%,-50%) scale(1);
          mix-blend-mode: screen; pointer-events:none;
          animation: ring .9s ease-out forwards;
        }
        @keyframes ring {
          0%  { opacity:.9;  transform:translate(-50%,-50%) scale(1) }
          70% { opacity:.35; transform:translate(-50%,-50%) scale(22) }
          100%{ opacity:0;   transform:translate(-50%,-50%) scale(26) }
        }

        /* Water droplets that arc out then fall back down */
        .drop {
          position:absolute; z-index:51;
          width:var(--size,6px); height:var(--size,6px); border-radius:9999px;
          background: radial-gradient(circle,#e6f7ff 10%, #7dd3fc 60%, rgba(255,255,255,.2) 100%);
          filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
          transform: translate(-50%,-50%);
          animation: dropletPath var(--time,900ms) ease-out forwards;
          mix-blend-mode: screen; pointer-events:none;
        }
        /* approximate parabola via a mid "peak" keyframe */
        @keyframes dropletPath {
          0%   { opacity:.95; transform: translate(-50%,-50%) translate(0,0)    scale(1); }
          45%  { opacity:1;   transform: translate(-50%,-50%) translate(calc(var(--dx) * .5), var(--peak)); }
          100% { opacity:0;   transform: translate(-50%,-50%) translate(var(--dx), var(--dy))  scale(.9); }
        }

        /* Fine mist for extra realism */
        .mist {
          position:absolute; z-index:50;
          width:2px; height:2px; border-radius:9999px;
          background: rgba(255,255,255,.9);
          transform: translate(-50%,-50%);
          animation: mistFly var(--time,450ms) ease-out forwards;
          mix-blend-mode: screen; pointer-events:none;
          filter: blur(.2px);
        }
        @keyframes mistFly {
          0%   { opacity:.9; transform: translate(-50%,-50%) translate(0,0) }
          100% { opacity:0;  transform: translate(-50%,-50%) translate(var(--dx), var(--dy)) }
        }

        /* Card entrance */
        .animate-fadeUp { animation: fadeUp 700ms cubic-bezier(.22,.61,.36,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </>
  );
}
