import { useRef, useState, useEffect, Suspense, ComponentType, lazy } from "react";

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
          <Component />
        </Suspense>
      )}
    </div>
  );
};

export default LazySection;