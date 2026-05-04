import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0.03 : staggerDelay,
            delayChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        prefersReducedMotion
          ? {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.25, ease: "easeOut" },
              },
            }
          : {
              hidden: {
                opacity: 0,
                y: 30,
                filter: "blur(4px)",
                scale: 0.96,
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: {
                  duration: 0.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
