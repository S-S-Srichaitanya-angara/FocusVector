import React, { useEffect, useState } from 'react';

const Topbar = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Phase 1: Pull details from active API contract specification
    fetch('http://localhost:5000/api/session/current')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 'success') {
          setSessionData(resData.data);
        }
      })
      .catch((err) => console.error('Failed fetching runtime system telemetry:', err));
  }, []);

  const formatSeconds = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header style={{
      height: '70px',
      position: 'fixed',
      top: 0,
      left: '260px',
      right: 0,
      backgroundColor: 'rgba(15, 17, 21, 0.85)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 100
    }}>
      <div>
        {sessionData?.isSessionActive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--green-primary)',
              animation: 'pulse 2s infinite alternate'
            }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#E2E8F0' }}>
              Active Vector Tracking State: {formatSeconds(sessionData.currentSessionSeconds)}
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#64748B' }}>FOCUS HOURS TODAY</div>
          <div style={{ color: '#F1F5F9', fontWeight: 'bold' }}>{sessionData?.todayStats?.totalFocusHours || '0.00'} hrs</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#64748B' }}>CURRENT AGGREGATE SCORE</div>
          <div style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>{sessionData?.todayStats?.focusScore || '0'}/100</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
