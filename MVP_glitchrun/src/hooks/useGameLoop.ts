import React, { useEffect, useRef } from 'react';
import { GameState } from '../game/types';
import { updateGame, renderGame } from '../game/engine';

export const useGameLoop = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  stateRef: React.MutableRefObject<GameState>,
  onGameOver: (score: number) => void,
  onTick?: (state: GameState) => void
) => {
  const requestRef = useRef<number>(0);

  // Initial resize and resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (time: number) => {
      const state = stateRef.current;
      
      if (state.status === 'PLAYING') {
        updateGame(state, canvas, time);
        renderGame(ctx, state, canvas, time);
        
        if (onTick) onTick(state);
        
        requestRef.current = requestAnimationFrame(loop);
      } else {
        renderGame(ctx, state, canvas, time);
        
        if (state.status === 'GAMEOVER') {
          const maxScore = Math.max(...state.players.map(p => p.score));
          onGameOver(Math.floor(maxScore));
        }
      }
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(requestRef.current);
  }, [stateRef.current.status, canvasRef, onGameOver, onTick]);
};
