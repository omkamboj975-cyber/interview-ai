const clampScore = (score) => Math.max(0, Math.min(100, Number(score) || 0));

const scoreTone = (score) => {
  if (score >= 75) return "text-white border-white/30 bg-white/10";
  if (score >= 50) return "text-neutral-200 border-white/20 bg-white/[0.06]";
  return "text-neutral-400 border-white/10 bg-white/[0.03]";
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const truncate = (text, max = 120) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trim() + "..." : text;
};

const ReportListItem = ({ report, onClick }) => {
  const score = clampScore(report.matchScore);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] sm:gap-8 sm:px-8 sm:py-6"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-100 sm:text-base">
          {truncate(report.jobDescription)}
        </p>
        <p className="mt-1 text-xs text-neutral-400 sm:text-[13px]">
          {formatDate(report.createdAt)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-white/10 sm:block">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neutral-600 to-white"
            style={{ width: `${score}%` }}
          />
        </div>
        <span
          className={`min-w-14 rounded-full border px-3 py-1 text-center text-sm font-semibold ${scoreTone(score)}`}
        >
          {score}%
        </span>
      </div>
    </button>
  );
};

export default ReportListItem;
