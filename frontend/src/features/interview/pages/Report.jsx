import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import AppBackground from "../../../components/ui/AppBackground.jsx";
import AppHeader from "../../../components/ui/AppHeader.jsx";
import ReportNav from "../components/ReportSidebar.jsx";
import ScorePanel from "../components/ScorePanel.jsx";
import QuestionList from "../components/QuestionList.jsx";
import RoadMap from "../components/RoadMap.jsx";

const Report = () => {
  const { id } = useParams();
  const location = useLocation();
  const { currentReport, loading, fetchReportById } = useInterview();
  const [activeSection, setActiveSection] = useState("technical");

  const report = location.state?.report || currentReport;

  useEffect(() => {
    if (!location.state?.report) {
      fetchReportById(id).catch(() => {});
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-neutral-400">Loading report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-neutral-400">
          Report not found. Try generating a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AppBackground />
      <AppHeader activeLink="home" />

      <div className="relative z-10 flex flex-col md:flex-row">
        <ReportNav activeSection={activeSection} onSelect={setActiveSection} />

        <main className="flex-1 p-6 md:p-8">
          {activeSection === "technical" && (
            <QuestionList
              title="Technical Questions"
              questions={report.technicalQuestions}
            />
          )}
          {activeSection === "behavioral" && (
            <QuestionList
              title="Behavioral Questions"
              questions={report.behavioralQuestions}
            />
          )}
          {activeSection === "roadmap" && (
            <RoadMap plan={report.preparationPlan} />
          )}
        </main>

        <ScorePanel
          matchScore={report.matchScore}
          scoreExplanation={report.scoreExplanation}
          skillGap={report.skillGap}
        />
      </div>
    </div>
  );
};

export default Report;
