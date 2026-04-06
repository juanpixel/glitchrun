import React from 'react';
import { Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-dark-bg/90 backdrop-blur-sm flex justify-between items-center px-6 py-4 border-b border-[#1a2e1a]">
      <div className="text-2xl font-bold tracking-[8px] text-neon-green font-mono uppercase">
        GLITCHRUN
      </div>
      <nav className="hidden md:flex gap-8">
        {['HERO', 'IDEA', 'TOOLS', 'PROCESS', 'RESULT'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-mono uppercase tracking-[4px] font-bold text-[14px] text-muted-green hover:text-neon-green transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button className="bg-transparent border border-neon-green px-4 py-1 text-neon-green font-mono font-bold tracking-[2px] hover:bg-neon-green hover:text-dark-bg transition-all">
          PLAY_NOW
        </button>
        <Terminal className="text-neon-green cursor-pointer hover:opacity-80 w-6 h-6" />
      </div>
    </header>
  );
};
