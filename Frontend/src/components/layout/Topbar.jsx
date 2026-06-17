import { Moon, Sun, Timer } from "lucide-react";

function Topbar({ theme, toggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="session-status">
          <span className="status-dot"></span>

          <div>
            <p className="status-label">
              Focus Session Active
            </p>

            <h3 className="live-timer">
              01:24:36
            </h3>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <div className="user-profile">
          <div className="avatar">
            C
          </div>

          <div>
            <p className="user-name">
              Chaitanya
            </p>

            <p className="user-role">
              Productivity Engineer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;