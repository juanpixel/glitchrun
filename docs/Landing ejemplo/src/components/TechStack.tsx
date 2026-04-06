import React from 'react';
import { motion } from 'motion/react';
import { 
  PenTool, 
  Brain, 
  BookOpen, 
  Cpu, 
  Rocket, 
  Database, 
  Cloud 
} from 'lucide-react';

const tools = [
  {
    icon: <PenTool className="w-8 h-8" />,
    name: "STITCH",
    description: "Prototipo visual inicial y exploración de assets.",
    span: "md:col-span-2"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    name: "CLAUDE",
    description: "Guía de diseño, PRD y wireframes estructurales."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    name: "NOTEBOOKLM",
    description: "Research y síntesis de documentación técnica."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    name: "GOOGLE AI STUDIO",
    description: "Generación del primer MVP y lógica de físicas."
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    name: "ANTIGRAVITY + CLAUDE",
    description: "Orquestación del producto final y refinamiento de código.",
    span: "md:col-span-2"
  },
  {
    icon: <Database className="w-8 h-8" />,
    name: "SUPABASE",
    description: "Persistencia de datos y leaderboards en tiempo real."
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    name: "GITHUB + VERCEL",
    description: "Control de versiones y despliegue de la demo pública."
  }
];

export const TechStack: React.FC = () => {
  return (
    <section id="tools" className="container mx-auto px-6 py-24">
      <h2 className="text-4xl md:text-5xl font-bold tracking-[6px] text-neon-green uppercase mb-12 text-center">
        _TECH_STACK
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${tool.span || ""} bg-[#0D1A0D] border border-[#1a2e1a] p-6 hover:border-neon-green transition-colors group`}
          >
            <div className="text-neon-green mb-4 group-hover:scale-110 transition-transform duration-300">
              {tool.icon}
            </div>
            <h3 className="font-bold text-neon-green tracking-[2px] mb-2">{tool.name}</h3>
            <p className="font-mono text-xs text-muted-green tracking-[1px]">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
