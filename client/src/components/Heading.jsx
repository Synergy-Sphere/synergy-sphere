import { motion } from "framer-motion";

const headingAnimate = {
  initial: {
    opacity: 0,
    scale: 1,
  },
  show: {
    opacity: 1,
    scale: 1.1,

    transition: {
      duration: 1.5,
    },
  },
  hide: {
    opacity: 0,
    scale: 1,
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
};
function Heading({ pixelView }) {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.h1
        className="z-50 font-mono text-2xl lg:text-8xl font-bold uppercase text-blue-900"
        variants={headingAnimate}
        initial="initial"
        animate={pixelView ? "show" : "hide"}
      >
        synergy sphere
      </motion.h1>
    </div>
  );
}

export default Heading;
