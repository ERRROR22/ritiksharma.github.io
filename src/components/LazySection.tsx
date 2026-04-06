import { useRef, useState, useEffect, Suspense, ComponentType, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LazySection = ({
  factory,
  rootMargin = "300px",
}: {
  factory: () => Promise<{ default: ComponentType }>;
  rootMargin?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
    <div ref={ref} style={{ minHeight: Component ? undefined : 1 }}>
      {Component && (
        <Suspense fallback={null}>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Component />
          </motion.div>
        </Suspense>
      )}
    </div>
  );
};

export default LazySection;