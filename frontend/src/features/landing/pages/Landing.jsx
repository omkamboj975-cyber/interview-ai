import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import StatsFooter from "../components/StatsFooter.jsx";

const Landing = () => {
  return (
    <div className="relative h-[100dvh] bg-black text-white overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <Hero />
      <StatsFooter />
    </div>
  );
};

export default Landing;
