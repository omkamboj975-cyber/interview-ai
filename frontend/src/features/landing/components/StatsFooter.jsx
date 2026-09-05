import { motion } from "framer-motion";
import { fadeUp, easeOut } from "../animations.js";

const stats = [
  {
    label: "500+ resumes analyzed",
    delay: 1.12,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3.4"
          y="2.6"
          width="7.2"
          height="18.8"
          rx="3.6"
          fill="#e8e8e8"
          fillOpacity="0.5"
        />
        <rect
          x="13.4"
          y="2.6"
          width="7.2"
          height="18.8"
          rx="3.6"
          fill="#e8e8e8"
          fillOpacity="0.5"
        />
        <rect
          x="9.2"
          y="10.9"
          width="5.6"
          height="2.2"
          rx="1.1"
          fill="#4a4a4a"
        />
      </svg>
    ),
  },
  {
    label: "3-day average prep plan",
    delay: 1.28,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="2.4"
          y="2.4"
          width="19.2"
          height="19.2"
          rx="6.2"
          fill="#ffffff"
        />
        <path
          d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85"
          stroke="#111"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Built for job seekers everywhere",
    delay: 1.44,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="8.5" cy="7.5" r="3.2" stroke="#e8e8e8" strokeWidth="1.6" />
        <path
          d="M2.5 19.5c0-3.6 2.7-6 6-6s6 2.4 6 6"
          stroke="#e8e8e8"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle
          cx="16.5"
          cy="8.2"
          r="2.6"
          stroke="#e8e8e8"
          strokeWidth="1.4"
          opacity="0.6"
        />
        <path
          d="M14.8 12.2c2.6 0.4 4.2 2.2 4.2 5"
          stroke="#e8e8e8"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    ),
  },
];

const StatsFooter = () => {
  return (
    <footer className="relative z-10 shrink-0 flex flex-wrap items-center justify-center md:justify-between gap-6 px-8 sm:px-18 pb-9 text-[#d8d8d8]">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.05, ease: easeOut, delay: stat.delay }}
          className="inline-flex items-center gap-3 text-[13.5px]"
        >
          {stat.icon}
          {stat.label}
        </motion.div>
      ))}
    </footer>
  );
};

export default StatsFooter;
