import { COLORS } from '../constants/colors';

interface MenuScreenProps {
  onSelectMode: (mode: 'SINGLE' | 'COOP') => void;
  onShowInstructions: () => void;
}

export const MenuScreen = ({ onSelectMode, onShowInstructions }: MenuScreenProps) => {
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
        <button 
          onClick={() => onShowInstructions()}
          className="w-full py-3 border border-[#1a2e1a] text-[#1D9E75] hover:text-[#39FF14] hover:border-[#39FF14] transition-all font-bold uppercase tracking-[2px] text-sm mt-2"
        >
          INSTRUCCIONES
        </button>
      </div>
      
      <div className="mt-12 text-sm text-[#1D9E75] flex flex-col items-center gap-2 tracking-[2px] text-center">
        <span>V_0.8.2_STABLE</span>
        <span className="opacity-50">SISTEMA_OPERATIVO_ACTIVO</span>
      </div>
    </div>
  );
};
