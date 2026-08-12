import { useAuth } from "../../auth/hooks/useAuth.js";
import { Link } from "react-router";

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Demo data — replace with real data once analysis history is built
  const stats = [
    { label: "Analyses run", value: "12" },
    { label: "Avg. match score", value: "74%" },
    { label: "Resumes uploaded", value: "5" },
  ];

  const recentAnalyses = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Nimbus Tech",
      score: 82,
      date: "Aug 10, 2026",
    },
    {
      id: 2,
      role: "Backend Engineer",
      company: "Orbit Systems",
      score: 67,
      date: "Aug 7, 2026",
    },
    {
      id: 3,
      role: "Full Stack Developer",
      company: "Vertex Labs",
      score: 91,
      date: "Aug 3, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top nav */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          Interview<span className="text-pink-500">Sync</span>
        </h1>
        <div className="flex items-center gap-4">
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

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Header row */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-neutral-400 text-sm mt-1">
              Track your resume analyses and see where you stand.
            </p>
          </div>
          <Link
            to="/upload"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            + New Analysis
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
            >
              <p className="text-neutral-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent analyses */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent analyses</h3>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl divide-y divide-neutral-800 overflow-hidden">
            {recentAnalyses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-neutral-800/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{item.role}</p>
                  <p className="text-neutral-400 text-sm">
                    {item.company} · {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <ScoreBadge score={item.score} />
                  <Link
                    to={`/analysis/${item.id}`}
                    className="text-sm text-pink-500 hover:text-pink-400 font-medium transition-colors"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const ScoreBadge = ({ score }) => {
  const color =
    score >= 80
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      : score >= 60
        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
        : "bg-red-500/10 text-red-400 border-red-500/30";

  return (
    <span
      className={`text-sm font-semibold px-3 py-1 rounded-full border ${color}`}
    >
      {score}%
    </span>
  );
};

export default Dashboard;
