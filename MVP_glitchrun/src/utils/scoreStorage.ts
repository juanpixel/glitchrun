export interface ScoreEntry {
  initials: string;
  score: number;
  date: string;
}

export type GameMode = 'SINGLE' | 'COOP';

const STORAGE_KEY = 'glitchrun_leaderboard';

interface LeaderboardData {
  SINGLE: ScoreEntry[];
  COOP: ScoreEntry[];
}

const getInitialData = (): LeaderboardData => ({
  SINGLE: [
    { initials: 'G-7', score: 5000, date: new Date().toISOString() },
    { initials: 'XOR', score: 4000, date: new Date().toISOString() },
    { initials: 'VOD', score: 3000, date: new Date().toISOString() },
  ],
  COOP: [
    { initials: 'G7+XR', score: 8000, date: new Date().toISOString() },
  ]
});

export const getScores = (mode: GameMode): ScoreEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initial = getInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial[mode];
  }
  try {
    const parsed = JSON.parse(data);
    return parsed[mode] || [];
  } catch (e) {
    console.error('Error parsing leaderboard data', e);
    return [];
  }
};

export const saveScore = (mode: GameMode, initials: string, score: number) => {
  const data = localStorage.getItem(STORAGE_KEY);
  const parsed = data ? JSON.parse(data) : getInitialData();
  
  const newEntry: ScoreEntry = { 
    initials: initials.toUpperCase(), 
    score, 
    date: new Date().toISOString() 
  };
  
  const scores = [...(parsed[mode] || []), newEntry];
  
  // Sort by score (desc), then date (desc)
  const sorted = scores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 10);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, [mode]: sorted }));
};

export const isHighScore = (mode: GameMode, score: number): boolean => {
  if (score <= 0) return false;
  const scores = getScores(mode);
  if (scores.length < 10) return true;
  return score > scores[scores.length - 1].score;
};
