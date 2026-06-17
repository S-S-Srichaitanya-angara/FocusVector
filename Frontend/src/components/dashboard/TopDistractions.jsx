const distractions = [
  {
    app: "Instagram",
    durationMinutes: 28,
    percentage: 52
  },
  {
    app: "YouTube",
    durationMinutes: 16,
    percentage: 29
  },
  {
    app: "WhatsApp",
    durationMinutes: 6,
    percentage: 11
  },
  {
    app: "App Switches",
    durationMinutes: 4,
    percentage: 8
  }
];

function TopDistractions() {
  return (
    <div className="card top-distractions-card">
      <div className="widget-header">
        <h3 className="section-title">
          Top Distractions
        </h3>
      </div>

      <div className="distractions-list">
        {distractions.map((item) => (
          <div
            key={item.app}
            className="distraction-item"
          >
            <div className="distraction-header">
              <span>{item.app}</span>

              <span>
                {item.durationMinutes} min
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill distraction-fill"
                style={{
                  width: `${item.percentage}%`
                }}
              />
            </div>

            <span className="progress-label">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopDistractions;