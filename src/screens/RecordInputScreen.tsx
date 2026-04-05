import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { COLORS } from '../constants/colors';

interface RecordInputScreenProps {
  score: number;
  gameMode: 'SINGLE' | 'COOP';
  onConfirm: (initials: string) => void;
}

export const RecordInputScreen = ({ score, gameMode, onConfirm }: RecordInputScreenProps) => {
  const [p1Initials, setP1Initials] = useState('');
  const [p2Initials, setP2Initials] = useState('');
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxLength = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [activePlayer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) e.preventDefault();
      
      // Support Tab and Enter for navigation/confirmation
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault(); // Prevent focus cycling for Tab
        
        if (gameMode === 'SINGLE') {
          if (p1Initials.length === maxLength) onConfirm(p1Initials);
        } else {
          if (activePlayer === 1 && p1Initials.length === maxLength) {
            setActivePlayer(2);
            // Clear internal buffer for the second player
            if (inputRef.current) inputRef.current.value = '';
          } else if (activePlayer === 2 && p2Initials.length === maxLength) {
            onConfirm(`${p1Initials}+${p2Initials}`);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [p1Initials, p2Initials, activePlayer, gameMode, onConfirm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, maxLength);
    if (activePlayer === 1) setP1Initials(val);
    else setP2Initials(val);
  };

  const renderSlot = (char: string, isActive: boolean) => (
    <div className={`
      w-12 h-16 md:w-16 md:h-20 border-b-4 flex items-center justify-center 
      text-3xl md:text-5xl font-black transition-all duration-100
      ${isActive ? 'border-[#39FF14] text-[#39FF14] animate-pulse shadow-[0_4px_10px_rgba(57,255,20,0.3)]' : 'border-[#1D9E75] text-[#1D9E75]'}
    `}>
      {char || '_'}
    </div>
  );

  const isP1Done = p1Initials.length === maxLength;
  const isP2Done = p2Initials.length === maxLength;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080C08] z-50 px-4 overflow-hidden">
      <div className="scanline opacity-30" />
      
      <div className="flex flex-col items-center max-w-lg w-full">
        <h2 className="text-[#FF2D6B] text-xl md:text-2xl font-bold tracking-[6px] md:tracking-[10px] mb-2 animate-pulse glitch-text" data-text="NEW_RECORD_DETECTED">
          NEW_RECORD_DETECTED
        </h2>
        <div className="h-1 w-full bg-[#FF2D6B] mb-8 shadow-[0_0_15px_#FF2D6B]" />

        <div className="text-[#39FF14] text-4xl md:text-6xl font-black tracking-widest mb-12">
          {score.toString().padStart(6, '0')}
        </div>

        <div 
          className="flex flex-col gap-12 w-full items-center cursor-pointer"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="text"
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            value={activePlayer === 1 ? p1Initials : p2Initials}
            onChange={handleInputChange}
            inputMode="text"
            autoComplete="off"
            autoFocus
          />
          {/* Player 1 Input */}
          <div className={`flex flex-col items-center transition-opacity ${activePlayer === 2 ? 'opacity-40' : 'opacity-100'}`}>
            <span className="text-[10px] text-[#1D9E75] tracking-[4px] mb-4">
              {gameMode === 'COOP' ? 'PLAYER_1_INITIALS' : 'ENTER_YOUR_INITIALS'}
            </span>
            <div className="flex gap-4">
              {Array.from({ length: maxLength }).map((_, i) => 
                renderSlot(p1Initials[i] || '', activePlayer === 1 && p1Initials.length === i)
              )}
            </div>
          </div>

          {/* Player 2 Input (only COOP) */}
          {gameMode === 'COOP' && (
            <div className={`flex flex-col items-center transition-opacity ${activePlayer === 1 ? 'opacity-40' : 'opacity-100'}`}>
              <span className="text-[10px] text-[#00FFFF] tracking-[4px] mb-4">PLAYER_2_INITIALS</span>
              <div className="flex gap-4">
                {Array.from({ length: maxLength }).map((_, i) => 
                  renderSlot(p2Initials[i] || '', activePlayer === 2 && p2Initials.length === i)
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col items-center animate-bounce">
          <p className="text-[14px] text-[#1D9E75] tracking-[2px] mb-2 font-mono">
            {activePlayer === 1 && !isP1Done && 'TYPE_LETTERS_TO_CONTINUE_'}
            {activePlayer === 1 && isP1Done && gameMode === 'SINGLE' && 'PRESS_ENTER_OR_TAB_TO_SAVE_'}
            {activePlayer === 1 && isP1Done && gameMode === 'COOP' && 'PRESS_TAB_FOR_P2_'}
            {activePlayer === 2 && !isP2Done && 'PLAYER_2_WAITING_'}
            {activePlayer === 2 && isP2Done && 'PRESS_TAB_TO_SYNC_'}
          </p>
          <div className="h-1 w-12 bg-[#39FF14] opacity-50" />
        </div>
      </div>
    </div>
  );
};
