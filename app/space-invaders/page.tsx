import React from 'react';
import Header from '../components/Header';
import SpaceInvaders from '../components/SpaceInvaders';
import Cursor from '../components/Cursor';
import Link from 'next/link';

function multipleBoxShadow(n: number) {
  function r() {
    return Math.floor(Math.random() * 2000) + 'px';
  }
  let value = `${r()} ${r()} #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${r()} ${r()} #FFF`;
  }
  return value;
}

export default function SpaceInvadersPage() {
    // generate star layers server-side
  const shadowsSmall = multipleBoxShadow(700);
  const shadowsMedium = multipleBoxShadow(200);
  const shadowsBig = multipleBoxShadow(100);

  const starCss = `
    /* star background styles injected from page.tsx */
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

    #stars, #stars2, #stars3 {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateZ(0);
      will-change: transform;
    }

    #stars {
      width: 1px;
      height: 1px;
      background: transparent;
      box-shadow: ${shadowsSmall};
      animation: animStar 50s linear infinite;
    }
    #stars::after {
      content: "";
      position: absolute;
      top: 2000px;
      width: 1px;
      height: 1px;
      background: transparent;
      box-shadow: ${shadowsSmall};
    }

    #stars2 {
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: ${shadowsMedium};
      animation: animStar 100s linear infinite;
    }
    #stars2::after {
      content: "";
      position: absolute;
      top: 2000px;
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: ${shadowsMedium};
    }

    #stars3 {
      width: 3px;
      height: 3px;
      background: transparent;
      box-shadow: ${shadowsBig};
      animation: animStar 150s linear infinite;
    }
    #stars3::after {
      content: "";
      position: absolute;
      top: 2000px;
      width: 3px;
      height: 3px;
      background: transparent;
      box-shadow: ${shadowsBig};
    }

    @keyframes animStar {
      from { transform: translateY(0px); }
      to   { transform: translateY(-2000px); }
    }
  `;
	return (
		<main>
            <Cursor />
                  {/* injected star background (behind everything) */}
                  <div className="stars-bg" aria-hidden="true">
                    <div id="stars" />
                    <div id="stars2" />
                    <div id="stars3" />
                  </div>
            
                  {/* inject generated CSS */}
                  <style dangerouslySetInnerHTML={{ __html: starCss }} />
			<Header />
			<section className="py-8">
				<div className="container mx-auto px-6">
					
					{/* The SpaceInvaders component (standalone page) */}
					<SpaceInvaders />
				</div>
			</section>
		</main>
	);
}