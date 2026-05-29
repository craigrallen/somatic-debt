import { useReducer, useEffect } from 'react';
import { type MicroRelease } from '../types';

interface Props {
  release: MicroRelease;
}

type State = { running: boolean; timeLeft: number };
type Action =
  | { type: 'start'; durationSec: number }
  | { type: 'pause' }
  | { type: 'reset'; durationSec: number }
  | { type: 'tick' };

function timerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start':
      return { running: true, timeLeft: action.durationSec };
    case 'pause':
      return { ...state, running: false };
    case 'reset':
      return { running: false, timeLeft: action.durationSec };
    case 'tick': {
      const next = state.timeLeft - 1;
      return next <= 0
        ? { running: false, timeLeft: 0 }
        : { ...state, timeLeft: next };
    }
  }
}

export default function MicroReleaseCard({ release }: Props) {
  const [{ running, timeLeft }, dispatch] = useReducer(timerReducer, {
    running: false,
    timeLeft: release.durationSec,
  });

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(id);
  }, [running]);

  const reset = () => dispatch({ type: 'reset', durationSec: release.durationSec });

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
          <button onClick={() => dispatch({ type: 'start', durationSec: release.durationSec })}
            className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: '#9b72cf', color: '#fff' }}>
            {timeLeft <= 0 ? 'Again' : 'Start'}
          </button>
        ) : (
          <button onClick={() => dispatch({ type: 'pause' })}
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
