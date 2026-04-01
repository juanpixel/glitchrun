import { COLORS } from '../constants/colors';

interface GameOverScreenProps {
  scores: { p1: number; p2: number };
  highScore: number;
  gameMode: 'SINGLE' | 'COOP';
  onRetry: () => void;
  onEdit: () => void;
  onExit: () => void;
}

export const GameOverScreen = ({ scores, highScore, gameMode, onRetry, onEdit, onExit }: GameOverScreenProps) => {
  const formatScore = (s: number) => s.toString().padStart(6, '0');

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FF2D6B]/20 z-40 backdrop-blur-sm px-4">
      <div className="bg-[#080C08] p-6 md:p-12 border-4 border-[#FF2D6B] shadow-[0_0_50px_rgba(255,45,107,0.3)] flex flex-col items-center w-full max-w-[340px] md:max-w-md">
        <h1 className="mb-8 text-[#FF2D6B] uppercase glitch-text tracking-[8px] md:tracking-[16px]" data-text="GAME_OVER">
          GAME_OVER
        </h1>
        
        <div className="flex flex-col gap-4 items-center mb-10 w-full">
          <div className="flex flex-col items-center">
            <span className="text-sm text-[#1D9E75] tracking-[4px]">PLAYER_1_FINAL_SCORE</span>
            <span className="text-2xl md:text-3xl text-[#39FF14] font-bold tracking-[8px]">
              {formatScore(scores.p1)}
            </span>
          </div>

          {gameMode === 'COOP' && (
            <div className="flex flex-col items-center mt-2">
              <span className="text-sm text-[#1D9E75] tracking-[4px]">PLAYER_2_FINAL_SCORE</span>
              <span className="text-2xl md:text-3xl text-[#00FFFF] font-bold tracking-[8px]">
                {formatScore(scores.p2)}
              </span>
            </div>
          )}

          <div className="mt-4 flex flex-col items-center border-t border-[#1a2e1a] pt-4 w-full">
            <span className="text-sm text-[#FAC775] tracking-[4px]">SISTEMA_HIGH_SCORE</span>
            <span className="text-lg md:text-xl text-[#FAC775] font-bold tracking-[4px]">
              {formatScore(highScore)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={onRetry}
            className="w-full py-4 bg-[#39FF14] text-[#080C08] font-black tracking-[4px] shadow-[0_0_20px_rgba(57,255,20,0.2)] text-sm"
          >
            REINTENTAR
          </button>
          <button 
            onClick={onEdit}
            className="w-full py-3 border-2 border-[#00FFFF] text-[#00FFFF] font-bold tracking-[2px] md:tracking-[4px] hover:bg-[#00FFFF]/10 transition-all text-sm"
          >
            EDITAR_ENTIDAD
          </button>
          <button 
            onClick={onExit}
            className="mt-4 text-sm text-[#1D9E75] hover:text-[#FF2D6B] tracking-[2px] transition-colors self-center p-2"
          >
            [ SALIR_AL_SISTEMA ]
          </button>
        </div>
      </div>
    </div>
  );
};
