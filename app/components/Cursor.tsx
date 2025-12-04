"use client";
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const outerRotRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const SIZE = 60;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window) return;

    const el = elRef.current;
    const inner = innerRef.current;
    const dotEl = dotRef.current;
    if (!el) return;

    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    let currX = -9999;
    let currY = -9999;
    let currentScale = 1;
    let targetScale = 1;

    let currW = SIZE;
    let currH = SIZE;
    let targetW = SIZE;
    let targetH = SIZE;

    let currRotate = 0;
    const ROTATE_SPEED_FREE = 0.06;
    const ROTATE_SPEED_LOCKED = 0.6;

    let currDotX = 0;
    let currDotY = 0;
    let targetDotX = 0;
    let targetDotY = 0;
    const DOT_SIZE = 7; 

    let locked = false;
    let lockedEl: HTMLElement | null = null;

    const selector = 'button, a, input, [data-cursor-lock]';

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (currX < -9000) { currX = mouseX; currY = mouseY; }
      if (!raf) raf = requestAnimationFrame(update);
    };

    const detectHoverTarget = () => {
      try {
        const node = document.elementFromPoint(mouseX, mouseY) as Element | null;
        if (!node) return null;
        return node.closest(selector) as HTMLElement | null;
      } catch {
        return null;
      }
    };

    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

    const update = () => {
      raf = 0;
      if (!el) return;

      const hit = detectHoverTarget();
      if (hit) {
        if (!locked || lockedEl !== hit) {
          locked = true;
          lockedEl = hit;
        }
        const r = lockedEl.getBoundingClientRect();
        const lockX = r.left + r.width / 2;
        const lockY = r.top + r.height / 2;

        targetW = Math.max(SIZE * 0.6, r.width);
        targetH = Math.max(SIZE * 0.6, r.height);

        currX += (lockX - currX) * 0.18;
        currY += (lockY - currY) * 0.18;
        currW += (targetW - currW) * 0.18;
        currH += (targetH - currH) * 0.18;
        targetScale = 1;
        currentScale += (targetScale - currentScale) * 0.12;

        const relX = mouseX - lockX;
        const relY = mouseY - lockY;
        const maxOffsetX = Math.max(4, currW / 2 - DOT_SIZE / 2 - 6);
        const maxOffsetY = Math.max(4, currH / 2 - DOT_SIZE / 2 - 6);
        targetDotX = clamp(relX, -maxOffsetX, maxOffsetX);
        targetDotY = clamp(relY, -maxOffsetY, maxOffsetY);
        currDotX += (targetDotX - currDotX) * 0.22;
        currDotY += (targetDotY - currDotY) * 0.22;

        currRotate = 0;
        if (outerRotRef?.current) {
          outerRotRef.current.style.animation = 'none';
          outerRotRef.current.style.transform = 'rotate(0deg)';
        }
      } else {
        locked = false;
        lockedEl = null;
        if (outerRotRef?.current) {
          outerRotRef.current.style.animation = '';
          outerRotRef.current.style.transform = '';
        }
        targetW = SIZE;
        targetH = SIZE;
        currX += (mouseX - currX) * 0.22;
        currY += (mouseY - currY) * 0.22;
        currW += (targetW - currW) * 0.18;
        currH += (targetH - currH) * 0.18;
        targetScale = 1;
        currentScale += (1 - currentScale) * 0.14;

        targetDotX = 0;
        targetDotY = 0;
        currDotX += (targetDotX - currDotX) * 0.18;
        currDotY += (targetDotY - currDotY) * 0.18;
      }

      if (!locked) {
        currRotate += ROTATE_SPEED_FREE;
      }

      el.classList.toggle('locked', locked);

      el.style.width = `${Math.round(currW)}px`;
      el.style.height = `${Math.round(currH)}px`;
      el.style.transform = `translate3d(${currX - currW / 2}px, ${currY - currH / 2}px, 0) scale(${currentScale})`;

      const dotNode = dotRef.current ?? el.querySelector('.dot') as HTMLElement | null;
      if (dotNode) {
        const tx = `calc(-50% + ${Math.round(currDotX)}px)`;
        const ty = `calc(-50% + ${Math.round(currDotY)}px)`;
        dotNode.style.transform = `translate(${tx}, ${ty})`;
      }

      if (inner) {
        inner.style.transform = locked ? 'rotate(0deg)' : `rotate(${currRotate}deg)`;
      }

      raf = requestAnimationFrame(update);
    };

    const prevCursor = document.body.style.cursor;
    document.addEventListener('mousemove', onMove);
    document.body.style.cursor = 'none';
    if (!raf) raf = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      document.body.style.cursor = prevCursor;
    };
  }, []);

  return (
    <>
      <div ref={elRef} className="gunscope" aria-hidden="true">
        <div ref={outerRotRef} className="outer-rot">
          <div ref={innerRef} className="gunscope-inner">
            <div className="corner tl" />
            <div className="corner tr" />
            <div className="corner bl" />
            <div className="corner br" />
          </div>
        </div>
        <div className="dot" ref={dotRef} />
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

        /* constant fast outer spin */
        @keyframes outerSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .outer-rot {
          width: 100%;
          height: 100%;
          display: block;
          transform-origin: center center;
          /* fast constant spin; adjust duration to control speed */
          animation: outerSpin 2.0s linear infinite;
        }
        /* pause outer spin when locked (optional) */
        .gunscope.locked .outer-rot { animation-play-state: paused; }

        .gunscope-inner {
          width: 100%;
          height: 100%;
          transform-origin: center center;
          /* transition removed — rotation is driven by RAF to avoid CSS shortest-path resets */
          display: block;
        }

        /* slight visual feedback when locked */
        .gunscope.locked { opacity: 0.98; transform-origin: center center; }

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
          background: #ffffffff;
          border-radius: 2px;
          outline: 1px solid #000; /* black outline for clarity */
        }

        /* bar sizes */
        .corner::before { /* horizontal bar */
          height: 2px;
          width: 9px;
        }
        .corner::after { /* vertical bar */
          width: 2px;
          height: 9px;
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
          width: 7px;
          height: 7px;
          transform: translate(-50%, -50%);
          background: #ffffff;
          box-shadow: none;
          outline: 1px solid #000; /* black outline for clarity */
        }

        /* visual tweaks when "locked" will be done via size/position from JS; optional style hook */
        [data-cursor-lock] { /* no-op placeholder; users can style locked elements if needed */ }

        /* hide on touch / small screens */
        @media (pointer: coarse), (max-width: 640px) {
          .gunscope { display: none; }
        }
      `}</style>
    </>
  );
}
