import { Link } from "react-router";
import Button from "../../../components/ui/Button.jsx";

const LogoMark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <g transform="rotate(-30 12 12)">
      <circle cx="7.3" cy="3.2" r="1.45" />
      <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
      <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
      <circle cx="16.7" cy="20.8" r="1.45" />
    </g>
  </svg>
);

const NavPill = ({ to, children }) => (
  <Link
    to={to}
    className="relative overflow-hidden h-10 px-4 flex items-center rounded-md border border-white/30 text-[14px] text-[#f3f3f3] bg-gradient-to-r from-[#050505] via-[#2a2a2a] to-[#4a4a4a] hover:border-white/70 hover:shadow-[0_0_18px_rgba(200,210,230,0.18)] transition-all duration-300 group"
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </Link>
);

const Landing = () => {
  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="shrink-0 grid grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10 py-5">
        <Link
          to="/"
          aria-label="InterviewSync"
          className="justify-self-start inline-flex items-center gap-2 text-[15.5px] font-semibold tracking-tight"
        >
          <LogoMark />
          Interview<span className="font-normal">Sync</span>
        </Link>

        <nav className="justify-self-center hidden md:flex items-center gap-2">
          <NavPill to="/login">Sign In</NavPill>
        </nav>

        <div className="justify-self-end">
          <Button
            variant="solid"
            onClick={() => (window.location.href = "/register")}
          >
            Start for Free
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 min-h-0 flex items-end justify-center px-6 pt-2 pb-16">
        <div className="relative z-10 flex flex-col items-center text-center max-w-[860px] w-full">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-md text-[12.5px] bg-gradient-to-r from-[#7d7d7d] via-[#2a2a2a] to-[#0a0a0a] text-[#f2f2f2]">
            ✦ AI-Powered Interview Preparation
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.12] tracking-tight">
            <span className="block overflow-hidden py-1">
              Turn your{" "}
              <em className="font-serif italic text-[#9a9a9a] not-italic-none">
                resume
              </em>{" "}
              into an
            </span>
            <span className="block overflow-hidden py-1">
              interview strategy.
            </span>
          </h1>

          <p className="max-w-[470px] mt-4 text-[15.5px] leading-relaxed text-[#9a9a9a]">
            Upload your resume and a job description — get a match score,
            tailored interview questions, and a day-by-day prep plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
            <Button
              variant="solid"
              onClick={() => (window.location.href = "/register")}
            >
              Start for Free
            </Button>
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/login")}
            >
              Sign in to continue
            </Button>
          </div>
        </div>
      </main>

      {/* Stats footer */}
      <footer className="shrink-0 flex flex-wrap items-center justify-center md:justify-between gap-6 px-8 sm:px-18 pb-9 text-[#d8d8d8]">
        <div className="inline-flex items-center gap-3 text-[13.5px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="3.4"
              y="2.6"
              width="7.2"
              height="18.8"
              rx="3.6"
              fill="#e8e8e8"
              fillOpacity="0.5"
            />
            <rect
              x="13.4"
              y="2.6"
              width="7.2"
              height="18.8"
              rx="3.6"
              fill="#e8e8e8"
              fillOpacity="0.5"
            />
            <rect
              x="9.2"
              y="10.9"
              width="5.6"
              height="2.2"
              rx="1.1"
              fill="#4a4a4a"
            />
          </svg>
          500+ resumes analyzed
        </div>
        <div className="inline-flex items-center gap-3 text-[13.5px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="2.4"
              y="2.4"
              width="19.2"
              height="19.2"
              rx="6.2"
              fill="#ffffff"
            />
            <path
              d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85"
              stroke="#111"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          3-day average prep plan
        </div>
        <div className="inline-flex items-center gap-3 text-[13.5px]">
          <svg width="40" height="22" viewBox="0 0 40 22">
            <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
            <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
            <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
          </svg>
          Built for job seekers everywhere
        </div>
      </footer>
    </div>
  );
};

export default Landing;
