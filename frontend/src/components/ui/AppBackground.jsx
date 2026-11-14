const AppBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_50%_-140px,rgba(255,255,255,0.11),transparent_70%),radial-gradient(700px_500px_at_0%_45%,rgba(255,255,255,0.04),transparent_70%),radial-gradient(800px_520px_at_100%_80%,rgba(255,255,255,0.05),transparent_70%)]" />
    </div>
  );
};

export default AppBackground;
