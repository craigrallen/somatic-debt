import { type CheckIn, ZONE_LABELS, type Zone } from '../types';

interface Props {
  checkIns: CheckIn[];
}

export default function DailyLog({ checkIns }: Props) {
  if (checkIns.length === 0) return (
    <div className="text-center py-8 text-sm" style={{ color: '#a893b8' }}>
      No check-ins today. Tap the body map to start.
    </div>
  );

  return (
    <div className="space-y-3">
      {[...checkIns].reverse().map(ci => {
        const time = new Date(ci.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const high = ci.zones.filter(z => z.level >= 5);
        return (
          <div key={ci.id} className="rounded-xl p-3 flex items-start gap-3" style={{ background: '#2d1b40' }}>
            <div className="text-xs font-mono pt-0.5" style={{ color: '#9b72cf' }}>{time}</div>
            <div className="flex-1">
              <div className="text-sm font-medium mb-1" style={{ color: '#e8dff0' }}>
                Score: <span style={{ color: ci.totalScore <= 30 ? '#7bc8a4' : ci.totalScore <= 60 ? '#e8c547' : '#e85d75' }}>{ci.totalScore}</span>
              </div>
              {high.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {high.map(z => (
                    <span key={z.zone} className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#3d2855', color: '#e85d75' }}>
                      {ZONE_LABELS[z.zone as Zone]} {z.level}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
