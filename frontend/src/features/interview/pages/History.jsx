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
    <div className="relative isolate min-h-screen bg-black text-white">
      <AppBackground />
      <AppHeader activeLink="history" />

      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-3">
            {!loading && reports.length > 0 && (
              <span className="rounded-lg border border-white/10 bg-white/[0.07] px-4 py-1.5 text-xs text-neutral-200 sm:text-[13px]">
                {reports.length} saved{" "}
                {reports.length === 1 ? "analysis" : "analyses"}
              </span>
            )}
            <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Your{" "}
              <em className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text pr-1 font-serif font-normal italic text-transparent">
                reports
              </em>
            </h1>
            <p className="text-sm text-neutral-400 sm:text-base">
              All the interview analyses you've generated so far.
            </p>
          </div>
          <Button
            variant="solid"
            onClick={() => navigate("/app")}
            className="w-full sm:w-auto"
          >
            New Analysis
          </Button>
        </div>

        {loading && (
          <p className="text-sm text-neutral-400">Loading your reports...</p>
        )}

        {!loading && reports.length === 0 && <EmptyReportsState />}

        {!loading && reports.length > 0 && (
          <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-sm">
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
