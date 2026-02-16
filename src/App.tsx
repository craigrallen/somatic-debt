import { useState, useCallback } from 'react';
import { type Zone, ALL_ZONES, MICRO_RELEASES, type CheckIn } from './types';
import { saveCheckIn, getTodayCheckIns, getLast7DaysCheckIns } from './store';
import BodyMap from './components/BodyMap';
import ZoneSlider from './components/ZoneSlider';
import DebtScore from './components/DebtScore';
import MicroReleaseCard from './components/MicroReleaseCard';
import DailyLog from './components/DailyLog';
import TrendsChart from './components/TrendsChart';

type Tab = 'body' | 'log' | 'releases' | 'trends';

export default function App() {
  const [zoneLevels, setZoneLevels] = useState<Record<Zone, number>>(
    Object.fromEntries(ALL_ZONES.map(z => [z, 0])) as Record<Zone, number>
  );
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [tab, setTab] = useState<Tab>('body');
  const [todayCheckIns, setTodayCheckIns] = useState<CheckIn[]>(getTodayCheckIns());
  const [weekCheckIns, setWeekCheckIns] = useState<CheckIn[]>(getLast7DaysCheckIns());

  const totalScore = ALL_ZONES.reduce((sum, z) => sum + zoneLevels[z], 0);
  const highZones = ALL_ZONES.filter(z => zoneLevels[z] >= 5);

  const handleCheckIn = useCallback(() => {
    const entries = ALL_ZONES.filter(z => zoneLevels[z] > 0).map(z => ({ zone: z, level: zoneLevels[z] }));
    if (entries.length === 0) return;
    const checkIn: CheckIn = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      zones: entries,
      totalScore,
    };
    saveCheckIn(checkIn);
    setTodayCheckIns(getTodayCheckIns());
    setWeekCheckIns(getLast7DaysCheckIns());
    // Reset
    setZoneLevels(Object.fromEntries(ALL_ZONES.map(z => [z, 0])) as Record<Zone, number>);
  }, [zoneLevels, totalScore]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'body', label: '🧍 Body' },
    { id: 'releases', label: '💆 Release' },
    { id: 'log', label: '📋 Log' },
    { id: 'trends', label: '📈 Trends' },
  ];

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#1a1025' }}>
      {/* Header */}
      <header className="text-center pt-6 pb-2 px-4">
        <h1 className="text-xl font-bold" style={{ color: '#e8dff0' }}>Somatic Debt</h1>
        <p className="text-xs mt-1" style={{ color: '#a893b8' }}>Where are you holding tension?</p>
      </header>

      {/* Tab bar */}
      <nav className="flex justify-center gap-1 px-4 py-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: tab === t.id ? '#9b72cf' : '#2d1b40',
              color: tab === t.id ? '#fff' : '#a893b8',
            }}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 px-4 pb-6 overflow-y-auto">
        {tab === 'body' && (
          <>
            <DebtScore score={totalScore} maxScore={100} />
            <BodyMap zoneLevels={zoneLevels} onZoneTap={setActiveZone} />
            {totalScore > 0 && (
              <div className="mt-4 text-center">
                <button onClick={handleCheckIn}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={{ background: '#9b72cf', color: '#fff' }}>
                  Save Check-in
                </button>
              </div>
            )}
          </>
        )}

        {tab === 'releases' && (
          <div className="mt-2">
            <h2 className="text-sm font-semibold mb-3" style={{ color: '#a893b8' }}>
              {highZones.length > 0 ? 'Recommended Releases' : 'All Micro-Releases'}
            </h2>
            {(highZones.length > 0 ? highZones : ALL_ZONES).map(z => (
              <MicroReleaseCard key={z} release={MICRO_RELEASES[z]} />
            ))}
          </div>
        )}

        {tab === 'log' && (
          <div className="mt-2">
            <h2 className="text-sm font-semibold mb-3" style={{ color: '#a893b8' }}>Today's Check-ins</h2>
            <DailyLog checkIns={todayCheckIns} />
          </div>
        )}

        {tab === 'trends' && (
          <div className="mt-2">
            <h2 className="text-sm font-semibold mb-3" style={{ color: '#a893b8' }}>7-Day Trend</h2>
            <TrendsChart checkIns={weekCheckIns} />
          </div>
        )}
      </main>

      {/* Zone slider modal */}
      {activeZone && (
        <ZoneSlider
          zone={activeZone}
          value={zoneLevels[activeZone]}
          onChange={val => setZoneLevels(prev => ({ ...prev, [activeZone]: val }))}
          onClose={() => setActiveZone(null)}
        />
      )}
    </div>
  );
}
