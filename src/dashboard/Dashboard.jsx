import FocusScoreCard from './FocusScoreCard';
import MiniStatCard from './MiniStatCard';
import SessionTimeline from './SessionTimeline';
import TopDistractions from './TopDistractions';
import TasksCard from './TasksCard';
import FocusScoreTrend from './FocusScoreTrend';
import FocusHoursChart from './FocusHoursChart';
import ProductivityHeatmap from './ProductivityHeatmap';
import InsightsPanel from './InsightsPanel';
import AchievementCard from './AchievementCard';
import { Clock, Target, AlertTriangle, CheckSquare } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Row 1: Focus Score + 4 mini cards */}
      <div className="top-row">
        <FocusScoreCard />

        <MiniStatCard
          icon={<Clock size={16} color="var(--blue)" />}
          label="Total Time"
          value="04:12:30"
          sub="Total session time"
          color="var(--blue)"
          bgColor="rgba(59,130,246,0.12)"
          data={Array.from({ length: 12 }, () => ({ v: Math.random() * 60 + 20 }))}
        />

        <MiniStatCard
          icon={<Target size={16} color="var(--green-primary)" />}
          label="Focus Time"
          value="03:17:45"
          sub="78% of total time"
          color="var(--green-primary)"
          bgColor="rgba(34,197,94,0.12)"
          data={Array.from({ length: 12 }, () => ({ v: Math.random() * 80 + 20 }))}
        />

        <MiniStatCard
          icon={<AlertTriangle size={16} color="var(--red-primary)" />}
          label="Distraction Time"
          value="00:54:45"
          sub="22% of total time"
          color="var(--red-primary)"
          bgColor="rgba(239,68,68,0.12)"
          data={Array.from({ length: 12 }, () => ({ v: Math.random() * 40 }))}
        />

        <MiniStatCard
          icon={<CheckSquare size={16} color="var(--purple)" />}
          label="Tasks Completed"
          value="17 / 20"
          sub="85% Completed"
          color="var(--purple)"
          bgColor="rgba(139,92,246,0.12)"
          percent={85}
          barColor="var(--purple)"
        />
      </div>

      {/* Row 2: Timeline + Distractions */}
      <div className="second-row">
        <SessionTimeline />
        <TopDistractions />
      </div>

      {/* Row 3: Tasks + Trend + Hours + Insights side */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 1fr 280px', gap: 14 }}>
        <TasksCard />
        <FocusScoreTrend />
        <FocusHoursChart />
        <InsightsPanel />
      </div>

      {/* Row 4: Heatmap + Achievement */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 14 }}>
        <ProductivityHeatmap />
        <AchievementCard />
      </div>
    </div>
  );
}
