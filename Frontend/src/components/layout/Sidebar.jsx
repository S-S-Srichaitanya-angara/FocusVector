import {
  LayoutDashboard,
  Clock3,
  BarChart3,
  Settings
} from "lucide-react";

const navItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true
  },
  {
    id: 2,
    label: "Sessions",
    icon: Clock3
  },
  {
    id: 3,
    label: "Insights",
    icon: BarChart3
  },
  {
    id: 4,
    label: "Settings",
    icon: Settings
  }
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>FocusVector</h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`nav-item ${
                item.active ? "active" : ""
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;