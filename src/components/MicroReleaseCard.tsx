import { useState, useEffect, useRef } from 'react';
import { type MicroRelease } from '../types';

interface Props {
  release: MicroRelease;
}

export default function MicroReleaseCard({ release }: Props) {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(release.durationSec);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && running) {
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [timeLeft, running]);

  const reset = () => { setRunning(false); setTimeLeft(release.durationSec); };

  return (
    <div className="rounded-2xl p-4 mb-3" style={{ background: '#2d1b40' }}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-sm" style={{ color: '#e8dff0' }}>{release.name}</h4>
          <p className="text-xs mt-0.5" style={{ color: '#9b72cf' }}>{release.zone}</p>
        </div>
        <span className="text-lg font-mono font-bold" style={{ color: timeLeft <= 0 ? '#7bc8a4' : '#e8dff0' }}>
          {timeLeft <= 0 ? '✓' : `${timeLeft}s`}
        </span>
      </div>
      <p className="text-xs mb-3" style={{ color: '#a893b8' }}>{release.description}</p>
      <div className="flex gap-2">
        {!running ? (
          <button onClick={() => { setTimeLeft(release.durationSec); setRunning(true); }}
            className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: '#9b72cf', color: '#fff' }}>
            {timeLeft <= 0 ? 'Again' : 'Start'}
          </button>
        ) : (
          <button onClick={() => setRunning(false)}
            className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: '#3d2855', color: '#e8dff0' }}>
            Pause
          </button>
        )}
        {(running || timeLeft < release.durationSec) && (
          <button onClick={reset}
            className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: '#3d2855', color: '#a893b8' }}>
            Reset
          </button>
        )}
      </div>
      {running && (
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: '#3d2855' }}>
          <div className="h-full rounded-full transition-all duration-1000" style={{
            width: `${(timeLeft / release.durationSec) * 100}%`, background: '#9b72cf'
          }} />
        </div>
      )}
    </div>
  );
}
