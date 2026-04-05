import { useEffect, useRef } from 'react';
import { COLORS } from '../constants/colors';

interface MenuScreenProps {
  onSelectMode: (mode: 'SINGLE' | 'COOP') => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}

export const MenuScreen = ({ onSelectMode, onShowInstructions, onShowLeaderboard }: MenuScreenProps) => {
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        onShowLeaderboard();
      }, 15000); // 15 seconds idle
    };

    const events = ['keydown', 'mousedown', 'mousemove', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    
    resetTimer(); // Start timer on mount

    return () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [onShowLeaderboard]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080C08]/80 z-40 px-4">
      <h1 className="font-bold tracking-[8px] md:tracking-[12px] mb-4 text-[#39FF14] animate-pulse glitch-text" data-text="GLITCHRUN">
        GLITCHRUN
      </h1>
      <p className="text-[10px] md:text-sm mb-12 text-[#1D9E75] tracking-[4px] text-center">SELECT_OPERATION_MODE_</p>
      
      <div className="flex flex-col gap-4 w-full max-w-[280px] md:max-w-xs">
        <button 
          onClick={() => onSelectMode('SINGLE')}
          className="w-full py-4 border-2 border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-[#080C08] transition-all font-bold uppercase tracking-[2px]"
        >
          SINGLE_PLAYER
        </button>
        <button 
          onClick={() => onSelectMode('COOP')}
          className="w-full py-4 border-2 border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#080C08] transition-all font-bold uppercase tracking-[2px]"
        >
          COOPERATIVE
        </button>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button 
            onClick={() => onShowInstructions()}
            className="py-3 border border-[#1a2e1a] text-[#1D9E75] hover:text-[#39FF14] hover:border-[#39FF14] transition-all font-bold uppercase tracking-[2px] text-xs"
          >
            INFO_SYSTEM
          </button>
          <button 
            onClick={() => onShowLeaderboard()}
            className="py-3 border border-[#FAC775]/50 text-[#FAC775] hover:bg-[#FAC775] hover:text-[#080C08] transition-all font-bold uppercase tracking-[2px] text-xs"
          >
            RECORDS_
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-[#1D9E75] flex flex-col items-center gap-2 tracking-[2px] text-center">
        <span>V_0.8.2_STABLE</span>
        <span className="opacity-50">SISTEMA_OPERATIVO_ACTIVO</span>
      </div>
    </div>
  );
};
