function calculateFocusScore({
  focusSeconds,
  distractionSeconds,
  idleSeconds,
  taskCompletionRate = 1
}) {
  const totalSeconds =
    focusSeconds +
    distractionSeconds +
    idleSeconds;

  if (totalSeconds === 0) {
    return 0;
  }

  const FT_ratio =
    focusSeconds / totalSeconds;

  const DT_ratio =
    distractionSeconds / totalSeconds;

  const score =
    (
      (0.5 * FT_ratio) +
      (0.3 * taskCompletionRate) +
      (0.2 * (1 - DT_ratio))
    ) * 100;

  return Math.round(score);
}

module.exports = calculateFocusScore;