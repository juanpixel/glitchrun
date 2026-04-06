import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star } from 'lucide-react';

export const Result: React.FC = () => {
  return (
    <section id="result" className="container mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#0D1A0D] border-2 border-neon-green p-10 md:p-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-neon-green opacity-40">SYSTEM_REPORT_V1.0.0</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-[8px] text-neon-green uppercase mb-12 border-b border-[#1a2e1a] pb-6">
          RESULTADO.EXE
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <ul className="space-y-6 font-mono tracking-[2px] text-neon-green">
            {[
              "Publicado en web y móvil (cross-platform)",
              "Sistema de personajes personalizables",
              "Persistencia en DB (records globales)"
            ].map((item) => (
              <li key={item} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            <li className="flex items-start gap-4 text-[#FAC775]">
              <Star className="w-5 h-5 mt-0.5 shrink-0" />
              <span>Easter egg: Konami code activo</span>
            </li>
          </ul>
          
          <div className="bg-dark-bg p-6 border border-[#1a2e1a] flex flex-col justify-between">
            <div>
              <h5 className="text-muted-green text-xs font-bold mb-4 tracking-[3px]">Próximos pasos:</h5>
              <div className="space-y-3 font-mono text-[13px] text-muted-green mb-8">
                <p>&gt; Iteración de mecánicas de salto</p>
                <p>&gt; Corrección de bugs de colisión</p>
                <p>&gt; Mejora de UX en menú de opciones</p>
                <p className="animate-pulse">_</p>
              </div>
            </div>
            <button className="w-full bg-neon-green text-dark-bg font-bold px-6 py-3 tracking-[4px] uppercase hover:shadow-[4px_4px_0_0_#00FFFF] active:translate-x-[2px] transition-all text-sm">
              PLAY_NOW
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
