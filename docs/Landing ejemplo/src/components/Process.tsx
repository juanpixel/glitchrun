import React from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    id: "01",
    title: "IDENTIDAD_FALLIDA",
    description: "El nombre inicial \"Phantix\" fue descartado. Buscábamos algo que explicara el origen del error como mecánica.",
    color: "bg-neon-green"
  },
  {
    id: "02",
    title: "ITERACIÓN_VISUAL",
    description: "Rompiendo pantallas y textos. La IA generó decenas de variaciones de \"degradación de texto\" hasta lograr el efecto glitch ideal.",
    color: "bg-neon-green"
  },
  {
    id: "03",
    title: "CONFLICTO_DE_DISEÑO",
    description: "Problemas críticos en el alineamiento de botones y UI responsiva. El motor IA tuvo que reconstruir el grid tres veces.",
    color: "bg-glitch-pink"
  },
  {
    id: "04",
    title: "DESARROLLO_FLASH",
    description: "Construido en un mes, dedicando solo 1-2 horas diarias. Un testimonio de la velocidad de trabajo con IA.",
    color: "bg-neon-green"
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="container mx-auto px-6 py-24 max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-bold tracking-[6px] text-neon-green uppercase mb-16 text-center">
        _EL_PROCESO
      </h2>
      <div className="relative border-l-2 border-[#1a2e1a] ml-4 space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative pl-10"
          >
            <div className={`absolute -left-[9px] top-0 w-4 h-4 ${step.color} border-4 border-dark-bg`}></div>
            <h4 className={`font-bold ${step.color === 'bg-glitch-pink' ? 'text-glitch-pink' : 'text-neon-green'} tracking-[2px] mb-2`}>
              {step.id}. {step.title}
            </h4>
            <p className="font-mono text-sm text-muted-green tracking-[1px] leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
