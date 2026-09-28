"use client";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={false}
        whileInView={reduced ? undefined : { y: [10, 0] }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
