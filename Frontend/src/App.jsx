import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const nextTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    document.documentElement.setAttribute(
      "data-theme",
      nextTheme
    );
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Topbar
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Dashboard />
      </main>
    </div>
  );
}

export default App;