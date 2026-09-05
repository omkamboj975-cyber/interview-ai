const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark scrim so text stays readable on top */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default AnimatedBackground;
