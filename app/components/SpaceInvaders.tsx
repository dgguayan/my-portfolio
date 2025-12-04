"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mouse, MouseLeftClick, PauseIcon, PlayIcon, Trash } from "@phosphor-icons/react";

export default function SpaceInvaders() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const [score, setScore] = useState(0);
	const scoreRef = useRef<number>(score);

	// level tracking
	const [level, setLevel] = useState(1);
	const levelRef = useRef<number>(level);

	const [running, setRunning] = useState(true);
	const runningRef = useRef<boolean>(running);

	const keys = useRef<Record<string, boolean>>({});

	// keep ref in sync when toggling running
	const toggleRunning = () => {
		setRunning((r) => {
			runningRef.current = !r;
			return !r;
		});
	};

	// keep ref in sync when score changes (e.g. from outside)
	React.useEffect(() => {
		scoreRef.current = score;
	}, [score]);

	// keep ref in sync when level changes
	React.useEffect(() => {
		levelRef.current = level;
	}, [level]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			keys.current[e.key.toLowerCase()] = e.type === "keydown";
			if (e.key === " ") e.preventDefault();
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onKey);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;
		const DPR = Math.max(1, window.devicePixelRatio || 1);

		let W = 640;
		let H = 360;
		function resize() {
			const rect = canvas.getBoundingClientRect();
			W = rect.width || 640;
			H = Math.round((W * 360) / 640);
			canvas.width = Math.round(W * DPR);
			canvas.height = Math.round(H * DPR);
			canvas.style.width = `${W}px`;
			canvas.style.height = `${H}px`;
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		}
		resize();
		window.addEventListener("resize", resize);

		// Player
		const player = { x: W / 2, y: H - 28, w: 44, speed: 5 };

		// Bullets and invaders
		const bullets: { x: number; y: number; vy: number }[] = [];
		const invaders: { x: number; y: number; w: number; h: number; alive: boolean }[] = [];
		const cols = 6, rows = 3;
		let invSpeed = 0.6;
		let invDir = 1;
		const spacingX = 64, spacingY = 44;
		const startX = 60, startY = 36;

		function spawnInvaders() {
			invaders.length = 0;
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					invaders.push({
						x: startX + c * spacingX,
						y: startY + r * spacingY,
						w: 36,
						h: 20,
						alive: true,
					});
				}
			}
		}
		spawnInvaders();

		let lastShot = 0;
		const shootCooldown = 300;

		function fire() {
			const now = performance.now();
			if (now - lastShot < shootCooldown) return;
			bullets.push({ x: player.x, y: player.y - 12, vy: -7 });
			lastShot = now;
		}

		function update() {
			// input
			if (keys.current["arrowleft"] || keys.current["a"]) player.x -= player.speed;
			if (keys.current["arrowright"] || keys.current["d"]) player.x += player.speed;
			if (keys.current[" "]) fire();
			player.x = Math.max(20, Math.min(W - 20, player.x));

			// bullets
			for (let i = bullets.length - 1; i >= 0; i--) {
				bullets[i].y += bullets[i].vy;
				if (bullets[i].y < -10) bullets.splice(i, 1);
			}

			// invader bounds & movement
			let left = Infinity, right = -Infinity;
			for (const inv of invaders) if (inv.alive) { left = Math.min(left, inv.x); right = Math.max(right, inv.x + inv.w); }
			if (left === Infinity) {
				// all dead — respawn faster; increment level
				setScore((s) => { const next = s + 100; scoreRef.current = next; return next; });
				// bump level
				setLevel((l) => {
					const next = l + 1;
					levelRef.current = next;
					return next;
				});
				invSpeed *= 1.15;
				spawnInvaders();
			} else {
				if (right + invSpeed * invDir > W - 20 || left + invSpeed * invDir < 20) {
					invDir *= -1;
					for (const inv of invaders) inv.y += 12;
				} else {
					for (const inv of invaders) inv.x += invSpeed * invDir;
				}
			}

			// collisions
			for (let b = bullets.length - 1; b >= 0; b--) {
				const bu = bullets[b];
				for (let j = 0; j < invaders.length; j++) {
					const inv = invaders[j];
					if (!inv.alive) continue;
					if (bu.x > inv.x && bu.x < inv.x + inv.w && bu.y > inv.y && bu.y < inv.y + inv.h) {
						inv.alive = false;
						bullets.splice(b, 1);
						setScore((s) => { const next = s + 10; scoreRef.current = next; return next; });
						break;
					}
				}
			}

			// invaders reach player -> reset
			for (const inv of invaders) {
				if (!inv.alive) continue;
				if (inv.y + inv.h >= player.y - 6) {
					spawnInvaders();
					bullets.length = 0;
					invSpeed = 0.6;
					setScore(0);
					scoreRef.current = 0;
					// reset level to 1 on defeat
					setLevel(1);
					levelRef.current = 1;
					break;
				}
			}
		}

		function draw() {
			ctx.clearRect(0, 0, W, H);
			// player
			ctx.fillStyle = "#ffffff";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(player.x - 18, player.y + 6);
			ctx.lineTo(player.x + 18, player.y + 6);
			ctx.quadraticCurveTo(player.x, player.y - 12, player.x - 18, player.y + 6);
			ctx.fill(); ctx.stroke();

			// invaders
			ctx.fillStyle = "#ffffff";
			ctx.strokeStyle = "#000";
			for (const inv of invaders) {
				if (!inv.alive) continue;
				ctx.fillRect(inv.x, inv.y, inv.w, inv.h);
				ctx.strokeRect(inv.x, inv.y, inv.w, inv.h);
			}

			// bullets
			ctx.fillStyle = "#ffcc00";
			for (const bu of bullets) ctx.fillRect(bu.x - 2, bu.y - 8, 4, 8);

			// HUD
			ctx.fillStyle = "#ffffff";
			ctx.font = "bold 20px sans-serif";
			ctx.fillText(`Score: ${scoreRef.current}`, 20, 38);
			const levelText = `Level: ${levelRef.current}`;
			const levelWidth = ctx.measureText(levelText).width;
			ctx.fillText(levelText, W - levelWidth - 20, 38);
		}

		let last = performance.now();
		function loop(now: number) {
			const dt = now - last;
			last = now;
			if (runningRef.current) update();
			draw();
			rafRef.current = requestAnimationFrame(loop);
		}
		rafRef.current = requestAnimationFrame(loop);

		// mouse moves player
		function onMouse(e: MouseEvent) {
			const rect = canvas.getBoundingClientRect();
			player.x = Math.max(20, Math.min(W - 20, e.clientX - rect.left));
		}
		canvas.addEventListener("mousemove", onMouse);

		// left mouse click to shoot
		function onMouseDown(e: MouseEvent) {
			// 0 is left button
			if (e.button === 0) {
				fire();
			}
		}
		canvas.addEventListener("mousedown", onMouseDown);

		return () => {
			window.removeEventListener("resize", resize);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			canvas.removeEventListener("mousemove", onMouse);
			canvas.removeEventListener("mousedown", onMouseDown);
		};
	}, []); // run once on mount — score/running toggles shouldn't recreate the whole effect

	return (
		<div id="space-invaders" style={{ maxWidth: 900, margin: "28px auto", padding: 8 }}>
			<h3 className="text-7xl mb-8 uppercase font-black text-center">Space Invaders</h3>
			<div style={{ color: "white", marginBottom: 6, textAlign: "center", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
				<span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
					Space Invaders — use the <Mouse style={{ verticalAlign: "middle", margin: "0 2px" }} size={18} /> or A/D keys to move &nbsp;&amp;&nbsp;
				</span>
				<MouseLeftClick style={{ verticalAlign: "middle", margin: "0 2px" }} size={18} />
				<span>or Space to shoot.</span>
			</div>
			<div style={{ width: "100%" }}>
				<canvas ref={canvasRef} style={{ width: "100%", borderRadius: 8, display: "block", margin: "0 auto" }} />
			</div>
			<div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
				<button
					className="border"
					onClick={toggleRunning}
					style={{
						padding: "6px 10px",
						borderRadius: 5,
						display: "inline-flex",
						alignItems: "center",
						gap: 6,
					}}
				>
					{running ? (
						<>
							<PauseIcon style={{ verticalAlign: "middle" }} /> Pause
						</>
					) : (
						<>
							<PlayIcon style={{ verticalAlign: "middle" }} /> Resume
						</>
					)}
				</button>
				<button
					className="border"
					onClick={() => {
						setScore(0);
						scoreRef.current = 0;
						setLevel(1);
						levelRef.current = 1;
					}}
					style={{
						padding: "6px 10px",
						borderRadius: 5,
						display: "inline-flex",
						alignItems: "center",
						gap: 6,
					}}
				>
					<Trash />Reset Score & Level
				</button>
			</div>
		</div>
	);
}
