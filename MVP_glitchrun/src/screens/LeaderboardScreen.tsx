import { useState, useEffect } from 'react';
import { getScores, ScoreEntry, GameMode } from '../utils/scoreStorage';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen = ({ onBack }: LeaderboardScreenProps) => {
  const [activeMode, setActiveMode] = useState<GameMode>('SINGLE');
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setScores(getScores(activeMode));
  }, [activeMode]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080C08] z-50 px-4 overflow-hidden">
      <div className="grid-overlay opacity-20" />
      <div className="scanline opacity-10" />

      <div className="flex flex-col items-center max-w-lg w-full bg-[#080C08]/90 p-8 border-4 border-[#39FF14] shadow-[0_0_30px_rgba(57,255,20,0.2)]">
        <h2 className="text-[#39FF14] text-2xl md:text-3xl font-black tracking-[10px] mb-8 glitch-text" data-text="HALL_OF_FAME">
          HALL_OF_FAME
        </h2>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8 w-full">
          <button 
            onClick={() => setActiveMode('SINGLE')}
            className={`flex-1 py-2 font-bold tracking-[2px] transition-all border-2 ${activeMode === 'SINGLE' ? 'bg-[#39FF14] text-[#080C08] border-[#39FF14]' : 'text-[#39FF14] border-[#39FF14]/30'}`}
          >
            SINGLE
          </button>
          <button 
            onClick={() => setActiveMode('COOP')}
            className={`flex-1 py-2 font-bold tracking-[2px] transition-all border-2 ${activeMode === 'COOP' ? 'bg-[#00FFFF] text-[#080C08] border-[#00FFFF]' : 'text-[#00FFFF] border-[#00FFFF]/30'}`}
          >
            COOP
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="w-full flex flex-col gap-2 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between px-4 text-[10px] text-[#1D9E75] tracking-[4px] border-b border-[#1a2e1a] pb-2 mb-2">
            <span>RANK</span>
            <span className="flex-1 text-center">INITIALS</span>
            <span>SCORE</span>
          </div>

          {scores.length > 0 ? scores.map((entry, index) => (
            <div key={index} className={`flex justify-between items-center px-4 py-2 font-mono ${index === 0 ? 'bg-[#39FF14]/10 border-l-4 border-[#39FF14]' : ''}`}>
              <span className={`w-8 ${index === 0 ? 'text-[#39FF14] scale-125' : 'text-[#1D9E75]'}`}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={`flex-1 text-center font-black tracking-[4px] ${index === 0 ? 'text-[#39FF14]' : 'text-white'}`}>
                {entry.initials}
              </span>
              <span className={`font-black ${index === 0 ? 'text-[#39FF14]' : 'text-[#39FF14]/70'}`}>
                {entry.score.toLocaleString()}
              </span>
            </div>
          )) : (
              <div className="text-center py-8 text-[#1D9E75] animate-pulse">
                _NO_RECORDS_YET_
              </div>
          )}
        </div>

        <button 
          onClick={onBack}
          className="mt-4 px-8 py-3 bg-[#FF2D6B] text-[#080C08] font-black tracking-[4px] shadow-[0_0_20px_rgba(255,45,107,0.3)] hover:scale-105 transition-all text-sm"
        >
          [ VOLVER_ AL_SISTEMA ]
        </button>
      </div>
      
      <div className="mt-8 text-[10px] text-[#1D9E75] tracking-[2px] opacity-50 underline cursor-not-allowed">
        SYNCING_WITH_CORE_DATABASE...
      </div>
    </div>
  );
};
