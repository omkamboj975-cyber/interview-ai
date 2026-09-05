const variants = {
  solid:
    "bg-gradient-to-b from-white via-neutral-200 to-neutral-300 text-black border border-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] hover:from-white hover:via-[#f3f6ff] hover:to-[#d5def2] hover:shadow-[inset_0_1px_0_#fff,0_0_22px_rgba(186,208,255,0.35)]",
  ghost:
    "bg-gradient-to-br from-white/10 via-black/45 to-[rgba(160,175,200,0.08)] text-white border border-white/30 backdrop-blur-md hover:border-white/60 hover:shadow-[0_0_20px_rgba(170,200,255,0.22)]",
};

const Button = ({ children, variant = "solid", className = "", ...props }) => {
  return (
    <button
      className={`relative isolate overflow-hidden inline-flex items-center justify-center h-[42px] px-5 rounded-md text-[13.5px] font-medium tracking-tight transition-all duration-300 whitespace-nowrap group ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </button>
  );
};

export default Button;
