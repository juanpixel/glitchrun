import React from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] text-center pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-9xl font-bold tracking-[12px] text-neon-green uppercase mb-4">
          <GlitchText text="GLITCHRUN" />
        </h1>
        <p className="text-neon-green font-mono text-lg md:text-xl tracking-[4px] mb-8 max-w-2xl mx-auto opacity-80">
          Un juego retro construido con IA
        </p>
        
        <div className="bg-[#0D1A0D] border border-[#1a2e1a] p-8 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-neon-green opacity-20"></div>
          <p className="font-mono text-[14px] md:text-[16px] leading-relaxed tracking-[2px] text-muted-green mb-8">
            La idea era simple — recrear la sensación de los arcades de los 90 usando IA como motor creativo. Un experimento personal para aprender haciendo algo divertido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-neon-green text-dark-bg font-bold px-8 py-4 tracking-[4px] uppercase hover:shadow-[4px_4px_0_0_#00FFFF] active:translate-x-[2px] transition-all">
              PLAY_NOW
            </button>
            <button className="border border-neon-green text-neon-green font-bold px-8 py-4 tracking-[4px] uppercase hover:bg-[#0D1A0D] active:translate-x-[2px] transition-all">
              LEER_MAS
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
