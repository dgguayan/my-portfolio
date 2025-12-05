"use client";

import React, { useEffect, useState, useMemo } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetail from './components/ProjectDetail';
import Experience from './components/Experience';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Use useMemo with a stable seed to generate consistent stars
  const stars = useMemo(() => {
    const genBinary = (n: number, seed: number) =>
      Array.from({ length: n }).map((_, i) => {
        // Simple seeded random using index
        const x = Math.sin(seed + i) * 10000;
        const left = (x - Math.floor(x)) * 100;
        const y = Math.sin(seed + i + 1) * 10000;
        const top = (y - Math.floor(y)) * 120;
        const z = Math.sin(seed + i + 2) * 10000;
        const char = (z - Math.floor(z)) < 0.5 ? "0" : "1";
        return { left, top, char };
      });

    return {
      small: genBinary(700, 1),
      medium: genBinary(200, 2),
      big: genBinary(100, 3)
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const starCss = `
    :root { --star-bg-gradient: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%); }

    .stars-bg {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      background: var(--star-bg-gradient);
      pointer-events: none;
    }

    .stars-layer { position: absolute; inset: 0; overflow: hidden; }

    .layer-inner { position: absolute; inset: 0; }
    .layer-copy { position: absolute; inset: 0; }

    .binary {
      position: absolute;
      color: rgba(255,255,255,0.9);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace;
      user-select: none;
      pointer-events: none;
      line-height: 1;
      transform-origin: center;
      white-space: pre;
    }
    .binary.small { font-size: var(--binary-size-small, 10px); opacity: 0.55; }
    .binary.medium { font-size: var(--binary-size-medium, 12px); opacity: 0.7; }
    .binary.big { font-size: var(--binary-size-big, 14px); opacity: 0.95; }

    @keyframes moveSmall { from { transform: translateY(0%); } to { transform: translateY(-100%); } }
    @keyframes moveMedium { from { transform: translateY(0%); } to { transform: translateY(-100%); } }
    @keyframes moveBig { from { transform: translateY(0%); } to { transform: translateY(-100%); } }

    .layer-inner.small { animation: moveSmall 50s linear infinite; }
    .layer-inner.medium { animation: moveMedium 100s linear infinite; }
    .layer-inner.big { animation: moveBig 150s linear infinite; }
  `;

  return (
    <main>
      <Cursor />
      
      {/* injected binary-star background (behind everything) - only render on client */}
      {isClient && (
        <div className="stars-bg" aria-hidden="true">
          <div className="stars-layer" id="stars">
            <div className="layer-inner small">
              <div className="layer-copy">
                {stars.small.map((s, i) => (
                  <span key={`s-a-${i}`} className="binary small" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
              <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
                {stars.small.map((s, i) => (
                  <span key={`s-b-${i}`} className="binary small" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="stars-layer" id="stars2">
            <div className="layer-inner medium">
              <div className="layer-copy">
                {stars.medium.map((s, i) => (
                  <span key={`m-a-${i}`} className="binary medium" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
              <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
                {stars.medium.map((s, i) => (
                  <span key={`m-b-${i}`} className="binary medium" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="stars-layer" id="stars3">
            <div className="layer-inner big">
              <div className="layer-copy">
                {stars.big.map((s, i) => (
                  <span key={`b-a-${i}`} className="binary big" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
              <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
                {stars.big.map((s, i) => (
                  <span key={`b-b-${i}`} className="binary big" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Always render the background div to avoid layout shift */}
      {!isClient && <div className="stars-bg" aria-hidden="true" />}

      {/* inject generated CSS */}
      <style dangerouslySetInnerHTML={{ __html: starCss }} />

      <Header />

      {/* wrap major sections so they animate on scroll */}
      <div data-animate data-delay="100" suppressHydrationWarning>
        <Hero />
      </div>

      <div data-animate data-delay="120" suppressHydrationWarning>
        <ProjectsGrid />
      </div>

      <div data-animate data-delay="160" suppressHydrationWarning>
        <TechStack />
      </div>

      <div data-animate data-delay="200" suppressHydrationWarning>
        <ProjectDetail />
      </div>

      <div data-animate data-delay="240" suppressHydrationWarning>
        <Experience />
      </div>

      <div data-animate data-delay="280" suppressHydrationWarning>
        <Contact />
      </div>

      <BackToTop />

      {/* animation styles for scroll-in (added left/right slide rules + fade) */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* initial hidden state for animated elements: invisible, slightly offset and softly blurred */
        [data-animate] { 
          opacity: 0;
          transform: translateY(18px) scale(0.995) translateZ(0);
          filter: blur(4px);
          will-change: transform, opacity, filter;
          transition:
            opacity 700ms cubic-bezier(.16,.84,.24,1),
            transform 700ms cubic-bezier(.16,.84,.24,1),
            filter 700ms cubic-bezier(.16,.84,.24,1);
        }

        [data-animate][data-animate-side="left"] {
          transform: translateX(-28px) translateY(8px) scale(0.995) translateZ(0);
        }
        [data-animate][data-animate-side="right"] {
          transform: translateX(28px) translateY(8px) scale(0.995) translateZ(0);
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) scale(1) translateZ(0) !important;
          filter: blur(0) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-animate], .animate-in { transition: none !important; transform: none !important; opacity: 1 !important; filter: none !important; }
        }
      ` }} />

      {/* tiny inline script: observe [data-animate] and toggle .animate-in when in view (repeatable) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            if (typeof window === 'undefined') return;
            try {
              const nodes = Array.from(document.querySelectorAll('[data-animate]'));
              if (!nodes.length) return;

              const timers = new WeakMap();

              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  const el = entry.target;
                  const raw = el.getAttribute('data-delay');
                  const delay = raw ? parseInt(raw, 10) : 0;

                  if (entry.isIntersecting) {
                    const prev = timers.get(el);
                    if (prev) { clearTimeout(prev); timers.delete(el); }

                    const id = window.setTimeout(() => {
                      el.classList.add('animate-in');
                      timers.delete(el);
                    }, Math.max(0, delay));
                    timers.set(el, id);
                  } else {
                    const prev = timers.get(el);
                    if (prev) { clearTimeout(prev); timers.delete(el); }
                    el.classList.remove('animate-in');
                  }
                });
              }, { threshold: 0.12 });

              nodes.forEach(n => observer.observe(n));
            } catch (e) {
              console.warn('animation observer error', e);
            }
          })();`,
        }}
      />
    </main>
  );
}