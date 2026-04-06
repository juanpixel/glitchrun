import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 border-t border-[#1a2e1a] bg-dark-bg flex flex-col md:flex-row justify-between items-center px-10 gap-4">
      <div className="text-sm font-bold text-muted-green font-mono uppercase tracking-[2px]">
        GLITCHRUN_SYSTEMS
      </div>
      <div className="font-mono uppercase tracking-[2px] text-[10px] text-muted-green">
        ©2024 GLITCHRUN_SYSTEMS [V1.0]
      </div>
      <div className="flex gap-8">
        {['DOCS', 'GITHUB', 'SUPPORT'].map((item) => (
          <a
            key={item}
            href="#"
            className="font-mono uppercase tracking-[2px] text-[10px] text-muted-green hover:text-neon-green hover:underline underline-offset-4"
          >
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
};
