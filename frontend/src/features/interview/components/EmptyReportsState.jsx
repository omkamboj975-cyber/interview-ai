import { Link } from "react-router";

const EmptyReportsState = () => (
  <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-10 text-center">
    <p className="text-neutral-300 font-medium">No reports yet</p>
    <p className="text-neutral-500 text-sm mt-1">
      Generate your first interview strategy to see it here.
    </p>
    <Link
      to="/app"
      className="inline-block mt-4 text-sm text-pink-500 hover:text-pink-400 font-medium transition-colors"
    >
      Get started →
    </Link>
  </div>
);

export default EmptyReportsState;
