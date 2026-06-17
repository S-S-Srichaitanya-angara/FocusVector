import React from 'react';
import { LayoutDashboard, Clock, BarChart2, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sessions', label: 'Sessions', icon: Clock },
    { id: 'insights', label: 'Insights', icon: BarChart2 },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '1.5rem', 
          color: 'var(--green-primary)',
          letterSpacing: '-0.05em',
          margin: 0
        }}>
          FocusVector //
        </h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                color: isActive ? 'var(--green-primary)' : '#94A3B8',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--green-primary)' : '#94A3B8'} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
