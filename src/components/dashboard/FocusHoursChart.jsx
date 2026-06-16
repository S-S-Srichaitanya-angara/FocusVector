import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { focusHoursPerDay } from '../../data/mockData';
import { Info } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 11 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
      <div style={{ color: 'var(--green-primary)', fontWeight: 700 }}>{payload[0].value}h focus</div>
    </div>
  );
};

export default function FocusHoursChart() {
  const maxIdx = focusHoursPerDay.reduce((mi, d, i, arr) => d.hours > arr[mi].hours ? i : mi, 0);

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div className="card-title">Focus Hours per Day <Info size={13} /></div>
        <select className="select-week"><option>This Week</option><option>Last Week</option></select>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={focusHoursPerDay} margin={{ top: 16, right: 10, bottom: 0, left: -20 }} barSize={22}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickLine={false} axisLine={false} ticks={[0,1,2,3,4,5]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
            {focusHoursPerDay.map((_, i) => (
              <Cell
                key={i}
                fill={i === maxIdx ? 'var(--green-primary)' : 'rgba(34,197,94,0.35)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
