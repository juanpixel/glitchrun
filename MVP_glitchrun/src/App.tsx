import { useRef, useState, useCallback } from 'react';
import { PRESETS } from './constants/presets';
import { GameState } from './game/types';
import { useGameLoop } from './hooks/useGameLoop';
import { useControls } from './hooks/useControls';
import { isHighScore, saveScore } from './utils/scoreStorage';

// Screens
import { MenuScreen } from './screens/MenuScreen';
import { CreatorScreen } from './screens/CreatorScreen';
import { GameOverScreen } from './screens/GameOverScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { RecordInputScreen } from './screens/RecordInputScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';

// Components
import { HUD } from './components/HUD';

type UIStatus = 'START' | 'CREATOR' | 'PLAYING' | 'GAMEOVER' | 'INSTRUCTIONS' | 'RECORD_INPUT' | 'LEADERBOARD';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uiStatus, setUiStatus] = useState<UIStatus>('START');
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [highScore, setHighScore] = useState(0);
  const [gameMode, setGameMode] = useState<'SINGLE' | 'COOP'>('SINGLE');
  const [pendingScore, setPendingScore] = useState(0);

  const gameStateRef = useRef<GameState>({
    players: [
      { y: 0, vy: 0, isJumping: false, frame: 0, animTimer: 0, sprite: PRESETS.PLAYER_001, score: 0, isAlive: true, offsetX: 0 },
      { y: 0, vy: 0, isJumping: false, frame: 0, animTimer: 0, sprite: PRESETS.PLAYER_002, score: 0, isAlive: false, offsetX: -60 }
    ],
    obstacles: [],
    speed: 6,
    lastTime: 0,
    spawnTimer: 0,
    status: 'START',
    gameMode: 'SINGLE',
    difficulty: 'NORMAL'
  });

  const onGameOver = useCallback((maxScore: number) => {
    gameStateRef.current.status = 'GAMEOVER';
    
    // Check for high score
    if (isHighScore(gameStateRef.current.gameMode, maxScore)) {
      setPendingScore(maxScore);
      setUiStatus('RECORD_INPUT');
    } else {
      setUiStatus('GAMEOVER');
    }

    if (maxScore > highScore) setHighScore(maxScore);
  }, [highScore]);

  const onTick = useCallback((state: GameState) => {
    setScores({
      p1: Math.floor(state.players[0].score),
      p2: Math.floor(state.players[1].score)
    });
  }, []);

  // Game Loop Hook
  useGameLoop(canvasRef, gameStateRef, onGameOver, onTick);

  // Controls Hook
  useControls(gameStateRef);

  const startGame = (p1Sprite: string[][], p2Sprite: string[][], difficulty: 'EASY' | 'NORMAL' | 'HARD') => {
    const speedMap = { EASY: 4, NORMAL: 6, HARD: 9 };
    
    // Reset core state
    gameStateRef.current.status = 'PLAYING';
    gameStateRef.current.difficulty = difficulty;
    gameStateRef.current.speed = speedMap[difficulty];
    gameStateRef.current.spawnTimer = 0;
    gameStateRef.current.obstacles = [];
    gameStateRef.current.players[0].y = 0;
    gameStateRef.current.players[0].vy = 0;
    gameStateRef.current.players[0].score = 0;
    gameStateRef.current.players[0].sprite = p1Sprite;
    gameStateRef.current.players[0].isAlive = true;
    
    gameStateRef.current.players[1].y = 0;
    gameStateRef.current.players[1].vy = 0;
    gameStateRef.current.players[1].score = 0;
    gameStateRef.current.players[1].sprite = p2Sprite;
    gameStateRef.current.players[1].isAlive = gameMode === 'COOP';

    setScores({ p1: 0, p2: 0 });
    setUiStatus('PLAYING');
  };

  const handleModeSelect = (mode: 'SINGLE' | 'COOP') => {
    setGameMode(mode);
    gameStateRef.current.gameMode = mode;
    gameStateRef.current.status = 'CREATOR';
    setUiStatus('CREATOR');
  };

  const handleExit = () => {
    gameStateRef.current.status = 'START';
    setUiStatus('START');
  };

  const handleRecordSave = (initials: string) => {
    saveScore(gameMode, initials, pendingScore);
    setUiStatus('GAMEOVER');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#080C08]">
      <div className="grid-overlay" />
      <div className="scanline" />

      {/* HUD only shows during PLAYING */}
      {uiStatus === 'PLAYING' && (
        <HUD 
          scores={scores}
          highScore={highScore}
          gameMode={gameMode}
          onHome={handleExit}
        />
      )}

      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Overlays */}
      {uiStatus === 'START' && (
        <MenuScreen 
          onSelectMode={handleModeSelect} 
          onShowInstructions={() => setUiStatus('INSTRUCTIONS')}
          onShowLeaderboard={() => setUiStatus('LEADERBOARD')}
        />
      )}

      {uiStatus === 'INSTRUCTIONS' && (
        <InstructionsScreen onBack={handleExit} />
      )}

      {uiStatus === 'LEADERBOARD' && (
        <LeaderboardScreen onBack={handleExit} />
      )}

      {uiStatus === 'RECORD_INPUT' && (
        <RecordInputScreen 
          score={pendingScore} 
          gameMode={gameMode} 
          onConfirm={handleRecordSave} 
        />
      )}

      {uiStatus === 'CREATOR' && (
        <CreatorScreen 
          gameMode={gameMode} 
          onBack={handleExit}
          onStart={startGame}
        />
      )}

      {uiStatus === 'GAMEOVER' && (
        <GameOverScreen 
          scores={scores}
          highScore={highScore}
          gameMode={gameMode}
          onRetry={() => startGame(gameStateRef.current.players[0].sprite, gameStateRef.current.players[1].sprite, gameStateRef.current.difficulty)}
          onEdit={() => setUiStatus('CREATOR')}
          onExit={handleExit}
        />
      )}
    </div>
  );
}
