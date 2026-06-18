PRAGMA foreign_keys = ON;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SESSIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    start_time DATETIME NOT NULL,
    end_time DATETIME,

    focus_seconds INTEGER DEFAULT 0,
    distraction_seconds INTEGER DEFAULT 0,
    idle_seconds INTEGER DEFAULT 0,

    focus_score REAL DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =====================================================
-- APP USAGE
-- =====================================================

CREATE TABLE IF NOT EXISTS app_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    session_id INTEGER NOT NULL,

    app_name TEXT NOT NULL,
    window_title TEXT,

    duration_seconds INTEGER DEFAULT 0,

    category TEXT DEFAULT 'unclassified',

    FOREIGN KEY (session_id)
        REFERENCES sessions(id)
        ON DELETE CASCADE
);

-- =====================================================
-- TASKS
-- =====================================================

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    title TEXT NOT NULL,

    completed INTEGER DEFAULT 0
        CHECK (completed IN (0,1)),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- =====================================================
-- DAILY ANALYTICS
-- =====================================================

CREATE TABLE IF NOT EXISTS daily_analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    date TEXT NOT NULL,

    focus_hours REAL DEFAULT 0,
    focus_score REAL DEFAULT 0,

    completed_tasks INTEGER DEFAULT 0,
    total_tasks INTEGER DEFAULT 0,

    distraction_minutes INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, date),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS session_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    session_id INTEGER NOT NULL,

    event_type TEXT NOT NULL,

    app_name TEXT,
    window_title TEXT,

    start_time DATETIME NOT NULL,
    end_time DATETIME,

    duration_seconds INTEGER DEFAULT 0,

    FOREIGN KEY (session_id)
        REFERENCES sessions(id)
        ON DELETE CASCADE
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_sessions_user
ON sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_start
ON sessions(start_time);

CREATE INDEX IF NOT EXISTS idx_app_usage_session
ON app_usage(session_id);

CREATE INDEX IF NOT EXISTS idx_tasks_user
ON tasks(user_id);

CREATE INDEX IF NOT EXISTS idx_daily_analytics_user
ON daily_analytics(user_id);

CREATE INDEX IF NOT EXISTS idx_session_events_session
ON session_events(session_id);