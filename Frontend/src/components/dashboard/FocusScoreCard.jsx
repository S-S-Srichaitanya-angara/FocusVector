import { CheckCircle2, Clock, AlertCircle, Info } from 'lucide-react';
import { sessionStats } from '../../data/mockData';

const R = 48;
const C = 2 * Math.PI * R;

export default function FocusScoreCard() {
  const { focusScore, focusTime, taskCompletion, distractionTime } = sessionStats;
  const offset = C - (focusScore / 100) * C;

  return (
    <div className="card focus-score-card">
      <div className="score-ring-wrap">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="55" cy="55" r={R} fill="none"
            stroke="var(--green-primary)" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.6))' }}
          />
        </svg>
        <div className="score-center">
          <div className="score-number">{focusScore}</div>
          <div className="score-denom">/100</div>
          <div className="score-label">Great Focus!</div>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, marginBottom: 14 }}>
          Focus Score <Info size={13} style={{ color: 'var(--text-muted)', marginLeft: 4, verticalAlign: 'middle' }} />
        </div>
        <div className="score-stats">
          <div className="stat-row">
            <div className="stat-icon" style={{ background: 'rgba(34,197,94,0.12)' }}>
              <CheckCircle2 size={12} color="var(--green-primary)" />
            </div>
            <span className="stat-label">Focus Time</span>
            <span className="stat-value" style={{ color: 'var(--green-primary)' }}>{focusTime.percent}%</span>
          </div>
          <div className="stat-row">
            <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.12)' }}>
              <CheckCircle2 size={12} color="var(--blue)" />
            </div>
            <span className="stat-label">Task Completion</span>
            <span className="stat-value" style={{ color: 'var(--blue)' }}>{taskCompletion.percent}%</span>
          </div>
          <div className="stat-row">
            <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.12)' }}>
              <AlertCircle size={12} color="var(--red-primary)" />
            </div>
            <span className="stat-label">Distraction Time</span>
            <span className="stat-value" style={{ color: 'var(--red-primary)' }}>{distractionTime.percent}%</span>
          </div>
        </div>
        <div className="score-footer" style={{ marginTop: 12 }}>Keep it up! You're doing great.</div>
      </div>
    </div>
  );
}
