import React, { useState } from 'react';
import { COLORS, PALETTE } from '../constants/colors';
import { PRESETS } from '../constants/presets';
import { COMMUNITY_SPRITES, CommunitySprite } from '../constants/communitySprites';

interface CreatorScreenProps {
  gameMode: 'SINGLE' | 'COOP';
  onBack: () => void;
  onStart: (p1Sprite: string[][], p2Sprite: string[][], difficulty: 'EASY' | 'NORMAL' | 'HARD') => void;
}

export const CreatorScreen = ({ gameMode, onBack, onStart }: CreatorScreenProps) => {
  const createEmptyGrid = () => Array(8).fill(0).map(() => Array(8).fill(''));
  
  const [p1Sprite, setP1Sprite] = useState<string[][]>(PRESETS.FANTASMA.map(row => row.map(cell => cell === 'PLACEHOLDER' ? COLORS.matrix : cell)));
  const [p2Sprite, setP2Sprite] = useState<string[][]>(PRESETS.CALAVERA.map(row => row.map(cell => cell === 'PLACEHOLDER' ? COLORS.glitch : cell)));
  const [editingPlayer, setEditingPlayer] = useState<1 | 2>(1);
  const [selectedColor, setSelectedColor] = useState(COLORS.matrix);
  const [difficulty, setDifficulty] = useState<'EASY' | 'NORMAL' | 'HARD'>('NORMAL');
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [communityFilter, setCommunityFilter] = useState<'VOTADOS' | 'RECIENTES' | 'ALEATORIO'>('VOTADOS');
  const [tooltipSprite, setTooltipSprite] = useState<CommunitySprite | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const activeSprite = editingPlayer === 1 ? p1Sprite : p2Sprite;
  const activeSetter = editingPlayer === 1 ? setP1Sprite : setP2Sprite;

  const updatePixel = (setter: React.Dispatch<React.SetStateAction<string[][]>>, x: number, y: number) => {
    setter(prev => {
      const next = [...prev.map(row => [...row])];
      next[y][x] = selectedColor;
      return next;
    });
  };

  const generateSymmetricalRandom = () => {
    const grid = createEmptyGrid();
    const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 4; x++) {
        if (Math.random() > 0.5) {
          grid[y][x] = randomColor;
          grid[y][7 - x] = randomColor; // Mirror to the other side
        }
      }
    }
    return grid;
  };

  const randomizeCharacter = (playerNum: 1 | 2) => {
    const setter = playerNum === 1 ? setP1Sprite : setP2Sprite;
    
    // Choose between a fixed preset or a symmetrical random shape
    if (Math.random() > 0.3) {
      const keys = Object.keys(PRESETS) as Array<keyof typeof PRESETS>;
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const preset = PRESETS[randomKey];
      const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      
      const tintedSprite = preset.map(row => 
        row.map(cell => cell === 'PLACEHOLDER' ? randomColor : cell)
      );
      setter(tintedSprite);
    } else {
      setter(generateSymmetricalRandom());
    }
  };

  const loadCommunitySprite = (spriteData: string[][], targetPlayer: 1 | 2) => {
    if (targetPlayer === 1) setP1Sprite(spriteData);
    else setP2Sprite(spriteData);
    setTooltipSprite(null);
  };

  const handleCommunityClick = (e: React.MouseEvent, sprite: CommunitySprite) => {
    if (gameMode === 'SINGLE') {
      setP1Sprite(sprite.data);
    } else {
      setTooltipSprite(sprite);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-void overflow-y-auto overflow-x-hidden select-none">
      <div className="grid-overlay" />
      
      {/* 1. TOP BAR */}
      <div className="flex items-center gap-4 px-6 py-6 z-20 shrink-0">
        <button 
          onClick={onBack}
          className="p-3 border border-void3 text-matrix hover:border-matrix transition-all flex items-center justify-center aspect-square min-h-0"
        >
          <span className="text-xl">←</span>
        </button>
        <h1 
          className="text-matrix uppercase tracking-[8px] m-0 glitch-text text-left" 
          data-text="CREATOR_MODE"
          style={{ fontSize: '24px' }}
        >
          CREATOR_MODE
        </h1>
      </div>

      {/* FIRST FOLD CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 px-6 pb-12 z-10 max-w-7xl mx-auto w-full">
        
        {/* LEFT: CHARACTER CONTAINER */}
        <div className="flex-1 bg-void2 border-2 border-void3 p-6 flex flex-col gap-6 relative min-h-[500px]">
          {/* TABS (only for COOP) */}
          {gameMode === 'COOP' && (
            <div className="flex gap-4 border-b border-void3/30 mb-2">
              <button 
                onClick={() => setEditingPlayer(1)}
                className={`py-2 px-4 text-xs font-bold tracking-[2px] transition-all ${editingPlayer === 1 ? 'border-b-2 border-matrix text-matrix' : 'text-deep opacity-50'}`}
              >
                PERSONAJE_1
              </button>
              <button 
                onClick={() => setEditingPlayer(2)}
                className={`py-2 px-4 text-xs font-bold tracking-[2px] transition-all ${editingPlayer === 2 ? 'border-b-2 border-matrix text-matrix' : 'text-deep opacity-50'}`}
              >
                PERSONAJE_2
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* GRID 30px */}
            <div className="bg-void p-1 border-2 border-void3">
              <div className="grid grid-cols-8">
                {activeSprite.map((row, y) => row.map((pixel, x) => (
                  <div
                    key={`${x}-${y}`}
                    onMouseDown={() => {
                      setIsDrawing(true);
                      updatePixel(activeSetter, x, y);
                    }}
                    onMouseEnter={() => {
                      if (isDrawing) updatePixel(activeSetter, x, y);
                    }}
                    onMouseUp={() => setIsDrawing(false)}
                    className="w-[30px] h-[30px] border border-void3/20 cursor-crosshair"
                    style={{ backgroundColor: pixel || 'transparent' }}
                  />
                )))}
              </div>
            </div>

            {/* PALETTE 2x4 */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] text-deep tracking-[2px]">PALETA DE COLORES</span>
              <div className="grid grid-cols-4 gap-2">
                {PALETTE.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 border-2 transition-all p-0 min-h-0 ${selectedColor === color ? 'border-white scale-110' : 'border-transparent opacity-80'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-8">
            <button 
              onClick={() => activeSetter(createEmptyGrid())}
              className="px-6 py-2 text-xs border border-void3 text-deep hover:text-error hover:border-error"
            >
              LIMPIAR
            </button>
            <button 
              onClick={() => randomizeCharacter(editingPlayer)}
              className="px-6 py-2 text-xs border border-matrix text-matrix hover:bg-matrix hover:text-void font-bold"
            >
              ALEATORIO
            </button>
          </div>
        </div>

        {/* RIGHT: GAME SETTINGS */}
        <div className="w-full lg:w-[350px] bg-void2 border-2 border-void3 p-8 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-matrix tracking-[4px] text-left" style={{ fontSize: '18px' }}>CONFIGURACIÓN DEL JUEGO</h2>
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] text-deep tracking-[2px]">DIFICULTAD</span>
              <div className="flex gap-2">
                {(['EASY', 'NORMAL', 'HARD'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 text-[10px] font-black tracking-[1px] transition-all ${difficulty === d ? 'bg-matrix text-void border-matrix' : 'border border-void3 text-deep hover:border-matrix'}`}
                  >
                    {d === 'HARD' ? 'GOD' : d === 'EASY' ? 'FACIL' : 'NORMAL'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onStart(p1Sprite, p2Sprite, difficulty)}
            className="w-full py-8 bg-white text-void font-black tracking-[6px] text-lg hover:bg-matrix transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-none mt-auto"
          >
            INICIAR_JUEGO
          </button>
        </div>
      </div>

      {/* 2. COMMUNITY SECTION (Below Fold) */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-32 z-10 border-t border-void3/30 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-xl text-matrix text-left tracking-[4px] mb-2 uppercase">Creados por la comunidad</h2>
            <p className="text-deep text-[10px] tracking-[2px]">INSPIRACIÓN DE OTROS RUNNERS</p>
          </div>
          
          <div className="flex gap-4 border border-void3 p-1">
            {(['VOTADOS', 'RECIENTES', 'ALEATORIO'] as const).map(f => (
              <button
                key={f}
                onClick={() => setCommunityFilter(f)}
                className={`text-[9px] px-4 py-2 border-none min-h-0 ${communityFilter === f ? 'bg-void3 text-matrix' : 'text-deep hover:text-white opacity-60'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {COMMUNITY_SPRITES.filter(s => s.category === communityFilter || communityFilter === 'ALEATORIO').map(sprite => (
            <div 
              key={sprite.id} 
              className="community-card group"
              onClick={(e) => handleCommunityClick(e, sprite)}
            >
              <div className="sprite-preview">
                {sprite.data.flat().map((pixel, i) => (
                  <div key={i} style={{ backgroundColor: pixel || 'transparent' }} />
                ))}
              </div>
              <div className="p-3 border-t border-void3 flex flex-col gap-1 bg-void3/20">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-bold text-matrix truncate mr-1 uppercase">{sprite.name}</span>
                  <span className="text-[9px] text-error font-bold whitespace-nowrap">♥ {sprite.likes}</span>
                </div>
                <span className="text-[8px] text-deep tracking-[1px] opacity-70 uppercase">{sprite.creator}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Choice Tooltip for COOP mode loading */}
      {tooltipSprite && (
        <div 
          className="tooltip-container fixed flex flex-col gap-4 min-w-[200px]"
          style={{ 
            left: Math.min(tooltipPos.x, window.innerWidth - 220), 
            top: Math.min(tooltipPos.y, window.innerHeight - 150) 
          }}
        >
          <div className="flex justify-between items-center border-b border-void3 pb-2">
            <span className="text-[10px] text-matrix font-bold tracking-[2px]">CARGAR_EN_</span>
            <button onClick={() => setTooltipSprite(null)} className="p-1 border-none min-h-0 text-error">×</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => loadCommunitySprite(tooltipSprite.data, 1)} className="flex-1 py-2 bg-void border border-void3 text-[9px]">PERSONAJE_1</button>
            <button onClick={() => loadCommunitySprite(tooltipSprite.data, 2)} className="flex-1 py-2 bg-void border border-void3 text-[9px]">PERSONAJE_2</button>
          </div>
        </div>
      )}

      {/* Floating Scanline */}
      <div className="scanline" />
    </div>
  );
};
