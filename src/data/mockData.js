export const sessionStats = {
  focusScore: 82,
  focusTime: { value: "03:17:45", percent: 78 },
  taskCompletion: { value: "17/20", percent: 85 },
  distractionTime: { value: "00:54:45", percent: 12 },
  totalTime: "04:12:30",
  tasksCompleted: { done: 17, total: 20 },
};

export const focusScoreTrend = [
  { day: "Mon", score: 68 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 65 },
  { day: "Thu", score: 88 },
  { day: "Fri", score: 76 },
  { day: "Sat", score: 82 },
  { day: "Sun", score: 82 },
];

export const focusHoursPerDay = [
  { day: "Mon", hours: 2.8 },
  { day: "Tue", hours: 3.1 },
  { day: "Wed", hours: 2.6 },
  { day: "Thu", hours: 4.2 },
  { day: "Fri", hours: 3.6 },
  { day: "Sat", hours: 3.0 },
  { day: "Sun", hours: 4.1 },
];

export const sessionTimeline = Array.from({ length: 72 }, (_, i) => {
  const rand = Math.random();
  return {
    time: i,
    focus: rand > 0.3 ? Math.random() * 80 + 20 : 0,
    distraction: rand > 0.7 ? Math.random() * 40 : 0,
    idle: rand <= 0.3 ? Math.random() * 30 : 0,
  };
});

export const topDistractions = [
  { app: "Instagram", icon: "📸", time: "12m 24s", percent: 32, color: "#E1306C" },
  { app: "YouTube", icon: "▶️", time: "9m 15s", percent: 24, color: "#FF0000" },
  { app: "WhatsApp", icon: "💬", time: "6m 30s", percent: 17, color: "#25D366" },
  { app: "App Switches", icon: "🔄", time: "4m 45s", percent: 12, color: "#7C3AED" },
  { app: "Other", icon: "⋯", time: "3m 51s", percent: 10, color: "#6B7280" },
];

export const tasks = [
  { id: 1, title: "Solve DSA Problems (Arrays)", duration: 45, done: true },
  { id: 2, title: "Read System Design Notes", duration: 30, done: true },
  { id: 3, title: "Implement LC Problem", duration: 60, done: true },
  { id: 4, title: "Revise OS Concepts", duration: 40, done: false },
  { id: 5, title: "Solve Mock Test", duration: 60, done: false },
];

export const heatmapData = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return days.map((day) => ({
    day,
    hours: hours.map((h) => ({
      hour: h,
      value:
        h >= 9 && h <= 18
          ? Math.random() * 0.7 + (h >= 9 && h <= 11 ? 0.3 : 0)
          : Math.random() * 0.2,
    })),
  }));
})();

export const insights = [
  {
    icon: "trending-up",
    text: "You are most productive between",
    highlight: "9:00 AM – 11:00 AM",
    color: "#10B981",
  },
  {
    icon: "clock",
    text: "Distractions increase after",
    highlight: "40 minutes",
    suffix: "of focus.",
    color: "#F59E0B",
  },
  {
    icon: "target",
    text: "Your focus score is 18% higher on",
    highlight: "coding sessions.",
    color: "#3B82F6",
  },
];
