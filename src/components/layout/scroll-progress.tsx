"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-[2px] origin-left",
        "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400",
        className
      )}
    />
  );
}
