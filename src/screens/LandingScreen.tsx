import React from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  PenTool,
  Brain,
  BookOpen,
  Cpu,
  Rocket,
  Database,
  Cloud,
  CheckCircle2,
  Star
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PRESETS } from '../constants/presets';
import { GamePreview } from '../components/GamePreview';

interface GlitchTextProps {
  text: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text }) => (
  <span className="glitch-text" data-text={text}>
    {text}
  </span>
);

const Navbar = ({ onBack }: { onBack: () => void }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-[150] bg-[#080C08]/90 backdrop-blur-sm flex justify-between items-center px-6 py-4 border-b border-[#1a2e1a]">
      <div className="text-2xl font-bold tracking-[8px] text-[#39FF14] font-mono uppercase">
        GLITCHRUN
      </div>
      <nav className="hidden md:flex gap-8">
        {['HERO', 'IDEA', 'TOOLS', 'PROCESS', 'RESULT'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => handleScroll(e, item.toLowerCase())}
            className="font-mono uppercase tracking-[4px] font-bold text-[14px] text-[#1D9E75] hover:text-[#39FF14] transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="bg-transparent border border-[#39FF14] px-4 py-1 text-[#39FF14] font-mono font-bold tracking-[2px] hover:bg-[#39FF14] hover:text-[#080C08] transition-all min-h-0"
        >
          PLAY_NOW
        </button>
        <Terminal className="text-[#39FF14] cursor-pointer hover:opacity-80 w-6 h-6" />
      </div>
    </header>
  );
};

const Hero = ({ onBack, activeSprite }: { onBack: () => void, activeSprite: string[][] }) => (
  <section id="hero" className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[85vh] pt-24">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl">
      {/* Left Column: Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-left"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-[12px] text-[#39FF14] uppercase mb-4 leading-tight">
          <GlitchText text="GLITCHRUN" />
        </h1>
        <p className="text-[#39FF14] font-mono text-lg md:text-xl tracking-[4px] mb-8 opacity-80 uppercase">
          Un juego retro construido con IA
        </p>

        <div className="bg-[#0D1A0D]/50 border border-[#1a2e1a] p-8 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#39FF14] opacity-20"></div>
          <p className="font-mono text-[14px] md:text-[15px] leading-relaxed tracking-[1px] text-[#1D9E75] mb-8 normal-case max-w-lg">
            La idea era simple — recrear la sensación de los arcades de los 90 usando IA como motor creativo. Un experimento personal para aprender haciendo algo divertido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBack}
              className="bg-[#39FF14] text-[#080C08] font-bold px-8 py-4 tracking-[4px] uppercase hover:shadow-[4px_4px_0_0_#00FFFF] active:translate-x-[2px] transition-all text-sm"
            >
              PLAY_NOW
            </button>

            <a
              href="#idea"
              className="border border-[#39FF14]/30 text-[#39FF14] font-bold px-8 py-4 tracking-[4px] uppercase hover:bg-[#39FF14]/10 active:translate-x-[2px] transition-all text-center no-underline text-sm"
            >
              LEER_MAS
            </a>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Game Animation */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 w-full flex justify-center lg:justify-end"
      >
        <GamePreview 
          activeSprite={activeSprite} 
          className="shadow-[0_0_50px_rgba(57,255,20,0.1)] border-[#39FF14]/20"
        />
      </motion.div>
    </div>
  </section>
);

const Idea = () => (
  <section id="idea" className="container mx-auto px-6 py-24">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-[6px] text-[#39FF14] uppercase text-left">
          _IDEA
        </h2>
        <div className="space-y-4 font-mono tracking-[2px] text-[#1D9E75] leading-loose normal-case">
          <p>GlitchRun nació como un desafío técnico para explorar el potencial de las herramientas de IA en el desarrollo de videojuegos.</p>
          <p>Inspirado por la estética cruda de los 90, es un runner 2D infinito donde la comunidad puede personalizar personajes y dejar su marca en el leaderboard.</p>
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="border-l-2 border-[#39FF14] pl-4">
              <span className="block text-[#39FF14] text-xs opacity-60 uppercase">Status</span>
              <span className="text-sm font-bold text-white uppercase">Public Alpha</span>
            </div>
            <div className="border-l-2 border-[#39FF14] pl-4">
              <span className="block text-[#39FF14] text-xs opacity-60 uppercase">Engine</span>
              <span className="text-sm font-bold text-white uppercase">AI Assisted</span>
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
          alt="Glitchrun Experience"
          className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
          src="/assets/img/Proceso.png"
        />
        <div className="absolute inset-0 border-[20px] border-transparent group-hover:border-[#39FF14]/10 pointer-events-none transition-all"></div>
      </motion.div>
    </div>
  </section>
);

const tools = [
  { icon: <PenTool className="w-8 h-8" />, name: "STITCH", description: "Prototipo visual inicial y exploración de assets.", span: "md:col-span-2" },
  { icon: <Brain className="w-8 h-8" />, name: "CLAUDE", description: "Guía de diseño, PRD y wireframes estructurales." },
  { icon: <BookOpen className="w-8 h-8" />, name: "NOTEBOOKLM", description: "Research y síntesis de documentación técnica." },
  { icon: <Cpu className="w-8 h-8" />, name: "GOOGLE AI STUDIO", description: "Generación del primer MVP y lógica de físicas." },
  { icon: <Rocket className="w-8 h-8" />, name: "ANTIGRAVITY + CLAUDE", description: "Orquestación del producto final y refinamiento de código.", span: "md:col-span-2" },
  { icon: <Database className="w-8 h-8" />, name: "SUPABASE", description: "Persistencia de datos y leaderboards en tiempo real." },
  { icon: <Cloud className="w-8 h-8" />, name: "GITHUB + VERCEL", description: "Control de versiones y despliegue de la demo pública." }
];

const TechStack = () => (
  <section id="tools" className="container mx-auto px-6 py-24">
    <h2 className="text-4xl md:text-5xl font-bold tracking-[6px] text-[#39FF14] uppercase mb-12 text-center">
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
          className={`${tool.span || ""} bg-[#0D1A0D] border border-[#1a2e1a] p-6 hover:border-[#39FF14] transition-colors group`}
        >
          <div className="text-[#39FF14] mb-4 group-hover:scale-110 transition-transform duration-300">
            {tool.icon}
          </div>
          <h3 className="font-bold text-[#39FF14] tracking-[2px] mb-2 uppercase">{tool.name}</h3>
          <p className="font-mono text-xs text-[#1D9E75] tracking-[1px] normal-case">{tool.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const steps = [
  { id: "01", title: "IDENTIDAD_FALLIDA", description: "El nombre inicial \"Phantix\" fue descartado. Buscábamos algo que explicara el origen del error como mecánica.", color: "bg-[#39FF14]" },
  { id: "02", title: "ITERACIÓN_VISUAL", description: "Rompiendo pantallas y textos. La IA generó decenas de variaciones de \"degradación de texto\" hasta lograr el efecto glitch ideal.", color: "bg-[#39FF14]" },
  { id: "03", title: "CONFLICTO_DE_DISEÑO", description: "Problemas críticos en el alineamiento de botones y UI responsiva. El motor IA tuvo que reconstruir el grid tres veces.", color: "bg-[#FF2D6B]" },
  { id: "04", title: "DESARROLLO_FLASH", description: "Construido en un mes, dedicando solo 1-2 horas diarias. Un testimonio de la velocidad de trabajo con IA.", color: "bg-[#39FF14]" }
];

const Process = () => (
  <section id="process" className="container mx-auto px-6 py-24 max-w-4xl">
    <h2 className="text-4xl md:text-5xl font-bold tracking-[6px] text-[#39FF14] uppercase mb-16 text-center">
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
          <div className={`absolute -left-[9px] top-0 w-4 h-4 ${step.color} border-4 border-[#080C08]`}></div>
          <h4 className={`font-bold ${step.color === 'bg-[#FF2D6B]' ? 'text-[#FF2D6B]' : 'text-[#39FF14]'} tracking-[2px] mb-2 uppercase`}>
            {step.id}. {step.title}
          </h4>
          <p className="font-mono text-sm text-[#1D9E75] tracking-[1px] leading-relaxed normal-case">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Result = ({ onBack }: { onBack: () => void }) => (
  <section id="result" className="container mx-auto px-6 py-24">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#0D1A0D] border-2 border-[#39FF14] p-10 md:p-16 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#39FF14] opacity-40">SYSTEM_REPORT_V1.0.0</div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-[8px] text-[#39FF14] uppercase mb-12 border-b border-[#1a2e1a] pb-6 text-left">
        RESULTADO.EXE
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <ul className="space-y-6 font-mono tracking-[2px] text-[#39FF14] list-none p-0 uppercase">
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

        <div className="bg-[#080C08] p-6 border border-[#1a2e1a] flex flex-col justify-between">
          <div>
            <h5 className="text-[#1D9E75] text-xs font-bold mb-4 tracking-[3px] uppercase">Próximos pasos:</h5>
            <div className="space-y-3 font-mono text-[13px] text-[#1D9E75] mb-8 normal-case">
              <p>&gt; Iteración de mecánicas de salto</p>
              <p>&gt; Corrección de bugs de colisión</p>
              <p>&gt; Mejora de UX en menú de opciones</p>
              <p className="animate-pulse">_</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-[#39FF14] text-[#080C08] font-bold px-6 py-3 tracking-[4px] uppercase hover:shadow-[4px_4px_0_0_#00FFFF] active:translate-x-[2px] transition-all text-sm h-auto"
          >
            PLAY_NOW
          </button>
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-8 border-t border-[#1a2e1a] bg-[#080C08] flex flex-col md:flex-row justify-between items-center px-10 gap-4">
    <div className="text-sm font-bold text-[#1D9E75] font-mono uppercase tracking-[2px]">
      GLITCHRUN_SYSTEMS
    </div>
    <div className="font-mono uppercase tracking-[2px] text-[10px] text-[#1D9E75]">
      ©2024 GLITCHRUN_SYSTEMS [V1.0]
    </div>
    <div className="flex gap-8">
      {['DOCS', 'GITHUB', 'SUPPORT'].map((item) => (
        <a
          key={item}
          href="#"
          className="font-mono uppercase tracking-[2px] text-[10px] text-[#1D9E75] hover:text-[#39FF14] hover:underline underline-offset-4"
        >
          {item}
        </a>
      ))}
    </div>
  </footer>
);

export const LandingScreen = ({ onBack }: { onBack: () => void }) => {
  const [characterPool, setCharacterPool] = React.useState<string[][][]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Initial setup: combine presets and fetch DB characters
  React.useEffect(() => {
    const defaultSprites = Object.values(PRESETS).map(sprite => 
      sprite.map(row => row.map(cell => cell === 'PLACEHOLDER' ? '#39FF14' : cell))
    );

    const loadCharacters = async () => {
      const { data, error } = await supabase
        .from('characters')
        .select('sprite_data')
        .limit(10)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const dbSprites = data.map(item => item.sprite_data);
        // Shuffle and combine
        const combined = [...defaultSprites, ...dbSprites].sort(() => Math.random() - 0.5);
        setCharacterPool(combined);
      } else {
        setCharacterPool(defaultSprites);
      }
    };

    loadCharacters();
  }, []);

  // Timer for character rotation
  React.useEffect(() => {
    if (characterPool.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % characterPool.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [characterPool]);

  const activeSprite = characterPool.length > 0 
    ? characterPool[currentIndex] 
    : Object.values(PRESETS)[0].map(row => row.map(cell => cell === 'PLACEHOLDER' ? '#39FF14' : cell));

  return (
    <div className="fixed inset-0 bg-[#080C08] z-[100] overflow-y-auto selection:bg-[#39FF14] selection:text-[#080C08] scroll-smooth">
      <div className="scanline" />
      <Navbar onBack={onBack} />
      <main className="space-y-12">
        <Hero onBack={onBack} activeSprite={activeSprite} />
        <Idea />
        <TechStack />
        <Process />
        <Result onBack={onBack} />
      </main>
      <Footer />
    </div>
  );
};
