import { GRAVITY, GROUND_Y } from '../constants/colors';
import { GameState } from './types';

export const updatePhysics = (state: GameState, canvasHeight: number, dt: number) => {
  const groundY = canvasHeight * GROUND_Y;

  state.players.forEach((p) => {
    if (!p.isAlive) return;

    p.y += p.vy * dt;
    p.vy += GRAVITY * dt;

    // Collision with ground
    if (p.y > groundY - 32) {
      p.y = groundY - 32;
      p.vy = 0;
      p.isJumping = false;
    }

    // Animation frames
    if (!p.isJumping) {
      p.animTimer += dt;
      if (p.animTimer > 5) {
        p.frame = (p.frame + 1) % 4;
        p.animTimer = 0;
      }
    } else {
      p.frame = 1;
    }
  });
};

export const checkCollisions = (state: GameState, groundY: number, playerX: number) => {
  state.obstacles.forEach((obs) => {
    state.players.forEach((p) => {
      if (!p.isAlive) return;
      const px = playerX + p.offsetX;
      const playerWidth = 28;
      const playerHeight = 32;

      if (
        px < obs.x + obs.width &&
        px + playerWidth > obs.x &&
        p.y < groundY - obs.height + obs.height &&
        p.y + playerHeight > groundY - obs.height
      ) {
        p.isAlive = false;
      }
    });
  });
};
