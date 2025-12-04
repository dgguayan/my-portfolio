"use client";

import React from "react";
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
  // generate binary-star layers server-side
  const genBinary = (n: number) =>
    Array.from({ length: n }).map(() => ({
      left: Math.random() * 100,   // percent
      top: Math.random() * 120,    // allow some beyond viewport for smoother entrance
      char: Math.random() < 0.5 ? "0" : "1",
    }));

  const smallStars = genBinary(700);
  const mediumStars = genBinary(200);
  const bigStars = genBinary(100);

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

    /* inner wrapper holds two copies stacked vertically; animate the wrapper for continuous scroll */
    .layer-inner { position: absolute; inset: 0; }
    .layer-copy { position: absolute; inset: 0; }

    /* binary characters (small/medium/large) — kept small so not obtrusive */
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

    /* animate the inner wrapper (two stacked copies) to create a seamless vertical loop */
    @keyframes moveSmall { from { transform: translateY(0%); } to { transform: translateY(-100%); } }
    @keyframes moveMedium { from { transform: translateY(0%); } to { transform: translateY(-100%); } }
    @keyframes moveBig { from { transform: translateY(0%); } to { transform: translateY(-100%); } }

    /* durations match previous feel */
    .layer-inner.small { animation: moveSmall 50s linear infinite; }
    .layer-inner.medium { animation: moveMedium 100s linear infinite; }
    .layer-inner.big { animation: moveBig 150s linear infinite; }
  `;

  return (
    <main>
      <React.Suspense fallback={null}>
        <Cursor />
        {/* injected binary-star background (behind everything) */}
        <div className="stars-bg" aria-hidden="true">
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
            transform: translateY(18px) scale(0.995) translateZ(0); /* translateZ helps GPU compositing */
            filter: blur(4px);
            will-change: transform, opacity, filter;
            /* transition on the base element so both enter and leave are smooth */
            transition:
              opacity 700ms cubic-bezier(.16,.84,.24,1),
              transform 700ms cubic-bezier(.16,.84,.24,1),
              filter 700ms cubic-bezier(.16,.84,.24,1);
          }

          /* slide from left/right initial transforms */
          [data-animate][data-animate-side="left"] {
            transform: translateX(-28px) translateY(8px) scale(0.995) translateZ(0);
          }
          [data-animate][data-animate-side="right"] {
            transform: translateX(28px) translateY(8px) scale(0.995) translateZ(0);
          }

          /* when observer toggles this class, element will animate in:
             fade (opacity), un-blur (filter) and slide to neutral (transform) */
          .animate-in {
            opacity: 1 !important;
            transform: translateX(0) translateY(0) scale(1) translateZ(0) !important;
            filter: blur(0) !important;
            /* no need to redeclare transition here — base handles both directions */
          }

          /* reduced motion preference */
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

                // track pending timeouts so we can cancel if element leaves before delay elapses
                const timers = new WeakMap();

                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    const el = entry.target;
                    const raw = el.getAttribute('data-delay');
                    const delay = raw ? parseInt(raw, 10) : 0;

                    if (entry.isIntersecting) {
                      // clear any previously scheduled timer for this element
                      const prev = timers.get(el);
                      if (prev) { clearTimeout(prev); timers.delete(el); }

                      // schedule adding the class after optional delay
                      const id = window.setTimeout(() => {
                        el.classList.add('animate-in');
                        timers.delete(el);
                      }, Math.max(0, delay));
                      timers.set(el, id);
                    } else {
                      // leaving viewport: cancel pending timer and remove class so it can replay on re-entry
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
      </React.Suspense>
    </main>
  );
}