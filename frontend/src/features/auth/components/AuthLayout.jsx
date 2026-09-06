import { Link } from "react-router";
import AppBackground from "../../../components/ui/AppBackground.jsx";
import LogoMark from "../../landing/components/LogoMark.jsx";

const AuthLayout = ({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <AppBackground />

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 justify-center w-full mb-8 text-[15.5px] font-semibold tracking-tight"
        >
          <LogoMark />
          Interview<span className="font-normal">Sync</span>
        </Link>

        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-8">
          <h1 className="text-3xl font-medium tracking-tight mb-8">{title}</h1>
          {children}
        </div>

        <p className="text-center text-neutral-400 text-sm mt-6">
          {footerText}{" "}
          <Link
            to={footerLinkTo}
            className="text-pink-500 hover:text-pink-400 font-medium transition-colors"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
