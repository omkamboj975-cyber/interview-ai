import { motion } from "framer-motion";
import Button from "../../../components/ui/Button.jsx";
import { fadeUp, maskUp, popIn, btnUp, easeOut } from "../animations.js";

const Hero = () => {
  return (
    <main className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-6 pt-2 pb-8 overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-[860px] w-full">
        <motion.span
          variants={popIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, ease: easeOut, delay: 0.22 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-md text-[12.5px] bg-gradient-to-r from-[#7d7d7d] via-[#2a2a2a] to-[#0a0a0a] text-[#f2f2f2]"
        >
          ✦ AI-Powered Interview Preparation
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.12] tracking-tight">
          <span className="block overflow-hidden py-1">
            <motion.span
              variants={maskUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.05, ease: easeOut, delay: 0.42 }}
              className="inline-block"
            >
              Turn your{" "}
              <em className="font-serif italic text-[#9a9a9a] not-italic-none">
                resume
              </em>{" "}
              into an
            </motion.span>
          </span>

          <span className="block overflow-hidden py-1">
            <motion.span
              variants={maskUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.05, ease: easeOut, delay: 0.62 }}
              className="inline-block"
            >
              interview strategy.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.25, ease: easeOut, delay: 0.82 }}
          className="max-w-[470px] mt-4 text-[15.5px] leading-relaxed text-[#9a9a9a]"
        >
          Upload your resume and a job description — get a match score, tailored
          interview questions, and a day-by-day prep plan.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <motion.div
            variants={btnUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.05, ease: easeOut, delay: 0.96 }}
          >
            <Button
              variant="solid"
              onClick={() => (window.location.href = "/register")}
            >
              Start for Free
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.05, ease: easeOut, delay: 1.1 }}
          >
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/login")}
            >
              Sign in to continue
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
