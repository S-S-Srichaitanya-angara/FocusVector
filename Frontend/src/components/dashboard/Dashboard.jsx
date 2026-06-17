import FocusScoreCard from "./FocusScoreCard";
import MiniStatCard from "./MiniStatCard";
import SessionTimeline from "./SessionTimeline";
import TopDistractions from "./TopDistractions";
import TasksCard from "./TasksCard";
import FocusScoreTrend from "./FocusScoreTrend";
import FocusHoursChart from "./FocusHoursChart";
import ProductivityHeatmap from "./ProductivityHeatmap";
import InsightsPanel from "./InsightsPanel";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="dashboard-top">
        <FocusScoreCard />

        <div className="stats-grid">
          <MiniStatCard
            title="Focus Hours"
            value="6.8"
            subtitle="Today"
          />

          <MiniStatCard
            title="Tasks Completed"
            value="17"
            subtitle="of 20"
          />

          <MiniStatCard
            title="Distractions"
            value="4"
            subtitle="Today"
          />

          <MiniStatCard
            title="Productivity"
            value="82%"
            subtitle="Score"
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="dashboard-middle">
        <SessionTimeline />
        <TopDistractions />
        <TasksCard />
      </div>

      {/* Analytics Section */}
      <div className="dashboard-analytics">
        <FocusScoreTrend />
        <FocusHoursChart />
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        <ProductivityHeatmap />
        <InsightsPanel />
      </div>
    </div>
  );
}

export default Dashboard;