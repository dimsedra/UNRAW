export interface Release {
  id: string;
  title: string;
  year: string;
  type: 'ALBUM' | 'SINGLE' | 'EP';
  coverImg: string;
  description: string;
  tracks: string[];
  // Technical Metadata
  bpm?: string;
  duration?: string;
  version?: string;
  bitrate?: string;
  indexCode?: string;
}

export const unrawDiscography: Release[] = [
  {
    id: 'plateau-vol1',
    title: 'Plateau Vol. 1',
    year: '2026',
    type: 'ALBUM',
    coverImg: '/assets/members/natty/natty-unraw-profile-3.jpg',
    description: 'An immersive sonic journey. Plateau Vol. 1 serves as the foundational sound for the UNRAW universe, blending atmospheric pads with driving rhythms.',
    tracks: [
      'Void Entrance',
      'Atmospheric Drift',
      'Structural Core',
      'Resonance Gate',
      'Sustained State',
      'Quiet Gravity',
      'Obsidian Flow',
      'Final Descent'
    ],
    bpm: '108',
    duration: '42:15',
    version: '1.0.4',
    bitrate: '24-bit / 48kHz',
    indexCode: 'UN-R-001'
  },
  {
    id: 'system-state-01',
    title: 'System State 01',
    year: '2025',
    type: 'EP',
    coverImg: '/assets/members/yujin/yujin-unraw-profile-2.jpg',
    description: 'Our debut EP, exploring the intersection of industrial textures and melodic clarity.',
    tracks: [
      'Initialization',
      'Protocol Beta',
      'Memory Leak',
      'Signal Path'
    ],
    bpm: '124',
    duration: '18:12',
    version: '0.9.8',
    bitrate: '24-bit / 96kHz',
    indexCode: 'UN-R-002'
  },
  {
    id: 'deliberate-not-decorative',
    title: 'Deliberate',
    year: '2025',
    type: 'SINGLE',
    coverImg: '/assets/members/danielle/danielle-unraw-profile-3.jpg',
    description: 'A musical statement on minimalism. Stripping away the excess to find the core message of the song.',
    tracks: [
      'Deliberate (Original Mix)',
      'Decorative (Absence Mix)'
    ],
    bpm: '98',
    duration: '08:44',
    version: '2.1.0',
    bitrate: '24-bit / 44.1kHz',
    indexCode: 'UN-R-003'
  }
];
