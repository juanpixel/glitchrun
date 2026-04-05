import React, { useEffect } from 'react';
import { GameState } from '../game/types';
import { JUMP_FORCE } from '../constants/colors';

export const useControls = (stateRef: React.MutableRefObject<GameState>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = stateRef.current;
      const key = e.key.toLowerCase();
      const code = e.code;

      if (state.status === 'PLAYING') {
        // Player 1
        if (
          (state.gameMode === 'SINGLE' && (code === 'Space' || key === 'w' || key === 'arrowup')) ||
          (state.gameMode === 'COOP' && key === 'w')
        ) {
          const p1 = state.players[0];
          if (p1.isAlive && !p1.isJumping) {
            p1.vy = JUMP_FORCE;
            p1.isJumping = true;
          }
        }
        // Player 2
        if (state.gameMode === 'COOP' && (key === 'i' || key === 'arrowup')) {
          const p2 = state.players[1];
          if (p2.isAlive && !p2.isJumping) {
            p2.vy = JUMP_FORCE;
            p2.isJumping = true;
          }
        }
      }
    };

    const handleTouch = (e: TouchEvent) => {
      // Prevent scrolling while playing
      if (stateRef.current.status === 'PLAYING') {
        e.preventDefault();
        const p1 = stateRef.current.players[0];
        if (p1.isAlive && !p1.isJumping) {
          p1.vy = JUMP_FORCE;
          p1.isJumping = true;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch as any, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch as any);
    };
  }, [stateRef]);
};
