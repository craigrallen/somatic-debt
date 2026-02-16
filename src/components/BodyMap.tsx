import { type Zone, ZONE_LABELS } from '../types';

interface Props {
  zoneLevels: Record<Zone, number>;
  onZoneTap: (zone: Zone) => void;
}

const zonePositions: Record<Zone, { cx: number; cy: number; rx: number; ry: number }> = {
  jaw:       { cx: 150, cy: 58,  rx: 18, ry: 12 },
  neck:      { cx: 150, cy: 80,  rx: 12, ry: 10 },
  shoulders: { cx: 150, cy: 105, rx: 45, ry: 12 },
  chest:     { cx: 150, cy: 130, rx: 30, ry: 18 },
  upperBack: { cx: 150, cy: 155, rx: 28, ry: 15 },
  stomach:   { cx: 150, cy: 180, rx: 25, ry: 18 },
  lowerBack: { cx: 150, cy: 210, rx: 25, ry: 15 },
  hips:      { cx: 150, cy: 240, rx: 32, ry: 15 },
  hands:     { cx: 82,  cy: 260, rx: 12, ry: 16 },
  feet:      { cx: 138, cy: 370, rx: 14, ry: 10 },
};

function levelColor(level: number): string {
  if (level <= 3) return 'rgba(123, 200, 164, 0.6)';
  if (level <= 6) return 'rgba(232, 197, 71, 0.6)';
  return 'rgba(232, 93, 117, 0.6)';
}

export default function BodyMap({ zoneLevels, onZoneTap }: Props) {
  return (
    <svg viewBox="0 0 300 400" className="w-full max-w-[280px] mx-auto">
      {/* Body silhouette */}
      <g fill="none" stroke="#6b5a7d" strokeWidth="2">
        {/* Head */}
        <ellipse cx="150" cy="38" rx="22" ry="28" />
        {/* Torso */}
        <path d="M128 66 Q105 90 100 120 L100 200 Q100 245 120 255 L130 260 L130 320 L115 370 L115 385 L140 385 L150 320 L160 385 L185 385 L185 370 L170 320 L170 260 L180 255 Q200 245 200 200 L200 120 Q195 90 172 66" />
        {/* Arms */}
        <path d="M100 110 Q75 150 70 200 L65 260 Q63 275 75 275" />
        <path d="M200 110 Q225 150 230 200 L235 260 Q237 275 225 275" />
      </g>

      {/* Tap zones */}
      {(Object.keys(zonePositions) as Zone[]).map(zone => {
        const { cx, cy, rx, ry } = zonePositions[zone];
        const level = zoneLevels[zone] || 0;
        return (
          <g key={zone} onClick={() => onZoneTap(zone)} className="cursor-pointer">
            <ellipse
              cx={cx} cy={cy} rx={rx} ry={ry}
              fill={level > 0 ? levelColor(level) : 'rgba(155, 114, 207, 0.15)'}
              stroke={level > 0 ? levelColor(level).replace('0.6', '1') : 'rgba(155, 114, 207, 0.3)'}
              strokeWidth="1.5"
            />
            <text x={cx} y={cy + 4} textAnchor="middle" fill="#e8dff0" fontSize="8" fontWeight="500">
              {ZONE_LABELS[zone]}
            </text>
            {level > 0 && (
              <text x={cx + rx - 2} y={cy - ry + 6} textAnchor="middle" fill="#e8dff0" fontSize="7" fontWeight="bold">
                {level}
              </text>
            )}
          </g>
        );
      })}

      {/* Mirror zones */}
      <g onClick={() => onZoneTap('hands')} className="cursor-pointer">
        <ellipse cx={218} cy={260} rx={12} ry={16}
          fill={zoneLevels.hands > 0 ? levelColor(zoneLevels.hands) : 'rgba(155, 114, 207, 0.15)'}
          stroke={zoneLevels.hands > 0 ? levelColor(zoneLevels.hands).replace('0.6', '1') : 'rgba(155, 114, 207, 0.3)'}
          strokeWidth="1.5" />
      </g>
      <g onClick={() => onZoneTap('feet')} className="cursor-pointer">
        <ellipse cx={162} cy={370} rx={14} ry={10}
          fill={zoneLevels.feet > 0 ? levelColor(zoneLevels.feet) : 'rgba(155, 114, 207, 0.15)'}
          stroke={zoneLevels.feet > 0 ? levelColor(zoneLevels.feet).replace('0.6', '1') : 'rgba(155, 114, 207, 0.3)'}
          strokeWidth="1.5" />
      </g>
    </svg>
  );
}
