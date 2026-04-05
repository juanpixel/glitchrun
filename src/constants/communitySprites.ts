import { COLORS } from './colors';

export interface CommunitySprite {
  id: string;
  name: string;
  creator: string;
  likes: string;
  data: string[][];
  category: 'VOTADOS' | 'RECIENTES' | 'ALEATORIO';
}

export const COMMUNITY_SPRITES: CommunitySprite[] = [
  {
    id: '042',
    name: 'STRIKER_X',
    creator: 'PLAYER_042',
    likes: '1.2K',
    category: 'VOTADOS',
    data: [
      ['', '', COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, '', ''],
      ['', COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, ''],
      ['', COLORS.matrix, COLORS.void, COLORS.matrix, COLORS.matrix, COLORS.void, COLORS.matrix, ''],
      ['', COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, ''],
      ['', '', COLORS.matrix, COLORS.matrix, COLORS.matrix, COLORS.matrix, '', ''],
      ['', COLORS.matrix, '', '', '', '', COLORS.matrix, ''],
      ['', COLORS.matrix, '', '', '', '', COLORS.matrix, ''],
      ['', '', '', '', '', '', '', ''],
    ]
  },
  {
    id: '017',
    name: 'GLITCH_KING',
    creator: 'PLAYER_017',
    likes: '890',
    category: 'VOTADOS',
    data: [
      ['', '', COLORS.glitch, COLORS.glitch, COLORS.glitch, COLORS.glitch, '', ''],
      ['', COLORS.glitch, COLORS.glitch, COLORS.void, COLORS.glitch, COLORS.glitch, COLORS.glitch, ''],
      ['', COLORS.glitch, COLORS.glitch, COLORS.void, COLORS.glitch, COLORS.glitch, COLORS.glitch, ''],
      ['', COLORS.glitch, COLORS.glitch, COLORS.glitch, COLORS.glitch, COLORS.glitch, COLORS.glitch, ''],
      ['', COLORS.glitch, COLORS.glitch, COLORS.void, COLORS.glitch, COLORS.glitch, COLORS.glitch, ''],
      ['', '', COLORS.glitch, COLORS.glitch, COLORS.glitch, COLORS.glitch, '', ''],
      ['', '', COLORS.glitch, '', '', COLORS.glitch, '', ''],
      ['', '', '', '', '', '', '', ''],
    ]
  },
  {
    id: '088',
    name: 'VOID_WALKER',
    creator: 'PLAYER_088',
    likes: '654',
    category: 'RECIENTES',
    data: [
      ['', '', '', COLORS.error, COLORS.error, '', '', ''],
      ['', '', COLORS.error, COLORS.error, COLORS.error, COLORS.error, '', ''],
      ['', COLORS.error, COLORS.void, COLORS.error, COLORS.error, COLORS.void, COLORS.error, ''],
      ['', COLORS.error, COLORS.error, COLORS.error, COLORS.error, COLORS.error, COLORS.error, ''],
      ['', '', COLORS.error, COLORS.error, COLORS.error, COLORS.error, '', ''],
      ['', '', COLORS.error, '', '', COLORS.error, '', ''],
      ['', '', COLORS.error, '', '', COLORS.error, '', ''],
      ['', '', '', '', '', '', '', ''],
    ]
  },
  {
    id: '003',
    name: 'NEON_RUNNER',
    creator: 'PLAYER_003',
    likes: '412',
    category: 'RECIENTES',
    data: [
      ['', '', COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, '', ''],
      ['', COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, ''],
      ['', COLORS.amber, COLORS.void, COLORS.amber, COLORS.amber, COLORS.void, COLORS.amber, ''],
      ['', COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, ''],
      ['', COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, COLORS.amber, ''],
      ['', '', COLORS.amber, '', '', COLORS.amber, '', ''],
      ['', '', COLORS.amber, '', '', COLORS.amber, '', ''],
      ['', '', '', '', '', '', '', ''],
    ]
  },
  {
    id: '071',
    name: 'PIXEL_DEMON',
    creator: 'PLAYER_071',
    likes: '201',
    category: 'ALEATORIO',
    data: [
      ['', '', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '', ''],
      ['', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', ''],
      ['#7F77DD', COLORS.void, '#7F77DD', '#7F77DD', '#7F77DD', COLORS.void, '#7F77DD', '#7F77DD'],
      ['#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD'],
      ['', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', '#7F77DD', ''],
      ['', '', '#7F77DD', '', '', '#7F77DD', '', ''],
      ['', '', '#7F77DD', '', '', '#7F77DD', '', ''],
      ['', '', '', '', '', '', '', ''],
    ]
  }
];
