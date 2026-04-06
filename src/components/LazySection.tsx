import { useRef, useState, useEffect, Suspense, ComponentType, lazy } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const StaggerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
};

export { childVariants, StaggerWrapper };

interface LazySectionProps {
  factory: () => Promise<{ default: ComponentType }>;
  rootMargin?: string;
}

const LazySection = ({ factory, rootMargin = "200px" }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const LazyComp = lazy(factory);
          setComponent(() => LazyComp);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [factory, rootMargin]);

  return (
    <div ref={ref}>
      {Component && (
        <Suspense fallback={null}>
          <StaggerWrapper>
            <Component />
          </StaggerWrapper>
        </Suspense>
      )}
    </div>
  );
};

export default LazySection;