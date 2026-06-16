import { topDistractions } from '../../data/mockData';
import { Info } from 'lucide-react';

export default function TopDistractions() {
  return (
    <div className="card distractions-card">
      <div className="card-title" style={{ marginBottom: 12 }}>
        Top Distractions <Info size={13} />
      </div>

      {topDistractions.map((d) => (
        <div key={d.app} className="distraction-row">
          <div className="distraction-app-icon">{d.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="distraction-name">{d.app}</span>
              <span className="distraction-time">{d.time}</span>
              <span className="distraction-pct" style={{ color: d.color }}>{d.percent}%</span>
            </div>
            <div className="distraction-bar-wrap" style={{ marginTop: 5 }}>
              <div className="distraction-bar-fill" style={{ width: `${d.percent * 3}%`, background: d.color }} />
            </div>
          </div>
        </div>
      ))}

      <div className="total-distraction">
        <span className="total-label">Total Distraction Time</span>
        <span className="total-value">00:54:45</span>
      </div>
    </div>
  );
}
