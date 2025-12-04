'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetail from './components/ProjectDetail';
import Experience from './components/Experience';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';
import { Rocket } from '@phosphor-icons/react'; // added Rocket import

// LoadingOverlay: shows a full-screen animation on initial load and fades out
function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const DURATION = 10000; // 10 seconds
    let rafId: number | null = null;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setProgress(pct);

      if (pct >= 100) {
        // trigger launch animation, then fade out shortly after
        setLaunched(true);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setVisible(false), 450);
        }, 300); // give little time for launch visuals
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-400 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: '#000' }} // match screenshot background
    >
      <div className="flex flex-col items-center gap-6 px-6">
        {/* Rocket icon (bobbing until launch) */}
        <div className="flex items-center justify-center">
          <Rocket
            size={68}
            weight="fill"
            className={`text-white ${launched ? 'rocket-launch' : 'rocket-bob'}`}
            aria-hidden
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Loading...</h2>
        </div>

        {/* progress display (wide pill) */}
        <div className="w-full max-w-2xl mt-4 px-4">
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg,#fff,#d1d5ff)',
                transition: 'width 120ms linear',
              }}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* animations */}
      <style>{`
        @keyframes bob {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        @keyframes launch {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          30% { transform: translateY(-20vh) scale(1.05); opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.6); opacity: 0; }
        }
        .rocket-bob { animation: bob 1.8s ease-in-out infinite; }
        .rocket-launch { animation: launch 900ms cubic-bezier(.2,.8,.2,1) forwards; }
      `}</style>
    </div>
  );
}

// Wrap generation + return in the Home component to fix the top-level return parsing error
export default function Home() {
  const [mounted, setMounted] = useState(false);

  // set mounted on client to avoid server/client randomness mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // compute stars and css only after mount
  const { smallStars, mediumStars, bigStars, starCss } = useMemo(() => {
    if (!mounted) {
      return {
        smallStars: [] as { left: number; top: number; char: string }[],
        mediumStars: [] as { left: number; top: number; char: string }[],
        bigStars: [] as { left: number; top: number; char: string }[],
        starCss: '',
      };
    }

    const genBinary = (n: number) =>
      Array.from({ length: n }).map(() => ({
        left: Math.random() * 100, // percent
        top: Math.random() * 120, // allow some beyond viewport for smoother entrance
        char: Math.random() < 0.5 ? '0' : '1',
      }));

    const s = genBinary(700);
    const m = genBinary(200);
    const b = genBinary(100);

    const css = `
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

    return { smallStars: s, mediumStars: m, bigStars: b, starCss: css };
  }, [mounted]);

  return (
    <main>
      <LoadingOverlay />
      <Cursor />

      {/* injected binary-star background (behind everything) */}
      <div className="stars-bg" aria-hidden="true">
        {/* small layer */}
        <div className="stars-layer" id="stars">
          <div className="layer-inner small">
            <div className="layer-copy">
              {mounted &&
                smallStars.map((s, i) => (
                  <span key={`s-a-${i}`} className="binary small" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
            </div>
            <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
              {mounted &&
                smallStars.map((s, i) => (
                  <span key={`s-b-${i}`} className="binary small" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* medium layer */}
        <div className="stars-layer" id="stars2">
          <div className="layer-inner medium">
            <div className="layer-copy">
              {mounted &&
                mediumStars.map((s, i) => (
                  <span key={`m-a-${i}`} className="binary medium" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
            </div>
            <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
              {mounted &&
                mediumStars.map((s, i) => (
                  <span key={`m-b-${i}`} className="binary medium" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* big layer */}
        <div className="stars-layer" id="stars3">
          <div className="layer-inner big">
            <div className="layer-copy">
              {mounted &&
                bigStars.map((s, i) => (
                  <span key={`b-a-${i}`} className="binary big" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
            </div>
            <div className="layer-copy" aria-hidden="true" style={{ transform: 'translateY(100%)' }}>
              {mounted &&
                bigStars.map((s, i) => (
                  <span key={`b-b-${i}`} className="binary big" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
                    {s.char}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* inject generated CSS only after mount to avoid SSR mismatch */}
      {mounted && <style dangerouslySetInnerHTML={{ __html: starCss }} />}

      <Header />
      <Hero />
      <ProjectsGrid />
      <TechStack />
      <ProjectDetail />
      <Experience />
      <Contact />
      <BackToTop />
    </main>
  );
}