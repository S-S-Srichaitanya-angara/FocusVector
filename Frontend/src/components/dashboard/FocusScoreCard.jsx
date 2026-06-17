function FocusScoreCard() {
  const score = 82;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference -
    (score / 100) * circumference;

  return (
    <div className="card focus-score-card">
      <h3 className="section-title">
        Focus Score
      </h3>

      <div className="score-ring-container">
        <svg
          className="score-ring"
          width="220"
          height="220"
        >
          <circle
            className="ring-bg"
            cx="110"
            cy="110"
            r={radius}
          />

          <circle
            className="ring-progress"
            cx="110"
            cy="110"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>

        <div className="score-center">
          <h1>{score}</h1>
          <span>/100</span>
        </div>
      </div>

      <div className="score-summary">
        <p>
          Strong focus consistency today.
        </p>

        <span>
          ↑ 7% from yesterday
        </span>
      </div>
    </div>
  );
}

export default FocusScoreCard;