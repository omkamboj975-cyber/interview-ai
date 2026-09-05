import { Link } from "react-router";
import { motion } from "framer-motion";
import LogoMark from "./LogoMark.jsx";
import NavPill from "./NavPill.jsx";
import Button from "../../../components/ui/Button.jsx";
import { fadeScale, easeOut } from "../animations.js";

const Header = () => {
  return (
    <header className="relative z-10 shrink-0 grid grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10 py-5">
      <motion.div
        variants={fadeScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.05, ease: easeOut, delay: 0.08 }}
        className="justify-self-start"
      >
        <Link
          to="/"
          aria-label="InterviewSync"
          className="inline-flex items-center gap-2 text-[15.5px] font-semibold tracking-tight"
        >
          <LogoMark />
          Interview<span className="font-normal">Sync</span>
        </Link>
      </motion.div>

      <nav className="justify-self-center hidden md:flex items-center gap-2">
        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.05, ease: easeOut, delay: 0.16 }}
        >
          <NavPill to="/login">Sign In</NavPill>
        </motion.div>
      </nav>

      <motion.div
        variants={fadeScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.05, ease: easeOut, delay: 0.34 }}
        className="justify-self-end"
      >
        <Button
          variant="solid"
          onClick={() => (window.location.href = "/register")}
        >
          Start for Free
        </Button>
      </motion.div>
    </header>
  );
};

export default Header;
