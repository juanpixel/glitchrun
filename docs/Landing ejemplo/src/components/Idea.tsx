import React from 'react';
import { motion } from 'motion/react';

export const Idea: React.FC = () => {
  return (
    <section id="idea" className="container mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[6px] text-neon-green uppercase">
            _IDEA
          </h2>
          <div className="space-y-4 font-mono tracking-[2px] text-muted-green leading-loose">
            <p>GlitchRun nació como un desafío técnico para explorar el potencial de las herramientas de IA en el desarrollo de videojuegos.</p>
            <p>Inspirado por la estética cruda de los 90, es un runner 2D infinito donde la comunidad puede personalizar personajes y dejar su marca en el leaderboard.</p>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="border-l-2 border-neon-green pl-4">
                <span className="block text-neon-green text-xs opacity-60">Status</span>
                <span className="text-sm font-bold text-white">Public Alpha</span>
              </div>
              <div className="border-l-2 border-neon-green pl-4">
                <span className="block text-neon-green text-xs opacity-60">Engine</span>
                <span className="text-sm font-bold text-white">AI Assisted</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group aspect-video overflow-hidden border-2 border-[#1a2e1a]"
        >
          <img
            alt="Retro computer workstation"
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
            src="https://picsum.photos/seed/glitchrun-arcade/1200/800"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[20px] border-transparent group-hover:border-neon-green/10 pointer-events-none transition-all"></div>
        </motion.div>
      </div>
    </section>
  );
};
