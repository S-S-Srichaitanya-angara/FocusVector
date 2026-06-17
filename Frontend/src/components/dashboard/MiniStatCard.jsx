function MiniStatCard({
  title,
  value,
  subtitle,
  trend
}) {
  return (
    <div className="card mini-stat-card">
      <p className="mini-stat-title">
        {title}
      </p>

      <h2 className="mini-stat-value">
        {value}
      </h2>

      <div className="mini-stat-footer">
        <p className="mini-stat-subtitle">
          {subtitle}
        </p>

        {trend && (
          <span className="mini-stat-trend">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export default MiniStatCard;