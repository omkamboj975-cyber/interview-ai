const scoreColor = (score) => {
  if (score >= 75) return "#34d399";
  if (score >= 50) return "#fbbf24";
  return "#f87171";
};

const MatchScoreRing = ({ score }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  const label =
    score >= 75
      ? "Strong match for this role"
      : score >= 50
        ? "Moderate match — some gaps to close"
        : "Significant gaps for this role";

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#262626"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <text
          x="60"
          y="56"
          textAnchor="middle"
          className="fill-white text-2xl font-bold"
        >
          {score}
        </text>
        <text
          x="60"
          y="74"
          textAnchor="middle"
          className="fill-neutral-400 text-[10px]"
        >
          %
        </text>
      </svg>
      <p className="text-xs text-neutral-400 text-center mt-2 max-w-[140px]">
        {label}
      </p>
    </div>
  );
};

export default MatchScoreRing;
