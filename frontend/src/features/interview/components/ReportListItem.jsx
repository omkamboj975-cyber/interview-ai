const scoreColor = (score) => {
  if (score >= 75)
    return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
  if (score >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
  return "text-red-400 bg-red-500/10 border-red-500/30";
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const truncate = (text, max = 90) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trim() + "..." : text;
};

const ReportListItem = ({ report, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 hover:bg-white/[0.04] transition-colors"
  >
    <div className="min-w-0">
      <p className="text-sm text-neutral-200 font-medium truncate">
        {truncate(report.jobDescription)}
      </p>
      <p className="text-xs text-neutral-500 mt-1">
        {formatDate(report.createdAt)}
      </p>
    </div>

    <span
      className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full border ${scoreColor(report.matchScore)}`}
    >
      {report.matchScore}%
    </span>
  </button>
);

export default ReportListItem;
