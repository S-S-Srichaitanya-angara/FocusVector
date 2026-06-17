import { heatmapData } from '../../data/mockData';
import { Info } from 'lucide-react';

const hourLabels = ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'];

const getColor = (value) => {
  if (value < 0.1) return 'rgba(34,197,94,0.05)';
  if (value < 0.3) return 'rgba(34,197,94,0.15)';
  if (value < 0.5) return 'rgba(34,197,94,0.3)';
  if (value < 0.7) return 'rgba(34,197,94,0.5)';
  if (value < 0.85) return 'rgba(34,197,94,0.7)';
  return 'rgba(34,197,94,0.95)';
};

export default function ProductivityHeatmap() {
  return (
    <div className="card heatmap-card" style={{ gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div className="card-title">Productivity Heatmap <Info size={13} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-muted)' }}>
          <span>Low Focus</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {[0.05, 0.2, 0.4, 0.6, 0.8, 1].map((v, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: getColor(v) }} />
            ))}
          </div>
          <span>High Focus</span>
        </div>
      </div>

      <div className="heatmap-x-labels">
        {hourLabels.map((l, i) => (
          <div key={i} className="heatmap-x-label" style={{ width: `${100 / 12}%` }}>{l}</div>
        ))}
      </div>

      <div className="heatmap-grid">
        {heatmapData.map((row) => (
          <div key={row.day} className="heatmap-row">
            <div className="heatmap-day">{row.day}</div>
            {row.hours.map((cell, i) => (
              <div
                key={i}
                className="heatmap-cell"
                title={`${row.day} ${cell.hour}:00 — ${Math.round(cell.value * 100)}% focus`}
                style={{ background: getColor(cell.value), flex: 1, minWidth: 0 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
