import { useState } from "react";
import { useLocation, useParams } from "react-router";

const severityStyles = {
  high: "bg-red-500/10 text-red-400 border-red-500/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

const scoreColor = (score) => {
  if (score >= 75) return "#34d399"; // emerald
  if (score >= 50) return "#fbbf24"; // amber
  return "#f87171"; // red
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
      <p className="text-xs text-neutral-400 text-center mt-2 max-w-35">
        {label}
      </p>
    </div>
  );
};

const Report = () => {
  const { id } = useParams();
  const location = useLocation();
  const report = location.state?.report;

  const [activeSection, setActiveSection] = useState("technical");

  if (!report) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-neutral-400">
          Report not found. Try generating a new one.
        </p>
      </div>
    );
  }

  const sections = [
    { key: "technical", label: "Technical Questions", icon: "</>" },
    { key: "behavioral", label: "Behavioral Questions", icon: "💬" },
    { key: "roadmap", label: "Road Map", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-neutral-800 p-4">
        <p className="text-xs font-semibold text-neutral-500 tracking-wide mb-3 px-2">
          SECTIONS
        </p>
        <nav className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${
                activeSection === s.key
                  ? "bg-pink-600/15 text-pink-400 font-medium"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
              }`}
            >
              <span className="text-xs">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
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

      {/* Right panel: score + skill gaps */}
      <aside className="w-full md:w-72 border-t md:border-t-0 md:border-l border-neutral-800 p-6">
        <p className="text-xs font-semibold text-neutral-500 tracking-wide mb-4">
          MATCH SCORE
        </p>
        <div className="flex justify-center mb-8">
          <MatchScoreRing score={report.matchScore} />
        </div>

        <p className="text-xs font-semibold text-neutral-500 tracking-wide mb-3">
          SKILL GAPS
        </p>
        <div className="flex flex-col gap-2">
          {report.skillGap?.length ? (
            report.skillGap.map((gap, i) => (
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
    </div>
  );
};

const QuestionList = ({ title, questions }) => (
  <div>
    <h2 className="text-xl font-bold mb-6">{title}</h2>
    <div className="space-y-4">
      {questions?.map((q, i) => (
        <div
          key={i}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
        >
          <p className="font-medium text-neutral-100">{q.question}</p>
          <p className="text-xs text-neutral-500 mt-2">
            <span className="text-pink-400 font-medium">
              Why this is asked:{" "}
            </span>
            {q.intention}
          </p>
          <details className="mt-3 group">
            <summary className="text-xs text-neutral-400 cursor-pointer hover:text-pink-400 transition-colors list-none flex items-center gap-1">
              <span className="group-open:rotate-90 transition-transform">
                ▸
              </span>{" "}
              View model answer
            </summary>
            <p className="text-sm text-neutral-300 mt-2 pl-4 border-l-2 border-neutral-800">
              {q.answer}
            </p>
          </details>
        </div>
      ))}
    </div>
  </div>
);

const RoadMap = ({ plan }) => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-bold">Preparation Road Map</h2>
      <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full">
        {plan?.length}-day plan
      </span>
    </div>

    <div className="relative pl-6 border-l-2 border-neutral-800 space-y-8">
      {plan?.map((day, i) => (
        <div key={i} className="relative">
          <span className="absolute -left-7.25 top-0 w-3 h-3 rounded-full bg-pink-500 ring-4 ring-neutral-950" />
          <span className="inline-block text-[10px] font-bold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full mb-1">
            Day {day.day}
          </span>
          <h3 className="font-semibold text-neutral-100">{day.focus}</h3>
          <ul className="mt-2 space-y-1">
            {day.tasks?.map((task, ti) => (
              <li key={ti} className="text-sm text-neutral-400 flex gap-2">
                <span className="text-neutral-600">•</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default Report;
