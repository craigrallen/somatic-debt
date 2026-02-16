export type Zone = 'jaw' | 'neck' | 'shoulders' | 'upperBack' | 'lowerBack' | 'chest' | 'stomach' | 'hips' | 'hands' | 'feet';

export const ZONE_LABELS: Record<Zone, string> = {
  jaw: 'Jaw', neck: 'Neck', shoulders: 'Shoulders', upperBack: 'Upper Back',
  lowerBack: 'Lower Back', chest: 'Chest', stomach: 'Stomach', hips: 'Hips',
  hands: 'Hands', feet: 'Feet',
};

export interface ZoneEntry {
  zone: Zone;
  level: number; // 0-10
}

export interface CheckIn {
  id: string;
  timestamp: number;
  zones: ZoneEntry[];
  totalScore: number;
}

export interface MicroRelease {
  zone: Zone;
  name: string;
  description: string;
  durationSec: number;
}

export const MICRO_RELEASES: Record<Zone, MicroRelease> = {
  jaw: { zone: 'jaw', name: "Lion's Breath", description: 'Open mouth wide, stick tongue out, exhale forcefully with a "haaa" sound. Repeat 3 times.', durationSec: 30 },
  neck: { zone: 'neck', name: 'Slow Neck Rolls', description: 'Drop chin to chest, slowly roll head to the right, back, left, and forward. Reverse direction.', durationSec: 45 },
  shoulders: { zone: 'shoulders', name: 'Shrug & Drop', description: 'Inhale and shrug shoulders to ears. Hold 5 seconds. Exhale and drop them completely. Repeat 5 times.', durationSec: 40 },
  upperBack: { zone: 'upperBack', name: 'Cat-Cow Stretch', description: 'On all fours, alternate between arching your back (cat) and dropping your belly (cow). Sync with breath.', durationSec: 45 },
  lowerBack: { zone: 'lowerBack', name: 'Knee-to-Chest', description: 'Lie on your back, pull both knees to chest. Rock gently side to side.', durationSec: 45 },
  chest: { zone: 'chest', name: 'Doorway Stretch', description: 'Place forearms on a doorframe, step forward gently. Hold and breathe deeply.', durationSec: 40 },
  stomach: { zone: 'stomach', name: 'Belly Breathing', description: 'Place hands on belly. Inhale deeply for 4 counts, expanding belly. Exhale for 6 counts. Repeat.', durationSec: 50 },
  hips: { zone: 'hips', name: 'Figure-4 Stretch', description: 'Lie on back, cross one ankle over opposite knee. Pull the bottom leg toward you. Switch sides.', durationSec: 60 },
  hands: { zone: 'hands', name: 'Finger Spread & Fist', description: 'Spread fingers wide, hold 3 seconds. Make tight fist, hold 3 seconds. Repeat 8 times.', durationSec: 30 },
  feet: { zone: 'feet', name: 'Toe Scrunch & Spread', description: 'Scrunch toes tightly, hold 5 seconds. Spread them wide, hold 5 seconds. Roll feet on a ball if available.', durationSec: 40 },
};

export const ALL_ZONES: Zone[] = ['jaw', 'neck', 'shoulders', 'upperBack', 'lowerBack', 'chest', 'stomach', 'hips', 'hands', 'feet'];
