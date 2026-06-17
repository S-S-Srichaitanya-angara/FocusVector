import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const timelineData = [
  {
    timeWindow: "08 AM",
    focus: 110,
    distraction: 10,
    idle: 0
  },
  {
    timeWindow: "10 AM",
    focus: 88,
    distraction: 24,
    idle: 8
  },
  {
    timeWindow: "12 PM",
    focus: 0,
    distraction: 60,
    idle: 60
  },
  {
    timeWindow: "02 PM",
    focus: 95,
    distraction: 12,
    idle: 5
  },
  {
    timeWindow: "04 PM",
    focus: 120,
    distraction: 8,
    idle: 0
  }
];

function CustomTooltip({
  active,
  payload,
  label
}) {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="timeline-tooltip">
        <p>{label}</p>

        <p>
          Focus: {payload[0].value} min
        </p>

        <p>
          Distraction: {payload[1].value} min
        </p>

        <p>
          Idle: {payload[2].value} min
        </p>
      </div>
    );
  }

  return null;
}

function SessionTimeline() {
  return (
    <div className="card session-timeline-card">
      <div className="widget-header">
        <h3 className="section-title">
          Focus Timeline
        </h3>

        <span className="widget-subtitle">
          Focus vs Distraction vs Idle
        </span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={timelineData}>
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="timeWindow"
            />

            <YAxis />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="focus"
              stackId="a"
              fill="#22C55E"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="distraction"
              stackId="a"
              fill="#EF4444"
            />

            <Bar
              dataKey="idle"
              stackId="a"
              fill="#64748B"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SessionTimeline;