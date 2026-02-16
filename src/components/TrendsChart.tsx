import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { type CheckIn } from '../types';

interface Props {
  checkIns: CheckIn[];
}

export default function TrendsChart({ checkIns }: Props) {
  // Aggregate by day
  const byDay: Record<string, number[]> = {};
  checkIns.forEach(ci => {
    const day = new Date(ci.timestamp).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(ci.totalScore);
  });

  const data = Object.entries(byDay).map(([day, scores]) => ({
    day,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    max: Math.max(...scores),
  }));

  if (data.length === 0) return (
    <div className="text-center py-8 text-sm" style={{ color: '#a893b8' }}>
      Check in over a few days to see trends.
    </div>
  );

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9b72cf" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#9b72cf" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fill: '#a893b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#a893b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip contentStyle={{ background: '#2d1b40', border: 'none', borderRadius: 12, color: '#e8dff0', fontSize: 12 }} />
          <Area type="monotone" dataKey="avg" stroke="#9b72cf" fill="url(#grad)" strokeWidth={2} name="Avg Score" />
          <Area type="monotone" dataKey="max" stroke="#e85d75" fill="none" strokeWidth={1} strokeDasharray="4 4" name="Peak" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
