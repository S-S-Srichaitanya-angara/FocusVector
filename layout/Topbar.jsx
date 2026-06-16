import { useState, useEffect } from 'react';
import { Bell, Moon, Play } from 'lucide-react';

export default function Topbar() {
  const [elapsed, setElapsed] = useState(5076); // 01:24:36 in seconds

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Dashboard</h1>
        <p>Your productivity overview</p>
      </div>

      <div className="topbar-right">
        <div className="session-badge">
          <div className="session-dot" />
          <div>
            <div className="session-label">Session Active</div>
            <div className="session-time">{fmt(elapsed)}</div>
          </div>
        </div>

        <div className="icon-btn" style={{ position: 'relative' }}>
          <Bell size={16} />
          <div className="badge">2</div>
        </div>

        <div className="icon-btn">
          <Moon size={16} />
        </div>

        <button className="btn-start">
          <Play size={13} fill="currentColor" />
          Start Session
        </button>
      </div>
    </header>
  );
}
