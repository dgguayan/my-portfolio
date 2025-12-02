"use client";
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const SIZE = 120; // increased so corners have room

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window) return; // don't force on touch devices

    const el = elRef.current;
    if (!el) return;

    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    const update = () => {
      raf = 0;
      if (!el) return;
      el.style.transform = `translate3d(${mouseX - SIZE / 2}px, ${mouseY - SIZE / 2}px, 0)`;
    };

    const prevCursor = document.body.style.cursor;
    document.addEventListener('mousemove', onMove);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      document.body.style.cursor = prevCursor;
    };
  }, []);

  return (
    <>
      <div ref={elRef} className="gunscope" aria-hidden="true">
        {/* four corners */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
        {/* center square */}
        <div className="dot" />
      </div>

      <style>{`
        .gunscope{
          position: fixed;
          left: 0;
          top: 0;
          width: ${SIZE}px;
          height: ${SIZE}px;
          pointer-events: none;
          z-index: 9999;
          display: block;
          transform: translate3d(-9999px, -9999px, 0);
          transition: transform 0.03s linear;
          mix-blend-mode: normal;
        }

        /* corner L-shapes: each corner box produces a horizontal and vertical bar via pseudo elements */
        .corner {
          position: absolute;
          width: 0;
          height: 0;
        }
        .corner::before,
        .corner::after {
          content: "";
          position: absolute;
          background: #ffffff;
          border-radius: 2px;
          box-shadow: 0 0 0 rgba(0,0,0,0);
        }

        /* bar sizes */
        .corner::before { /* horizontal bar */
          height: 8px;
          width: 38px;
        }
        .corner::after { /* vertical bar */
          width: 8px;
          height: 38px;
        }

        /* top-left */
        .corner.tl { left: 12px; top: 12px; }
        .corner.tl::before { left: 0; top: 0; }
        .corner.tl::after  { left: 0; top: 0; }

        /* top-right */
        .corner.tr { right: 12px; top: 12px; }
        .corner.tr::before { right: 0; top: 0; left: auto; }
        .corner.tr::after  { right: 0; top: 0; left: auto; }

        /* bottom-left */
        .corner.bl { left: 12px; bottom: 12px; }
        .corner.bl::before { left: 0; bottom: 0; top: auto; }
        .corner.bl::after  { left: 0; bottom: 0; top: auto; }

        /* bottom-right */
        .corner.br { right: 12px; bottom: 12px; }
        .corner.br::before { right: 0; bottom: 0; left: auto; top: auto; }
        .corner.br::after  { right: 0; bottom: 0; left: auto; top: auto; }

        /* center square */
        .dot{
          position: absolute;
          left: 50%;
          top: 50%;
          width: 24px;
          height: 24px;
          transform: translate(-50%, -50%);
          background: #ffffff;
          box-shadow: none;
        }

        /* hide on touch / small screens */
        @media (pointer: coarse), (max-width: 640px) {
          .gunscope { display: none; }
        }
      `}</style>
    </>
  );
}
