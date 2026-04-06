import { COLORS } from '../constants/colors';

interface InstructionsScreenProps {
  onBack: () => void;
  onLearnMore: () => void;
}

export const InstructionsScreen = ({ onBack, onLearnMore }: InstructionsScreenProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center bg-[#080C08]/95 z-50 p-6 md:p-12 overflow-y-auto">
      <div className="w-full max-w-4xl">
        <h2 className="text-matrix tracking-[4px] text-left" style={{ fontSize: '18px' }}>SISTEMA DE ENTRENAMIENTO</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Objetivos */}
          <div className="border border-[#1a2e1a] p-6 bg-[#0D1A0D]/50">
            <h3 className="text-[#39FF14] text-sm mb-4 tracking-[4px] border-b border-[#1a2e1a] pb-2 font-bold uppercase">
              01_OBJETIVO_MISIÓN
            </h3>
            <p className="text-sm text-[#1D9E75] leading-relaxed tracking-[1px]">
              SOBREVIVE AL GLITCH. LAS ANOMALÍAS <span className="text-[#FF2D6B] font-bold">[ROJAS]</span> COMPROMETEN LA INTEGRIDAD DEL AGENTE.
              MANTÉN EL DESPLIEGUE PARA AUMENTAR EL ÍNDICE DE PUNTUACIÓN.
            </p>
          </div>

          {/* Controles */}
          <div className="border border-[#1a2e1a] p-6 bg-[#0D1A0D]/50">
            <h3 className="text-[#00FFFF] text-sm mb-4 tracking-[4px] border-b border-[#1a2e1a] pb-2 font-bold uppercase">
              02_CONTROL_DE_AGENTE
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#Deep] mb-1 opacity-70">AGENTE_01 (P1):</p>
                <p className="text-sm text-[#39FF14] font-bold">[W] / [ESPACIO] / [TAP_SCREEN]</p>
              </div>
              <div>
                <p className="text-sm text-[#Deep] mb-1 opacity-70">AGENTE_02 (P2):</p>
                <p className="text-sm text-[#00FFFF] font-bold">[I] / [FLECHA_ARRIBA]</p>
              </div>
            </div>
          </div>

          {/* Modo Solo */}
          <div className="border border-[#1a2e1a] p-6 bg-[#0D1A0D]/50">
            <h3 className="text-[#FAC775] text-sm mb-4 tracking-[4px] border-b border-[#1a2e1a] pb-2 font-bold uppercase">
              03_MODO_INDIVIDUAL
            </h3>
            <p className="text-sm text-[#1D9E75] leading-relaxed tracking-[1px]">
              UN SOLO AGENTE DESPLEGADO. LA COLISIÓN RESULTA EN DESCONEXIÓN INMEDIATA.
              SISTEMA OPTIMIZADO PARA MÁXIMA VELOCIDAD.
            </p>
          </div>

          {/* Modo Coop */}
          <div className="border border-[#1a2e1a] p-6 bg-[#0D1A0D]/50">
            <h3 className="text-[#7F77DD] text-sm mb-4 tracking-[4px] border-b border-[#1a2e1a] pb-2 font-bold uppercase">
              04_MODO_COOPERATIVO
            </h3>
            <p className="text-sm text-[#1D9E75] leading-relaxed tracking-[1px]">
              DOS AGENTES COMPARTIENDO EL MISMO SECTOR. EL SISTEMA PERMANECE ACTIVO MIENTRAS AL MENOS
              UN AGENTE SIGA FUNCIONAL. LA COORDINACIÓN ES CRÍTICA.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={onBack}
            className="w-full max-w-xs py-4 bg-[#39FF14] text-[#080C08] font-black tracking-[4px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] text-sm"
          >
            ENTENDIDO
          </button>
          
          <button 
            onClick={onLearnMore}
            className="mt-8 text-[10px] text-[#1D9E75] tracking-[2px] font-mono opacity-60 hover:opacity-100 hover:text-[#39FF14] transition-all underline underline-offset-8 uppercase"
          >
            ( CONOCE_MÁS )
          </button>
        </div>
      </div>
    </div>
  );
};
