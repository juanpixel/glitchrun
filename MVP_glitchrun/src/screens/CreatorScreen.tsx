import { useState } from 'react';
import { COLORS } from '../constants/colors';
import { PRESETS } from '../constants/presets';

interface CreatorScreenProps {
  gameMode: 'SINGLE' | 'COOP';
  onBack: () => void;
  onStart: (p1Sprite: string[][], p2Sprite: string[][], difficulty: 'EASY' | 'NORMAL' | 'HARD') => void;
}

export const CreatorScreen = ({ gameMode, onBack, onStart }: CreatorScreenProps) => {
  // Use 8x8 base to match PRESETS
  const createEmptyGrid = () => Array(8).fill(0).map(() => Array(8).fill(''));
  
  const [p1Sprite, setP1Sprite] = useState<string[][]>(PRESETS.PLAYER_001);
  const [p2Sprite, setP2Sprite] = useState<string[][]>(PRESETS.PLAYER_002);
  const [selectedColor, setSelectedColor] = useState(COLORS.matrix);
  const [difficulty, setDifficulty] = useState<'EASY' | 'NORMAL' | 'HARD'>('NORMAL');
  const [isDrawing, setIsDrawing] = useState(false);

  const updatePixel = (setter: React.Dispatch<React.SetStateAction<string[][]>>, x: number, y: number) => {
    setter(prev => {
      const next = [...prev.map(row => [...row])];
      next[y][x] = selectedColor;
      return next;
    });
  };

  const randomizeCharacter = (playerNum: 1 | 2) => {
    const keys = Object.keys(PRESETS) as Array<keyof typeof PRESETS>;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const preset = PRESETS[randomKey];
    
    // Apply selected color to the preset shape
    const tintedSprite = preset.map(row => 
      row.map(cell => (cell !== '' && cell !== COLORS.void) ? selectedColor : cell)
    );
    
    if (playerNum === 1) setP1Sprite(tintedSprite);
    else setP2Sprite(tintedSprite);
  };

  const SpriteEditor = ({ 
    sprite, 
    setter, 
    title, 
    playerNum, 
    color 
  }: { 
    sprite: string[][], 
    setter: React.Dispatch<React.SetStateAction<string[][]>>, 
    title: string, 
    playerNum: 1 | 2,
    color: string
  }) => (
    <div className="flex flex-col items-center gap-4 w-full md:w-auto">
      <h2 className="text-sm tracking-[4px] uppercase font-bold" style={{ color }}>{title}</h2>
      <div className="bg-[#0D1A0D] p-3 md:p-4 border-2 border-[#1a2e1a] shadow-[0_0_30px_rgba(57,255,20,0.1)]">
        <div className="grid grid-cols-8 gap-0.5 md:gap-1">
          {sprite.map((row, y) => row.map((pixel, x) => (
            <div
              key={`${x}-${y}`}
              onMouseDown={() => {
                setIsDrawing(true);
                updatePixel(setter, x, y);
              }}
              onMouseEnter={() => {
                if (isDrawing) updatePixel(setter, x, y);
              }}
              onMouseUp={() => setIsDrawing(false)}
              className="w-7 h-7 md:w-10 md:h-10 border border-[#1a2e1a]/30 cursor-pointer"
              style={{ backgroundColor: pixel || 'transparent' }}
            />
          )))}
        </div>
      </div>
      <div className="flex gap-2 w-full max-w-[280px] md:max-w-none">
        <button 
          onClick={() => setter(createEmptyGrid())}
          className="flex-1 py-2 text-[#1D9E75] hover:text-[#FF2D6B] border border-[#1a2e1a] hover:border-[#FF2D6B] text-sm font-bold transition-all whitespace-nowrap bg-transparent"
        >
          LIMPIAR
        </button>
        <button 
          onClick={() => randomizeCharacter(playerNum)}
          className="flex-1 py-2 text-[#39FF14] border border-[#1a2e1a] hover:border-[#39FF14] text-sm font-bold transition-all whitespace-nowrap bg-transparent"
        >
          ALEATORIO
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080C08]/95 z-40 p-4 md:p-12 overflow-y-auto overflow-x-hidden">
      <div className="w-full flex-1 flex flex-col items-center py-8">
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 border border-[#1a2e1a] text-[#1D9E75] hover:border-[#39FF14] hover:text-[#39FF14] transition-all px-4 py-2 font-bold tracking-[2px] text-sm z-50 bg-transparent"
        >
          [ REGRESAR ]
        </button>

        <h1 className="text-[#39FF14] uppercase glitch-text tracking-[8px] md:tracking-[16px] mb-8 md:mb-12 text-3xl md:text-5xl" data-text="CREATOR_MODE">
          CREATOR_MODE
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center w-full max-w-6xl">
          {/* Sprite Editor P1 */}
          <SpriteEditor 
            sprite={p1Sprite} 
            setter={setP1Sprite} 
            title="PLAYER_1" 
            playerNum={1} 
            color={COLORS.matrix} 
          />

          {/* Sprite Editor P2 (Solo si es COOP) */}
          {gameMode === 'COOP' && (
            <SpriteEditor 
              sprite={p2Sprite} 
              setter={setP2Sprite} 
              title="PLAYER_2" 
              playerNum={2} 
              color={COLORS.glitch} 
            />
          )}

          {/* Controls Panel */}
          <div className="flex flex-col gap-6 bg-[#0D1A0D] p-6 md:p-8 border-2 border-[#1a2e1a] w-full max-w-[320px] md:max-w-[360px] lg:max-w-xs shrink-0 mb-12 lg:mb-0">
            <div>
              <p className="text-sm mb-4 text-[#1D9E75] font-bold tracking-[4px] text-center lg:text-left uppercase border-b border-[#1a2e1a] pb-2">PAINT_PALETTE</p>
              <div className="grid grid-cols-4 gap-3">
                {[COLORS.matrix, COLORS.glitch, COLORS.error, COLORS.amber, '#FFFFFF', '#7F77DD', '#FF8C00', '#1a2e1a'].map(color => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full aspect-square cursor-pointer border-2 transition-all hover:scale-110 ${selectedColor === color ? 'border-[#39FF14] scale-110 shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm mb-4 text-[#1D9E75] font-bold tracking-[4px] text-center lg:text-left uppercase border-b border-[#1a2e1a] pb-2">DIFICULTAD</p>
              <div className="flex gap-2">
                {(['EASY', 'NORMAL', 'HARD'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`text-sm py-2 flex-1 transition-all min-h-0 font-bold ${difficulty === d ? 'bg-[#39FF14] text-[#080C08] border-[#39FF14]' : 'border border-[#1a2e1a] text-[#1D9E75] hover:border-[#39FF14]'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onStart(p1Sprite, p2Sprite, difficulty)}
              className="w-full py-5 bg-[#39FF14] text-[#080C08] font-black tracking-[4px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(57,255,20,0.4)] mt-4 text-sm border-none"
            >
              EJECUTAR_RUN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
