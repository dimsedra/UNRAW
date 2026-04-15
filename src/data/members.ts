export interface Member {
  id: string;
  name: string;
  role: string;
  description: string[];
  backgroundColor: string;
  textColor: string;
  index: string;
  gallery: {
    core: string;
    detail: string;
    atmos: string;
  }
}

export const members: Member[] = [
  {
    id: 'natty',
    name: 'NATTY',
    role: '01 / The Rhythm Anchor',
    description: [
      'Her lived-in cool is not a personality she performs. It is what remained after she stopped performing at the music and started moving inside it. The shift happened when she let go of the argument entirely. She stopped trying to look like she belonged inside the groove and simply stayed there.',
      'What people read as effortlessness is actually the absence of effort directed outward. Her husky-sweet tone and percussive phrasing aren\'t reaching. It is a voice that found its register and settled.'
    ],
    backgroundColor: 'var(--obsidian)',
    textColor: 'var(--sand)',
    index: '01',
    gallery: {
      core: '/assets/members/natty/natty-unraw-profile-1.jpg',
      detail: '/assets/members/natty/natty-photoshoot_-_black-leather-bag.jpg',
      atmos: '/assets/members/natty/natty-unraw-profile-3.jpg'
    }
  },
  {
    id: 'yujin',
    name: 'YUJIN',
    role: '02 / The Structural Core',
    description: [
      'Yujin spent a long time being the one who held things together. The commanding presence, the all-rounder intensity. What changed was the realization that the group didn\'t need saving. That the structure she was providing was no longer scaffolding — it had become architecture.',
      'The statuesque quality isn\'t control; it is someone who learned to trust the weight of her own stillness. Her rich chest voice and emotional gravity carry the same quality. It is a voice that accepted it already was powerful.'
    ],
    backgroundColor: 'var(--obsidian-light)',
    textColor: 'var(--sand)',
    index: '02',
    gallery: {
      core: '/assets/members/yujin/yujin-atmos-philosophy.jpg',
      detail: '/assets/members/yujin/yujin-apparel-shot_-_white-art-printed-tshirt.jpg',
      atmos: '/assets/members/yujin/yujin-unraw-profile-2.jpg'
    }
  },
  {
    id: 'danielle',
    name: 'DANIELLE',
    role: '03 / The Narrative Voice',
    description: [
      'Danielle\'s instinct has always been to meet people where they are — not by softening herself, but by arriving at full presence and simply making room. The letting go was refusing to filter anymore. She just stopped apologizing for how much of it there was.',
      'Her tone is warm the way lived-in things are warm — front-facing and textured. She doesn\'t push toward the note. She arrives at it already decided, and the decision is audible in every syllable.'
    ],
    backgroundColor: 'var(--sand)',
    textColor: 'var(--obsidian)',
    index: '03',
    gallery: {
      core: '/assets/members/danielle/danielle-unraw-profile-3.jpg',
      detail: '/assets/members/danielle/danielle-shop-photos_-_white-tank-top.jpg',
      atmos: '/assets/members/danielle/danielle-add-photos-1.jpg'
    }
  },
  {
    id: 'minji',
    name: 'MINJI',
    role: '04 / The Foundation',
    description: [
      'Minji\'s duality — the composed exterior and the quiet, genuine warmth underneath — was never an affectation. It was a gap she was managing. What changed was simple, and not easy: she stopped managing the distance between the two.',
      'The groundedness that defines her stage presence now is not the composed surface winning. It is both registers occupying the same space at the same time. Minji didn\'t become more accessible. She became more whole.'
    ],
    backgroundColor: 'var(--sand-dark)',
    textColor: 'var(--obsidian)',
    index: '04',
    gallery: {
      core: '/assets/members/minji/minji-unraw-profile-2.jpg',
      detail: '/assets/members/minji/minji-photoshoot_-_corduroy jacket.jpg',
      atmos: '/assets/members/minji/minji-unraw-profile-3.jpg'
    }
  }
];
