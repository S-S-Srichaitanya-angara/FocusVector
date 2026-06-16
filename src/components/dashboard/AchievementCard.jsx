export default function AchievementCard() {
  return (
    <div className="card achievement-card">
      <div className="achievement-top">
        <div className="trophy">🏆</div>
        <div>
          <div className="achievement-title">Keep it up, Anirudh!</div>
          <div className="achievement-sub">You are in top 24% of FocusMate users this week.</div>
        </div>
      </div>
      <button className="btn-view-achievements">View Achievements</button>
    </div>
  );
}
