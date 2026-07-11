// /src/app/about/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NaymlapBackground from "@/components/effects/NaymlapBackground";

const PANEL_PHOTOS = [
  { src: "/about/Picture%201.jpg", alt: "Jordan Montenegro portrait" },
  { src: "/about/IMG_9933.jpg", alt: "Microscopy and culture work" },
  { src: "/about/IMG_6759.jpg", alt: "Night at the pier" },
];

const TIMELINE = [
  { year: "2016", label: "Peru" },
  { year: "2018", label: "Chile" },
  { year: "2021", label: "USA" },
  { year: "2027", label: "PhD" },
];

export default function AboutPage() {
  const [lightbox, setLightbox] = useState(null); // {src, alt} | null
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <NaymlapBackground className="absolute inset-0 h-full w-full" isDark={isDark} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-2 pb-16 md:pt-3 space-y-8">
        {/* HERO */}
        <section className="pt-4 md:pt-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            About
          </h1>
          <p className="mt-2 max-w-2xl italic text-neutral-800 dark:text-[#ece7d8] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            From Chiclayo to clinical ML: models that know when to say
            {" "}&quot;I don&apos;t know&quot;.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-[280px_1fr] md:items-start">
          {/* SIDE PANEL */}
          <aside className="rounded-2xl border bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-4 md:sticky md:top-24">
            <PanelCarousel photos={PANEL_PHOTOS} onOpen={setLightbox} />

            <div className="mt-3">
              <div className="text-base font-semibold">Jordan Montenegro</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Chiclayo, Peru</div>
            </div>

            <div className="mt-4 border-t pt-4">
              <ol className="relative ml-1 border-l-2 border-neutral-200 dark:border-neutral-800">
                {TIMELINE.map((t) => (
                  <li key={t.year} className="relative mb-4 last:mb-0 pl-4">
                    <span
                      aria-hidden
                      className="absolute -left-[7px] top-1 inline-block h-3 w-3 rounded-full border-2 border-white dark:border-neutral-950 bg-[#d9a441]"
                    />
                    <span className="text-sm font-semibold">{t.year}</span>{" "}
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{t.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <a
              href="/downloads/Jordan-Montenegro-CV.pdf"
              className="mt-4 inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              Download CV (PDF)
            </a>
          </aside>

          {/* STORY */}
          <div className="space-y-6">
            <StoryBlock title="ORIGIN">
              I was born in Peru and started medical school at Universidad San Martin de
              Porres (2016-2018), then served as a missionary in Chile from 2018 to 2020.
              Moving to the United States showed me that people fall through the cracks of
              healthcare systems everywhere, and it turned the question &quot;how do we make
              healthcare reach everyone?&quot; into a personal one.
            </StoryBlock>

            <StoryBlock title="TRAINING">
              Four undergraduate degrees across biology and computing: medical microbiology
              (Weber State, 2025), IT and system administration (Ensign College, 2025),
              software engineering (Ensign College, August 2026, GPA 4.000), and computer
              science (University of the People, December 2026, GPA 3.92). One research paper
              is under review at the Journal of Eukaryotic Microbiology, and I&apos;m
              credentialed on MIMIC-IV. I built Amoebanator (PyTorch, conformal prediction,
              dual-OOD;{" "}
              <a
                className="underline"
                href="https://huggingface.co/spaces/luisjordanmontenegro/amoebanator-25"
                target="_blank"
                rel="noreferrer"
              >
                published on Hugging Face
              </a>
              ) and Kallpa, a bilingual primary care decision support engine in active
              development at kallpahealthcare.com.
            </StoryBlock>

            <StoryBlock title="WHERE I'M HEADED">
              Everything I build points at bilingual healthcare AI for underserved
              populations, anchored in calibrated abstention and clinical ML safety. I&apos;m
              applying to PhD programs that bridge computer science with biomedical
              applications, to help make healthcare reach every person in the world, in their
              own language, with models that know when to say &quot;I don&apos;t know&quot;
              out loud.
            </StoryBlock>

            {/* PHOTOS */}
            <div className="grid gap-6 sm:grid-cols-2">
              <PhotoCard
                src="/about/IMG_8413.jpg"
                alt="Bench work and experimental planning"
                caption="Planning assays and documenting changes at the hood."
                onOpen={setLightbox}
              />
              <PhotoCard
                src="/about/IMG_8156.jpg"
                alt="Graduation day"
                caption="Commencement, grateful and just getting started."
                onOpen={setLightbox}
              />
            </div>

            {/* CTA */}
            <section className="rounded-2xl border bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    Want the technical deep-dive?
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Read the research or ping me for a quick chat.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="/research"
                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                  >
                    View research
                  </a>
                  <a href="/contact" className="rounded-md border px-4 py-2 text-sm font-medium">
                    Contact
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Lightbox
          open={!!lightbox}
          src={lightbox?.src}
          alt={lightbox?.alt}
          onClose={() => setLightbox(null)}
        />
      </div>
    </>
  );
}

/* ---------- helpers ---------- */

function PanelCarousel({ photos, onOpen }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(photos.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        aria-label="Photos, scroll left or right"
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl border [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => onOpen({ src: p.src, alt: p.alt })}
            className="group relative w-full flex-none snap-center cursor-zoom-in"
            aria-label={`Expand: ${p.alt}`}
            title="Click to expand"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={1200}
              height={1200}
              priority={i === 0}
              className="h-56 w-full object-cover"
            />
            <OverlayHint />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollToIndex(active - 1)}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-2.5 py-0.5 text-base font-semibold text-neutral-900 shadow hover:bg-white dark:bg-neutral-900/80 dark:text-white"
      >
        {"\u2039"}
      </button>
      <button
        type="button"
        onClick={() => scrollToIndex(active + 1)}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-2.5 py-0.5 text-base font-semibold text-neutral-900 shadow hover:bg-white dark:bg-neutral-900/80 dark:text-white"
      >
        {"\u203a"}
      </button>
      <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {photos.map((p, i) => (
          <span
            key={p.src}
            className={"h-1.5 w-1.5 rounded-full " + (i === active ? "bg-white" : "bg-white/50")}
          />
        ))}
      </div>
    </div>
  );
}

function StoryBlock({ title, children }) {
  return (
    <section className="rounded-2xl border bg-white/75 dark:bg-neutral-950/55 backdrop-blur-sm p-6">
      <h2 className="text-sm font-bold tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
        {title}
      </h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">{children}</p>
    </section>
  );
}

function PhotoCard({ src, alt, caption, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt })}
      className="group relative overflow-hidden rounded-2xl border cursor-zoom-in bg-white/60 dark:bg-neutral-950/40"
      aria-label={`Expand: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        loading="lazy"
        className="h-64 w-full max-w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left text-sm text-white">
        {caption}
      </figcaption>
      <OverlayHint />
    </button>
  );
}

function OverlayHint() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
  );
}

/* Lightbox: bounded to viewport; close always visible */
function Lightbox({ open, src, alt, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Image preview"}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-[110] rounded-md bg-white/95 px-3 py-1.5 text-sm font-medium text-black shadow hover:bg-white"
        aria-label="Close preview"
      >
        Close
      </button>

      <div className="absolute inset-0 grid place-items-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative max-h-[85vh] max-w-[96vw] overflow-hidden rounded-xl border bg-black/20 shadow-2xl">
          <Image
            src={src}
            alt={alt || ""}
            width={1920}
            height={1280}
            className="h-auto w-auto max-h-[85vh] max-w-[96vw] object-contain select-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
