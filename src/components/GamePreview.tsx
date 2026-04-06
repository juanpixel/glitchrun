import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { drawBackground, drawPlayer, drawObstacle, drawScanline } from '../game/renderer';
import { GROUND_Y, JUMP_FORCE, GRAVITY } from '../constants/colors';
import { Player, Obstacle } from '../game/types';

interface GamePreviewProps {
  activeSprite: string[][];
  className?: string;
}

export const GamePreview: React.FC<GamePreviewProps> = ({ 
  activeSprite, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    player: {
      y: 0,
      vy: 0,
      isJumping: false,
      frame: 0,
      animTimer: 0,
      sprite: activeSprite,
      score: 0,
      isAlive: true,
      offsetX: 0,
    } as Player,
    obstacles: [] as Obstacle[],
    spawnTimer: 0,
    speed: 6,
    lastTime: 0,
  });

  // Update sprite when prop changes with a "flicker" effect or transition
  useEffect(() => {
    stateRef.current.player.sprite = activeSprite;
  }, [activeSprite]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Animation Loop
    let animationFrameId: number;
    
    const loop = (time: number) => {
      const state = stateRef.current;
      const dt = state.lastTime ? (time - state.lastTime) / 16.67 : 1;
      state.lastTime = time;

      const groundY = canvas.height * GROUND_Y;
      const playerX = 60; // Adjusted for small canvas

      // 1. UPDATE PHYSICS
      if (state.player.y < 0 || state.player.vy !== 0) {
        state.player.y += state.player.vy * dt;
        state.player.vy += GRAVITY * dt;

        if (state.player.y >= 0) {
          state.player.y = 0;
          state.player.vy = 0;
          state.player.isJumping = false;
        }
      }

      // Leg animation
      state.player.animTimer += dt;
      if (state.player.animTimer > 5) {
        state.player.frame++;
        state.player.animTimer = 0;
      }

      // 2. RUNNER AI (Auto-jump)
      const nextObstacle = state.obstacles[0];
      if (nextObstacle && nextObstacle.x - playerX < 80 && !state.player.isJumping) {
        state.player.vy = JUMP_FORCE;
        state.player.isJumping = true;
      }

      // 3. OBSTACLES
      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0) {
        state.obstacles.push({
          x: canvas.width,
          width: 15,
          height: 25 + Math.random() * 20,
        });
        state.spawnTimer = 60 + Math.random() * 60;
      }

      state.obstacles.forEach((obs, index) => {
        obs.x -= state.speed * dt;
        if (obs.x + obs.width < -50) {
          state.obstacles.splice(index, 1);
        }
      });

      // 4. RENDER
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas.width, canvas.height, groundY);
      
      state.obstacles.forEach(obs => drawObstacle(ctx, obs, groundY));
      
      // Draw shadow/ghost layer for player? renderer.ts does it already.
      drawPlayer(ctx, playerX, groundY + state.player.y - 32, state.player);
      
      drawScanline(ctx, canvas.width, canvas.height, time);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={`relative w-full max-w-[420px] aspect-video bg-[#080C08] border-2 border-[#1a2e1a] overflow-hidden ${className}`}>
      {/* Simulation Meta Header */}
      <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-center z-10 pointer-events-none">
        <div className="font-mono text-[8px] text-[#39FF14] opacity-50 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse" />
          SIMULACION_NUCLEO_V2.0
        </div>
        <div className="font-mono text-[8px] text-[#39FF14] opacity-30">
          CH_ID: {activeSprite ? "SYNC_OK" : "PENDING..."}
        </div>
      </div>

      <canvas 
        ref={canvasRef}
        width={420}
        height={236}
        className="w-full h-full"
      />

      {/* Decorative Glitch Border */}
      <div className="absolute inset-0 pointer-events-none border border-[#39FF14]/5" />
      <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#39FF14]/40" />
      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#39FF14]/40" />
    </div>
  );
};
