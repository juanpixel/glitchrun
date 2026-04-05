import { supabase } from '../lib/supabase';

export interface ScoreEntry {
  initials: string;
  score: number;
  date: string;
}

export type GameMode = 'SINGLE' | 'COOP';

export const getScores = async (mode: GameMode): Promise<ScoreEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('player_name, score, created_at')
      .eq('mode', mode)
      .order('score', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return (data || []).map(row => ({
      initials: row.player_name,
      score: row.score,
      date: row.created_at
    }));
  } catch (e) {
    console.error('Error fetching scores from Supabase', e);
    return [];
  }
};

export const saveScore = async (mode: GameMode, initials: string, score: number) => {
  try {
    const { error } = await supabase
      .from('leaderboard')
      .insert([
        { 
          player_name: initials.toUpperCase(), 
          score, 
          mode 
        }
      ]);

    if (error) throw error;
  } catch (e) {
    console.error('Error saving score to Supabase', e);
  }
};

export const isHighScore = async (mode: GameMode, score: number): Promise<boolean> => {
  if (score <= 0) return false;
  const scores = await getScores(mode);
  if (scores.length < 10) return true;
  return score > scores[scores.length - 1].score;
};
