import { AnimatePresence, motion } from "motion/react";

export const ErrorMessage = (props: { children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
        className="mt-2 text-sm text-red-500 animate-pulse"
      >
        {props.children}
      </motion.p>
    </AnimatePresence>
  );
};

export default ErrorMessage;
