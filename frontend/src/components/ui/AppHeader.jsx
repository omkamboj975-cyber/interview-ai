import { Link } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth.js";
import LogoMark from "../../features/landing/components/LogoMark.jsx";

const AppHeader = ({ activeLink }) => {
  const { user, logout } = useAuth();

  const navLinkClass = (key) =>
    `border-b-2 py-1.5 text-sm transition-colors ${
      activeLink === key
        ? "border-white font-medium text-white"
        : "border-transparent text-neutral-400 hover:text-white"
    }`;

  return (
    <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
      <div className="mx-auto flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-8">
        <Link
          to="/app"
          aria-label="InterviewSync"
          className="inline-flex items-center gap-2 text-[15.5px] font-semibold tracking-tight text-white"
        >
          <LogoMark />
          Interview<span className="font-normal">Sync</span>
        </Link>

        <nav className="order-3 flex w-full items-center gap-6 sm:order-none sm:ml-auto sm:w-auto">
          <Link to="/app" className={navLinkClass("home")}>
            New Analysis
          </Link>
          <Link to="/history" className={navLinkClass("history")}>
            History
          </Link>
          <span className="hidden text-sm text-neutral-400 md:inline">
            {user?.name ? `Hi, ${user.name}` : "Welcome"}
          </span>
        </nav>

        <button
          onClick={logout}
          className="order-2 ml-auto min-h-10 rounded-lg border border-white/20 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white sm:order-none sm:ml-0"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
