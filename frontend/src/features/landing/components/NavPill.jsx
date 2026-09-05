import { Link } from "react-router";

const NavPill = ({ to, children }) => (
  <Link
    to={to}
    className="relative overflow-hidden h-10 px-4 flex items-center rounded-md border border-white/30 text-[14px] text-[#f3f3f3] bg-gradient-to-r from-[#050505] via-[#2a2a2a] to-[#4a4a4a] hover:border-white/70 hover:shadow-[0_0_18px_rgba(200,210,230,0.18)] transition-all duration-300 group"
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </Link>
);

export default NavPill;
