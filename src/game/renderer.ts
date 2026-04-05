import { COLORS, PIXEL_SIZE } from '../constants/colors';
import { Player, Obstacle } from './types';

export const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  player: Player
) => {
  if (!player.isAlive) return;
  const px = PIXEL_SIZE;
  const sprite = player.sprite;

  // Leg animation frames (4 frames)
  const legs = [
    [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1]], // Standing
    [[0, 1, 0, 1, 0], [0, 1, 0, 1, 0]], // Running 1
    [[1, 0, 0, 0, 1], [0, 0, 1, 0, 0]], // Running 2
    [[0, 1, 0, 1, 0], [1, 0, 0, 0, 1]], // Running 3
  ];

  const currentLegs = legs[player.frame % 4];

  const renderLayer = (offsetX: number, isGhost: boolean) => {
    ctx.globalAlpha = isGhost ? 0.35 : 1.0;
    const layerColor = isGhost ? COLORS.glitch : null;

    // Draw body
    sprite.forEach((row, ry) => {
      row.forEach((cellColor, rx) => {
        if (cellColor) {
          ctx.fillStyle = layerColor || cellColor;
          ctx.fillRect(x + rx * px + offsetX, y + ry * px, px, px);
        }
      });
    });

    // Draw legs
    ctx.fillStyle = layerColor || COLORS.matrix;
    currentLegs.forEach((row, ry) => {
      row.forEach((cell, rx) => {
        if (cell) {
          ctx.fillRect(x + rx * px + offsetX + px, y + (sprite.length + ry) * px, px, px);
        }
      });
    });
  };

  // 1. Ghost Layer (Offset +4px as per DESIGN.md)
  renderLayer(4, true);

  // 2. Main Sprite
  renderLayer(0, false);
  
  ctx.globalAlpha = 1.0;
};

export const drawObstacle = (ctx: CanvasRenderingContext2D, obs: Obstacle, groundY: number) => {
  ctx.fillStyle = COLORS.error;
  ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
  
  // Subtle glitch effect on obstacle
  if (Math.random() > 0.95) {
    ctx.fillStyle = COLORS.glitch;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(obs.x + 2, groundY - obs.height, obs.width, obs.height);
    ctx.globalAlpha = 1.0;
  }
};

export const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, groundY: number) => {
  // Base Void
  ctx.fillStyle = COLORS.void;
  ctx.fillRect(0, 0, width, height);

  // Pixel Grid (DESIGN.md: 32x32px, opacity 0.15)
  ctx.strokeStyle = COLORS.void3;
  ctx.globalAlpha = 0.15;
  ctx.beginPath();
  for (let x = 0; x < width; x += 32) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y < height; y += 32) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();

  // Ground Line
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = COLORS.deep;
  ctx.fillRect(0, groundY, width, 4);
};

export const drawScanline = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
  const scanlineY = (time / 20) % height;
  ctx.fillStyle = COLORS.glitch;
  ctx.globalAlpha = 0.08;
  ctx.fillRect(0, scanlineY, width, 2);
  ctx.globalAlpha = 1.0;
};
