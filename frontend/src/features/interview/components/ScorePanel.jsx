import MatchScoreRing from "./MatchScoreRing.jsx";

const severityStyles = {
  high: "bg-red-500/10 text-red-400 border-red-500/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

const ScorePanel = ({ matchScore, scoreExplanation, skillGap }) => (
  <aside className="w-full md:w-72 border-t md:border-t-0 md:border-l border-white/10 p-6">
    <p className="text-xs font-semibold text-neutral-500 tracking-wide mb-4">
      MATCH SCORE
    </p>
    <div className="flex flex-col items-center mb-8">
      <MatchScoreRing score={matchScore} />
      {scoreExplanation && (
        <p className="text-xs text-neutral-400 text-center mt-3 leading-relaxed">
          {scoreExplanation}
        </p>
      )}
    </div>

    <p className="text-xs font-semibold text-neutral-500 tracking-wide mb-3">
      SKILL GAPS
    </p>
    <div className="flex flex-col gap-2">
      {skillGap?.length ? (
        skillGap.map((gap, i) => (
          <span
            key={i}
            className={`text-xs font-medium px-3 py-2 rounded-lg border ${severityStyles[gap.severity]}`}
          >
            {gap.skills}
          </span>
        ))
      ) : (
        <p className="text-xs text-neutral-500">No major gaps found.</p>
      )}
    </div>
  </aside>
);

export default ScorePanel;
