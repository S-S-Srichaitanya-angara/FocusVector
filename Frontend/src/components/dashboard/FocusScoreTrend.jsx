import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { focusScoreTrend } from '../../data/mockData';
import { Info } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 11 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
      <div style={{ color: 'var(--green-primary)', fontWeight: 700 }}>Score: {payload[0].value}</div>
    </div>
  );
};

export default function FocusScoreTrend() {
  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div className="card-title">Focus Score Trend <Info size={13} /></div>
        <select className="select-week"><option>This Week</option><option>Last Week</option></select>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={focusScoreTrend} margin={{ top: 16, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} ticks={[0,25,50,75,100]} />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--green-primary)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--green-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line
            type="monotone" dataKey="score"
            stroke="var(--green-primary)" strokeWidth={2.5}
            dot={{ r: 4, fill: 'var(--bg-card)', stroke: 'var(--green-primary)', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: 'var(--green-primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
