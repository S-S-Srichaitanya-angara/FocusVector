import { ComposedChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { sessionTimeline } from '../../data/mockData';
import { Info } from 'lucide-react';

const timeLabels = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'];

const data = sessionTimeline.map((d, i) => ({
  ...d,
  label: i % 8 === 0 ? timeLabels[Math.floor(i / 8)] : '',
}));

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 11 }}>
      <div style={{ color: 'var(--green-primary)' }}>Focus: {Math.round(payload[0]?.value || 0)}%</div>
      <div style={{ color: 'var(--red-primary)' }}>Distraction: {Math.round(payload[1]?.value || 0)}%</div>
    </div>
  );
};

export default function SessionTimeline() {
  return (
    <div className="card timeline-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="card-title">
          Session Timeline <Info size={13} />
        </div>
        <div className="timeline-legend">
          {[['var(--green-primary)', 'Focus'], ['var(--red-primary)', 'Distraction'], ['rgba(255,255,255,0.2)', 'Idle']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div className="legend-dot" style={{ background: c }} />
              <span className="legend-label">{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, paddingLeft: 32 }}>
        <span>Active</span>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <ComposedChart data={data} barGap={0} barCategoryGap={0}>
          <XAxis dataKey="label" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} interval={7} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="focus" stackId="a" fill="var(--green-primary)" opacity={0.85} radius={[0,0,0,0]} maxBarSize={6}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.focus > 0 ? 'var(--green-primary)' : 'transparent'} />
            ))}
          </Bar>
          <Bar dataKey="distraction" stackId="b" fill="var(--red-primary)" opacity={0.85} maxBarSize={6}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.distraction > 0 ? 'var(--red-primary)' : 'transparent'} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', fontSize: 10, color: 'var(--text-muted)', justifyContent: 'space-between', paddingLeft: 4, marginBottom: 12 }}>
        <span>Idle</span>
      </div>

      <div className="timeline-footer">
        <div className="timeline-stat">
          <div className="legend-dot" style={{ background: 'var(--green-primary)' }} />
          <span className="timeline-stat-label">Longest Focus Streak:</span>
          <span className="timeline-stat-val" style={{ color: 'var(--text-primary)' }}>52 min</span>
        </div>
        <div className="timeline-stat">
          <div className="legend-dot" style={{ background: 'var(--red-primary)' }} />
          <span className="timeline-stat-label">Longest Distraction:</span>
          <span className="timeline-stat-val" style={{ color: 'var(--text-primary)' }}>12 min (Instagram)</span>
        </div>
        <div className="timeline-stat">
          <span>🔄</span>
          <span className="timeline-stat-label">Total Switches:</span>
          <span className="timeline-stat-val" style={{ color: 'var(--text-primary)' }}>18 times</span>
        </div>
      </div>
    </div>
  );
}
