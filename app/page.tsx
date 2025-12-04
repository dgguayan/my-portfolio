import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetail from './components/ProjectDetail';
import Experience from './components/Experience';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import SpaceInvaders from './components/SpaceInvaders';
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