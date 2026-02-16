interface Props {
  score: number;
  maxScore: number;
}

export default function DebtScore({ score, maxScore }: Props) {
  const pct = maxScore > 0 ? score / maxScore : 0;
  const color = pct <= 0.3 ? '#7bc8a4' : pct <= 0.6 ? '#e8c547' : '#e85d75';
  const label = pct <= 0.3 ? 'Low' : pct <= 0.6 ? 'Moderate' : 'High';

  return (
    <div className="text-center py-4">
      <div className="text-6xl font-bold mb-1" style={{ color }}>{score}</div>
      <div className="text-sm font-medium" style={{ color }}>{label} Somatic Debt</div>
      <div className="w-48 h-2 mx-auto mt-3 rounded-full overflow-hidden" style={{ background: '#3d2855' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct * 100}%`, background: color }} />
      </div>
    </div>
  );
}
