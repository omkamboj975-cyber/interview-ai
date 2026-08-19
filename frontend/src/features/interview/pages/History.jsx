import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useInterview } from "../hooks/useInterview.js";

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

const History = () => {
  const { user, logout } = useAuth();
  const { reports, loading, fetchHistory } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top nav */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          Interview<span className="text-pink-500">Sync</span>
        </h1>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-neutral-400 hover:text-pink-400 transition-colors"
          >
            New Analysis
          </Link>
          <span className="text-sm text-neutral-400">
            {user?.name ? `Hi, ${user.name}` : "Welcome"}
          </span>
          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:border-pink-500 hover:text-pink-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Your reports</h2>
            <p className="text-neutral-400 text-sm mt-1">
              All the interview analyses you've generated so far.
            </p>
          </div>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-pink-600 from-pink-600 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            + New Analysis
          </Link>
        </div>

        {loading && (
          <p className="text-neutral-400 text-sm">Loading your reports...</p>
        )}

        {!loading && reports.length === 0 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center">
            <p className="text-neutral-300 font-medium">No reports yet</p>
            <p className="text-neutral-500 text-sm mt-1">
              Generate your first interview strategy to see it here.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-sm text-pink-500 hover:text-pink-400 font-medium transition-colors"
            >
              Get started →
            </Link>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl divide-y divide-neutral-800 overflow-hidden">
            {reports.map((report) => (
              <button
                key={report._id}
                onClick={() => navigate(`/report/${report._id}`)}
                className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 hover:bg-neutral-800/50 transition-colors"
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
                  className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full border ${scoreColor(
                    report.matchScore,
                  )}`}
                >
                  {report.matchScore}%
                </span>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
