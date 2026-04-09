import { motion, useInView, type Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  scale?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 40,
  once = true,
  scale = false,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const getInitial = () => {
    const pos: Record<string, number> = { x: 0, y: 0 };
    switch (direction) {
      case "up": pos.y = distance; break;
      case "down": pos.y = -distance; break;
      case "left": pos.x = distance; break;
      case "right": pos.x = -distance; break;
    }
    return pos;
  };

  const initial = getInitial();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      ...initial,
      ...(scale ? { scale: 0.95 } : {}),
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      ...(scale ? { scale: 1 } : {}),
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
