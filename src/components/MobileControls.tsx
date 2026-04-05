import React, { useState } from 'react';
import { GameState } from '../game/types';
import { JUMP_FORCE } from '../constants/colors';

interface MobileControlsProps {
  gameStateRef: React.MutableRefObject<GameState>;
}

export const MobileControls = ({ gameStateRef }: MobileControlsProps) => {
  const [p1Pressed, setP1Pressed] = useState(false);
  const [p2Pressed, setP2Pressed] = useState(false);

  const handleJump = (playerIndex: 0 | 1) => {
    const state = gameStateRef.current;
    if (state.status !== 'PLAYING') return;
    
    const player = state.players[playerIndex];

    if (player.isAlive && !player.isJumping) {
      player.vy = JUMP_FORCE;
      player.isJumping = true;

      if (playerIndex === 0) {
        setP1Pressed(true);
        setTimeout(() => setP1Pressed(false), 120);
      } else {
        setP2Pressed(true);
        setTimeout(() => setP2Pressed(false), 120);
      }
    }
  };

  const p1Alive = gameStateRef.current.players[0].isAlive;
  const p2Alive = gameStateRef.current.players[1].isAlive;

  return (
    <div className="mobile-controls">
      <button
        className={`jump-btn jump-btn-p1 ${p1Pressed ? 'pressed' : ''}`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleJump(0);
        }}
        disabled={!p1Alive}
      >
        {p1Alive ? 'P1' : 'RIP'}
      </button>
      <button
        className={`jump-btn jump-btn-p2 ${p2Pressed ? 'pressed' : ''}`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleJump(1);
        }}
        disabled={!p2Alive}
      >
        {p2Alive ? 'P2' : 'RIP'}
      </button>
    </div>
  );
};
