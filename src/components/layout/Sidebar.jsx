import { Home, Calendar, BarChart2, Target, PieChart, Settings, ChevronDown } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Sessions' },
  { icon: BarChart2, label: 'Insights' },
  { icon: Target, label: 'Goals' },
  { icon: PieChart, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">🎯</div>
          <div>
            <div className="logo-text">FocusMate</div>
            <div className="logo-tagline">Focus. Optimize. Achieve.</div>
          </div>
        </div>
      </div>

      {navItems.map(({ icon: Icon, label, active }) => (
        <div key={label} className={`nav-item${active ? ' active' : ''}`}>
          <Icon />
          <span>{label}</span>
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="premium-card">
          <div className="premium-header">
            <span>👑</span> Go Premium
          </div>
          <p className="premium-desc">Unlock advanced insights, distraction blocking and cloud sync.</p>
          <button className="btn-upgrade">Upgrade Now</button>
        </div>

        <div className="user-row">
          <div className="avatar">A</div>
          <div>
            <div className="user-name">Anirudh</div>
            <div className="user-id">BE24B003</div>
          </div>
          <ChevronDown size={14} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
        </div>
      </div>
    </aside>
  );
}
