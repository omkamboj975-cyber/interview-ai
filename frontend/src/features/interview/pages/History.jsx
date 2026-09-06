import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import AppBackground from "../../../components/ui/AppBackground.jsx";
import AppHeader from "../../../components/ui/AppHeader.jsx";
import Button from "../../../components/ui/Button.jsx";
import ReportListItem from "../components/ReportListItem.jsx";
import EmptyReportsState from "../components/EmptyReportsState.jsx";

const History = () => {
  const { reports, loading, fetchHistory } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <AppBackground />
      <AppHeader activeLink="history" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Your{" "}
              <em className="font-serif italic text-neutral-400 not-italic-none">
                reports
              </em>
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              All the interview analyses you've generated so far.
            </p>
          </div>
          <Button variant="solid" onClick={() => navigate("/app")}>
            + New Analysis
          </Button>
        </div>

        {loading && (
          <p className="text-neutral-400 text-sm">Loading your reports...</p>
        )}

        {!loading && reports.length === 0 && <EmptyReportsState />}

        {!loading && reports.length > 0 && (
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl divide-y divide-white/10 overflow-hidden">
            {reports.map((report) => (
              <ReportListItem
                key={report._id}
                report={report}
                onClick={() => navigate(`/report/${report._id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
