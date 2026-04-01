export interface Player {
  y: number;
  vy: number;
  isJumping: boolean;
  frame: number;
  animTimer: number;
  sprite: string[][];
  score: number;
  isAlive: boolean;
  offsetX: number;
}

export interface Obstacle {
  x: number;
  width: number;
  height: number;
}

export interface GameState {
  players: Player[];
  obstacles: Obstacle[];
  speed: number;
  lastTime: number;
  spawnTimer: number;
  status: 'START' | 'CREATOR' | 'PLAYING' | 'GAMEOVER';
  gameMode: 'SINGLE' | 'COOP';
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
}
