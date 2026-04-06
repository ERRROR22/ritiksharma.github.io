import { useRef, useState, useEffect, Suspense, ComponentType, lazy } from "react";
import { motion } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Component />
          </motion.div>
        </Suspense>
      )}
    </div>
  );
};

export default LazySection;