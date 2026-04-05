import { GameState } from './types';
import { updatePhysics, checkCollisions } from './physics';
import { drawBackground, drawPlayer, drawObstacle, drawScanline } from './renderer';
import { GROUND_Y } from '../constants/colors';

export const updateGame = (state: GameState, canvas: HTMLCanvasElement, time: number) => {
  const dt = (time - state.lastTime) / 16.67;
  state.lastTime = time;

  const groundY = canvas.height * GROUND_Y;
  const playerX = 100;

  // 1. Update Physics
  updatePhysics(state, canvas.height, dt);

  // 2. Obstacle Spawning
  state.spawnTimer -= dt;
  if (state.spawnTimer <= 0) {
    const height = 20 + Math.random() * 40;
    state.obstacles.push({
      x: canvas.width,
      width: 20,
      height: height,
    });
    
    const spawnRates = { EASY: 80, NORMAL: 60, HARD: 40 };
    state.spawnTimer = spawnRates[state.difficulty] + Math.random() * 40;
  }

  // 3. Move Obstacles & Score
  state.obstacles.forEach((obs, index) => {
    obs.x -= state.speed * dt;
    if (obs.x + obs.width < 0) {
      state.obstacles.splice(index, 1);
    }
  });

  // 4. Update Score & Speed
  const scoreRates = { EASY: 0.05, NORMAL: 0.1, HARD: 0.2 };
  const speedRates = { EASY: 0.0005, NORMAL: 0.001, HARD: 0.002 };
  
  state.players.forEach(p => {
    if (p.isAlive) p.score += scoreRates[state.difficulty] * dt;
  });
  
  state.speed += speedRates[state.difficulty] * dt;

  // 5. Check Collisions
  checkCollisions(state, groundY, playerX);

  // Check Game Over
  const allDead = state.players.filter(p => p.isAlive).length === 0;
  if (allDead) {
    state.status = 'GAMEOVER';
  }
};

export const renderGame = (ctx: CanvasRenderingContext2D, state: GameState, canvas: HTMLCanvasElement, time: number) => {
  const groundY = canvas.height * GROUND_Y;
  const playerX = 100;

  drawBackground(ctx, canvas.width, canvas.height, groundY);
  
  state.obstacles.forEach(obs => drawObstacle(ctx, obs, groundY));
  
  state.players.forEach(p => {
    drawPlayer(ctx, playerX + p.offsetX, p.y, p);
  });

  drawScanline(ctx, canvas.width, canvas.height, time);
};
