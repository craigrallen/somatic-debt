import { type CheckIn } from './types';

const KEY = 'somatic-debt-checkins';

export function loadCheckIns(): CheckIn[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch { return []; }
}

export function saveCheckIn(checkIn: CheckIn) {
  const all = loadCheckIns();
  all.push(checkIn);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getTodayCheckIns(): CheckIn[] {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return loadCheckIns().filter(c => c.timestamp >= start.getTime());
}

export function getLast7DaysCheckIns(): CheckIn[] {
  const start = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return loadCheckIns().filter(c => c.timestamp >= start);
}
