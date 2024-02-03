import { motion } from "framer-motion";

const anim = (variants, custom = null) => {
  return {
    initial: "initial",

    animate: "enter",

    exit: "exit",

    custom,

    variants,
  };
};

export const expand = {
  initial: {
    top: 0,
  },

  enter: {
    top: "100vh",

    transition: {
      duration: 0.4,

      //   delay: 0.05,

      ease: [0.215, 0.61, 0.355, 1],
    },

    transitionEnd: { height: "0", top: "0" },
  },

  exit: {
    height: "100vh",

    transition: {
      duration: 0.4,

      //   delay: 0.05,

      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const Inner = () => {
  return (
    <motion.div
      className="h-screen w-full fixed inset-0 z-10 bg-royal"
      {...anim(expand)}
    />
  );
};

export default Inner;
