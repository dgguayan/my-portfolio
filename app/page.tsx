"use client";

import React, { useEffect, useState, Suspense } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add class to enable animations after mount
    document.documentElement.classList.add('js-loaded');
    
    // Animation observer logic
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

    return () => {
      nodes.forEach(n => observer.unobserve(n));
    };
  }, []);

  // Simple seeded random for consistent stars
  const genBinary = (n: number, seed: number) => {
    const stars = [];
    for (let i = 0; i < n; i++) {
      const x = Math.sin(seed + i) * 10000;
      const left = (x - Math.floor(x)) * 100;
      const y = Math.sin(seed + i + 1) * 10000;
      const top = (y - Math.floor(y)) * 120;
      const z = Math.sin(seed + i + 2) * 10000;
      const char = (z - Math.floor(z)) < 0.5 ? "0" : "1";
      stars.push({ left, top, char });
    }
    return stars;
  };

  const smallStars = genBinary(700, 1);
  const mediumStars = genBinary(200, 2);
  const bigStars = genBinary(100, 3);

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
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <Cursor />
      
      {/* Stars background - only show after mount to avoid hydration issues */}
      {mounted && (
        <div className="stars-bg" aria-hidden="true" suppressHydrationWarning>
          <div className="stars-layer" id="stars">
            <div className="layer-inner small">
              <div className="layer-copy">
                {smallStars.map((s, i) => (
                  <span key={`s-a-${i}`} className="binary small" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
              <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
                {smallStars.map((s, i) => (
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
                {mediumStars.map((s, i) => (
                  <span key={`m-a-${i}`} className="binary medium" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
              <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
                {mediumStars.map((s, i) => (
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
                {bigStars.map((s, i) => (
                  <span key={`b-a-${i}`} className="binary big" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
              <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
                {bigStars.map((s, i) => (
                  <span key={`b-b-${i}`} className="binary big" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!mounted && <div className="stars-bg" aria-hidden="true" />}

      <style dangerouslySetInnerHTML={{ __html: starCss }} />

      <Header />

      <div data-animate data-delay="100">
        <Hero />
      </div>

      <div data-animate data-delay="120">
        <ProjectsGrid />
      </div>

      <div data-animate data-delay="160">
        <TechStack />
      </div>

      <div data-animate data-delay="200">
        <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
          <ProjectDetail />
        </Suspense>
      </div>

      <div data-animate data-delay="240">
        <Experience />
      </div>

      <div data-animate data-delay="280">
        <Contact />
      </div>

      <BackToTop />

      <style dangerouslySetInnerHTML={{ __html: `
        /* Elements visible by default for safety */
        [data-animate] { 
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        
        /* Only apply animation styles when JS has loaded */
        .js-loaded [data-animate] { 
          opacity: 0;
          transform: translateY(18px) scale(0.995) translateZ(0);
          filter: blur(4px);
          will-change: transform, opacity, filter;
          transition:
            opacity 700ms cubic-bezier(.16,.84,.24,1),
            transform 700ms cubic-bezier(.16,.84,.24,1),
            filter 700ms cubic-bezier(.16,.84,.24,1);
        }

        .js-loaded [data-animate][data-animate-side="left"] {
          transform: translateX(-28px) translateY(8px) scale(0.995) translateZ(0);
        }
        .js-loaded [data-animate][data-animate-side="right"] {
          transform: translateX(28px) translateY(8px) scale(0.995) translateZ(0);
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) scale(1) translateZ(0) !important;
          filter: blur(0) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-animate], .animate-in { 
            transition: none !important; 
            transform: none !important; 
            opacity: 1 !important; 
            filter: none !important; 
          }
        }
      ` }} />
    </main>
  );
}