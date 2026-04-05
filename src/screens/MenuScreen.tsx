import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants/colors';

interface MenuScreenProps {
  onSelectMode: (mode: 'SINGLE' | 'COOP') => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}

export const MenuScreen = ({ onSelectMode, onShowInstructions, onShowLeaderboard }: MenuScreenProps) => {
  const idleTimerRef = useRef<number | null>(null);
  const [showCredits, setShowCredits] = useState(false);
  const lastOpenedRef = useRef<number>(0);
  
  // Easter Eggs State
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const lastTapRef = useRef<number>(0);
  
  const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCredits) {
        if (e.key === 'Escape') setShowCredits(false);
        return;
      }

      const expectedKey = KONAMI_CODE[konamiProgress];
      if (e.code === expectedKey) {
        const nextProgress = konamiProgress + 1;
        if (nextProgress === KONAMI_CODE.length) {
          setShowCredits(true);
          lastOpenedRef.current = Date.now();
          setKonamiProgress(0);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        // Direct reset on mistake
        setKonamiProgress(e.code === KONAMI_CODE[0] ? 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, showCredits]);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (showCredits) return;
      
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input')) {
        setTapCount(0);
        return;
      }

      const now = Date.now();
      const timeDiff = now - lastTapRef.current;
      
      if (timeDiff > 3000) {
        setTapCount(1);
      } else {
        const nextCount = tapCount + 1;
        if (nextCount === 7) {
          setShowCredits(true);
          lastOpenedRef.current = Date.now();
          setTapCount(0);
        } else {
          setTapCount(nextCount);
        }
      }
      lastTapRef.current = now;
    };

    window.addEventListener('touchstart', handleTouch);
    return () => window.removeEventListener('touchstart', handleTouch);
  }, [tapCount, showCredits]);

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

      {/* CREDITS MODAL */}
      {showCredits && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-md p-4"
          onClick={() => {
            // Prevent accidental closure if tapping quickly
            if (Date.now() - lastOpenedRef.current > 1500) {
              setShowCredits(false);
            }
          }}
        >
          <div 
            className="credits-modal-enter w-full max-w-sm bg-[#0D1A0D] border-[0.5px] border-[#1D9E75] p-10 flex flex-col items-center gap-6 text-center select-none shadow-[0_0_50px_rgba(29,158,117,0.1)]"
            onClick={e => e.stopPropagation()}
          >
            <h2 
              className="text-[#39FF14] text-xl font-black tracking-[4px] glitch-text m-0" 
              data-text="CREDITOS.EXE"
            >
              CREDITOS.EXE
            </h2>
            <div className="w-full h-px bg-[#1D9E75]/30" />
            
            <div className="flex flex-col gap-8 font-mono text-xs tracking-[2px] text-[#1D9E75]">
              <div className="flex flex-col gap-2">
                <span className="opacity-60">CREADO POR</span>
                <span className="text-[#39FF14] text-sm font-bold">JUAN MUÑOZ</span>
              </div>

              <div className="flex flex-col gap-2 italic">
                <span>CON IA Y MUCHO AMOR</span>
              </div>

              <div className="flex flex-col gap-1 text-[10px] opacity-40 mt-4">
                <span>© 2026 GLITCHRUN</span>
                <span>TODOS LOS DERECHOS RESERVADOS</span>
              </div>

              <div className="mt-6 text-[#39FF14] animate-pulse">
                YOU ARE THE GLITCH.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
