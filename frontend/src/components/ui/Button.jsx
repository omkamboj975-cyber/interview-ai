const variants = {
  solid:
    "bg-gradient-to-b from-white via-neutral-200 to-neutral-300 text-black border border-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:via-neutral-100 hover:shadow-[inset_0_1px_0_#fff,0_0_22px_rgba(255,255,255,0.25)]",
  ghost:
    "bg-white/[0.04] text-white border border-white/25 backdrop-blur-md hover:bg-white/10 hover:border-white/50",
};

const Button = ({ children, variant = "solid", className = "", ...props }) => {
  return (
    <button
      className={`group relative isolate inline-flex h-11 items-center justify-center overflow-hidden whitespace-nowrap rounded-lg px-5 text-sm font-medium tracking-tight transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />
    </button>
  );
};

export default Button;
