"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A subtle Custom cursor for desktop (pointer: fine).
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.4 };
  const cx = useSpring(x, springConfig);
  const cy = useSpring(y, springConfig);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{
          x: cx,
          y: cy,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <motion.div
          animate={{
            width: hovering ? 44 : 30,
            height: hovering ? 44 : 30,
            borderColor: hovering
              ? "color-mix(in oklch, var(--primary) 80%, transparent)"
              : "color-mix(in oklch, var(--foreground) 30%, transparent)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="rounded-full border"
        />
      </motion.div>
      {/* inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: hidden ? 0 : 1 }}
      >
        <div className="size-1.5 rounded-full bg-primary" />
      </motion.div>
    </>
  );
}
