import React, { useState } from 'react';
import { COLORS, PALETTE } from '../constants/colors';
import { PRESETS } from '../constants/presets';
import { supabase } from '../lib/supabase';

interface CommunitySprite {
  id: string;
  name: string;
  creator: string;
  likes: number;
  sprite_data: string[][];
}

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

  const [communityFilter, setCommunityFilter] = useState<'VOTADOS' | 'RECIENTES' | 'ALEATORIO'>('RECIENTES');
  const [dbSprites, setDbSprites] = useState<CommunitySprite[]>([]);
  const [tooltipSprite, setTooltipSprite] = useState<CommunitySprite | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

  // New character metadata
  const [charName, setCharName] = useState('NUEVO_PERSONAJE');
  const [creatorName, setCreatorName] = useState('CREADOR_ANONIMO');

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

  const fetchCommunity = async () => {
    let query = supabase.from('characters').select('*');

    if (communityFilter === 'VOTADOS') {
      query = query.order('likes', { ascending: false });
    } else if (communityFilter === 'RECIENTES') {
      query = query.order('created_at', { ascending: false });
    } else {
      // Random is tricky with Supabase, we'll just fetch latest and shuffle in JS
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query.limit(10);
    if (!error && data) {
      setDbSprites(data as any);
    }
  };

  React.useEffect(() => {
    fetchCommunity();
  }, [communityFilter]);

  const handlePublish = async () => {
    setIsPublishing(true);
    const { error } = await supabase.from('characters').insert([
      {
        name: charName.toUpperCase(),
        creator: creatorName.toUpperCase(),
        sprite_data: activeSprite,
        likes: 0
      }
    ]);

    setIsPublishing(false);
    setShowConfirmModal(false);

    if (!error) {
      fetchCommunity();
      setToast({ msg: '¡NUEVO PERSONAJE CREADO!', type: 'success' });
    } else {
      console.error(error);
      setToast({ msg: 'ERROR DESCONOCIDO AL CREAR PERSONAJE', type: 'error' });
    }

    // Auto-hide toast
    setTimeout(() => setToast(null), 3000);
  };

  const handleLike = async (id: string, currentLikes: number) => {
    const { error } = await supabase
      .from('characters')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);

    if (!error) {
      fetchCommunity();
    }
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
      setP1Sprite(sprite.sprite_data);
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
              <span className="text-[14px] text-deep tracking-[2px]">PALETA DE COLORES</span>
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

          {/* PUBLISH SECTION */}
          <div className="mt-8 pt-8 border-t border-void3/30 flex flex-col gap-4">
            <span className="text-[14px] text-deep tracking-[2px]">PUBLICAR EN COMUNIDAD</span>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] text-deep opacity-70">NOMBRE_PERSONAJE</label>
                <input
                  value={charName}
                  onChange={(e) => setCharName(e.target.value)}
                  className="bg-void border border-void3 p-2 text-matrix font-mono text-xs uppercase outline-none focus:border-matrix"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] text-deep opacity-70">CREADOR</label>
                <input
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="bg-void border border-void3 p-2 text-matrix font-mono text-xs uppercase outline-none focus:border-matrix"
                />
              </div>
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={isPublishing}
                className={`px-8 py-2 bg-deep text-void font-bold text-xs tracking-[2px] self-end h-[34px] hover:bg-matrix transition-all ${isPublishing ? 'opacity-50' : ''}`}
              >
                {isPublishing ? 'ENVIANDO...' : 'PUBLICAR'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: GAME SETTINGS */}
        <div className="w-full lg:w-[350px] bg-void2 border-2 border-void3 p-8 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-matrix tracking-[4px] text-left" style={{ fontSize: '18px' }}>CONFIGURACIÓN DEL JUEGO</h2>

            <div className="flex flex-col gap-4">
              <span className="text-[14px] text-deep tracking-[2px]">DIFICULTAD</span>
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
            <h2 className="text-matrix tracking-[4px] text-left uppercase" style={{ fontSize: '18px' }}>Creados por la comunidad</h2>
            <p className="text-deep text-[14px] tracking-[2px]">INSPIRACIÓN DE OTROS RUNNERS</p>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-4 border border-void3 p-1">
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

          {/* Mobile Dropdown */}
          <select
            className="md:hidden w-full h-[40px] bg-[#0D1A0D] text-[#39FF14] border-[0.5px] border-[#1D9E75] font-mono uppercase tracking-[2px] px-4 cursor-pointer outline-none appearance-none"
            value={communityFilter}
            onChange={(e) => setCommunityFilter(e.target.value as any)}
            style={{
              backgroundImage: 'linear-gradient(45deg, transparent 50%, #39FF14 50%), linear-gradient(135deg, #39FF14 50%, transparent 50%)',
              backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
              backgroundSize: '5px 5px, 5px 5px',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <option value="VOTADOS">Más votados</option>
            <option value="RECIENTES">Más recientes</option>
            <option value="ALEATORIO">Aleatorio</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {dbSprites.map(sprite => (
            <div
              key={sprite.id}
              className="community-card group"
            >
              <div
                className="sprite-preview"
                onClick={(e) => handleCommunityClick(e, sprite)}
              >
                {sprite.sprite_data.flat().map((pixel, i) => (
                  <div key={i} style={{ backgroundColor: pixel || 'transparent' }} />
                ))}
              </div>
              <div className="p-3 border-t border-void3 flex flex-col gap-1 bg-void3/20">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-bold text-matrix truncate mr-1 uppercase">{sprite.name}</span>
                  <button
                    onClick={() => handleLike(sprite.id, sprite.likes)}
                    className="text-[9px] text-error font-bold whitespace-nowrap bg-transparent border-none p-0 cursor-pointer hover:scale-110 active:scale-90 transition-all"
                  >
                    ♥ {sprite.likes}
                  </button>
                </div>
                <span className="text-[8px] text-deep tracking-[1px] opacity-70 uppercase">{sprite.creator}</span>
              </div>
            </div>
          ))}
          {dbSprites.length === 0 && (
            <div className="col-span-full py-20 text-center text-deep animate-pulse tracking-[4px]">
              _BUSCANDO_DATOS_EN_EL_NUCLEO_
            </div>
          )}
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
            <button onClick={() => loadCommunitySprite(tooltipSprite.sprite_data, 1)} className="flex-1 py-2 bg-void border border-void3 text-[9px]">PERSONAJE_1</button>
            <button onClick={() => loadCommunitySprite(tooltipSprite.sprite_data, 2)} className="flex-1 py-2 bg-void border border-void3 text-[9px]">PERSONAJE_2</button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-void/90 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-tooltip-in">
          <div className="bg-void2 border-4 border-matrix p-8 max-w-md w-full flex flex-col gap-6 shadow-[0_0_50px_rgba(57,255,20,0.2)]">
            <h3 className="text-matrix text-lg font-black tracking-[4px] uppercase border-b border-void3 pb-4">
              ¿Vas a crear este personaje?
            </h3>
            <p className="text-deep text-sm tracking-[1px] leading-relaxed">
              Al crear este personaje toda la comunidad lo podrá usar para jugar y no podrás borrarlo ni modificarlo.
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 border-2 border-error text-error font-bold tracking-[2px] hover:bg-error hover:text-void transition-all uppercase"
              >
                Cancelar
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="flex-1 py-3 bg-matrix text-void font-black tracking-[2px] shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 transition-all uppercase"
              >
                {isPublishing ? 'PUBLICANDO...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div
          className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] px-8 py-4 font-black tracking-[4px] animate-tooltip-in border-l-8 ${toast.type === 'success' ? 'bg-matrix text-void border-void' : 'bg-error text-white border-void'
            } shadow-[0_10px_40px_rgba(0,0,0,0.5)]`}
        >
          {toast.msg}
        </div>
      )}

      {/* Floating Scanline */}
      <div className="scanline" />
    </div>
  );
};
