import { COLORS } from '../constants/colors';

interface HUDProps {
  scores: { p1: number; p2: number };
  highScore: number;
  gameMode: 'SINGLE' | 'COOP';
  onHome: () => void;
}

export const HUD = ({ scores, highScore, gameMode, onHome }: HUDProps) => {
  const formatScore = (s: number) => s.toString().padStart(6, '0');

  return (
    <div className="absolute top-0 left-0 w-full h-12 md:h-14 flex items-center justify-between px-4 md:px-8 bg-[#080C08]/90 border-b-2 border-[#1a2e1a] z-50">
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={onHome}
          className="text-sm font-bold tracking-[1px] md:tracking-[2px] text-[#1D9E75] hover:text-[#00FFFF] transition-colors border-none p-0 min-h-0 bg-transparent"
        >
          [ SALIR ]
        </button>
        
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[1px] md:tracking-[2px] text-[#1D9E75] leading-none opacity-70">P1</span>
          <span className="text-base md:text-lg font-bold tracking-[2px] md:tracking-[4px] text-[#39FF14]">
            {formatScore(scores.p1)}
          </span>
        </div>

        {gameMode === 'COOP' && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[1px] md:tracking-[2px] text-[#1D9E75] leading-none opacity-70">P2</span>
            <span className="text-base md:text-lg font-bold tracking-[2px] md:tracking-[4px] text-[#00FFFF]">
              {formatScore(scores.p2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end">
        <span className="text-sm font-bold tracking-[1px] md:tracking-[2px] text-[#1D9E75] leading-none opacity-70">MEJOR_PUNTAJE</span>
        <span className="text-base md:text-lg font-bold tracking-[2px] md:tracking-[4px] text-[#FAC775]">
          {formatScore(highScore)}
        </span>
      </div>
    </div>
  );
};
