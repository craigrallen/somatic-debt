import { type Zone, ZONE_LABELS } from '../types';

interface Props {
  zone: Zone;
  value: number;
  onChange: (val: number) => void;
  onClose: () => void;
}

export default function ZoneSlider({ zone, value, onChange, onClose }: Props) {
  const color = value <= 3 ? '#7bc8a4' : value <= 6 ? '#e8c547' : '#e85d75';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl p-6 pb-10"
        style={{ background: '#2d1b40' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-1 rounded-full bg-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-1" style={{ color: '#e8dff0' }}>{ZONE_LABELS[zone]}</h3>
        <p className="text-sm mb-4" style={{ color: '#a893b8' }}>How much tension do you feel?</p>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-3xl font-bold" style={{ color }}>{value}</span>
          <input
            type="range" min={0} max={10} value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="flex-1"
          />
        </div>
        <div className="flex justify-between text-xs" style={{ color: '#a893b8' }}>
          <span>Relaxed</span><span>Extreme</span>
        </div>
      </div>
    </div>
  );
}
