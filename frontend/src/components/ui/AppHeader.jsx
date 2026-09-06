import { Link } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth.js";
import LogoMark from "../../features/landing/components/LogoMark.jsx";

const AppHeader = ({ activeLink }) => {
  const { user, logout } = useAuth();

  const navLinkClass = (key) =>
    `text-sm transition-colors ${
      activeLink === key
        ? "text-pink-400 font-medium"
        : "text-neutral-400 hover:text-pink-400"
    }`;

  return (
    <header className="relative z-10 border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
      <Link
        to="/app"
        aria-label="InterviewSync"
        className="inline-flex items-center gap-2 text-[15.5px] font-semibold tracking-tight text-white"
      >
        <LogoMark />
        Interview<span className="font-normal">Sync</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/app" className={navLinkClass("home")}>
          New Analysis
        </Link>
        <Link to="/history" className={navLinkClass("history")}>
          History
        </Link>
        <span className="text-sm text-neutral-500 hidden sm:inline">
          {user?.name ? `Hi, ${user.name}` : "Welcome"}
        </span>
        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded-lg border border-white/15 text-neutral-300 hover:border-pink-500/60 hover:text-pink-400 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
