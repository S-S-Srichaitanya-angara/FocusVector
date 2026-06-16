import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function MiniStatCard({ icon, label, value, sub, percent, color, bgColor, data, barColor }) {
  const sparkData = data || Array.from({ length: 12 }, () => ({ v: Math.random() * 100 }));

  return (
    <div className="card mini-card">
      <div className="mini-card-top">
        <div>
          <div className="mini-label">{label}</div>
          <div className="mini-value" style={{ color }}>{value}</div>
          {sub && <div className="mini-sub">{sub}</div>}
        </div>
        <div className="mini-icon" style={{ background: bgColor }}>
          {icon}
        </div>
      </div>

      <div>
        {percent !== undefined ? (
          <div className="mini-bar">
            <div className="mini-bar-fill" style={{ width: `${percent}%`, background: barColor || color }} />
          </div>
        ) : (
          <div className="sparkline">
            <ResponsiveContainer width="100%" height={30}>
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sg-${label})`} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
