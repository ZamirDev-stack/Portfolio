"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

/**
 * AnimatedCount — counts up from 0 to `value` when scrolled into view.
 * Falls back to the static value instantly when reduced motion is set,
 * and renders the plain value on the server (SSR-safe).
 *
 * Note: only numeric values are animated; string values (e.g. "BCA", "Open")
 * are rendered as-is.
 */
export function AnimatedCount({
  value,
  suffix = "",
  duration = 1.2,
  className,
}: {
  value: string | number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // For non-numeric values, just render directly.
  const numeric = typeof value === "number" ? value : Number(value);
  const isNumeric = !Number.isNaN(numeric) && String(value).trim() !== "";

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = React.useState(isNumeric ? 0 : value);

  React.useEffect(() => {
    if (!inView || !isNumeric) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(numeric);
      return;
    }
    mv.set(numeric);
    const unsub = spring.on("change", (v) => {
      setDisplay(Number.isInteger(numeric) ? Math.round(v) : Number(v.toFixed(1)));
    });
    return () => unsub();
  }, [inView, isNumeric, numeric, mv, spring]);

  return (
    <motion.span
      ref={ref}
      className={className}
      // Keep the final value in the DOM for SEO / no-JS / crawlers
      data-value={value}
    >
      {isNumeric ? display : value}
      {suffix}
    </motion.span>
  );
}
