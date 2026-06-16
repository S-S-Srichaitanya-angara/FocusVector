import { TrendingUp, Clock, Target, Info } from 'lucide-react';
import { insights } from '../../data/mockData';

const IconMap = { 'trending-up': TrendingUp, clock: Clock, target: Target };

const bgColors = {
  'var(--green-primary)': 'rgba(34,197,94,0.12)',
  'var(--amber)': 'rgba(245,158,11,0.12)',
  'var(--blue)': 'rgba(59,130,246,0.12)',
};

const colorMap = {
  '#10B981': 'var(--green-primary)',
  '#F59E0B': 'var(--amber)',
  '#3B82F6': 'var(--blue)',
};

export default function InsightsPanel() {
  return (
    <div className="card insights-panel">
      <div className="insights-header">
        <div className="card-title">Insights <Info size={13} /></div>
        <a className="link-view-all">View All</a>
      </div>

      <div className="insight-items">
        {insights.map((ins, i) => {
          const Icon = IconMap[ins.icon];
          const cssColor = colorMap[ins.color] || ins.color;
          return (
            <div key={i} className="insight-item">
              <div className="insight-icon" style={{ background: `${cssColor}20` || 'rgba(34,197,94,0.12)' }}>
                <Icon size={16} color={cssColor} />
              </div>
              <div className="insight-text">
                {ins.text} <strong style={{ color: cssColor }}>{ins.highlight}</strong>{ins.suffix ? ` ${ins.suffix}` : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
