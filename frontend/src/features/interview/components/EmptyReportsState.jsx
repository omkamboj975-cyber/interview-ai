import { Link } from "react-router";

const EmptyReportsState = () => (
  <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-8 text-center backdrop-blur-sm sm:p-12">
    <p className="text-base font-medium text-neutral-100">No reports yet</p>
    <p className="mt-2 text-sm text-neutral-400">
      Generate your first interview strategy to see it here.
    </p>
    <Link
      to="/app"
      className="mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-white bg-gradient-to-b from-white via-neutral-200 to-neutral-300 px-6 text-sm font-medium text-black transition-all hover:via-neutral-100 hover:shadow-[0_0_22px_rgba(255,255,255,0.25)]"
    >
      Get started
    </Link>
  </div>
);

export default EmptyReportsState;
