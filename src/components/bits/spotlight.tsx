"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight — wraps a card and tracks the mouse position so the
 * `.spotlight::after` radial gradient follows the cursor.
 * Disabled on touch devices (no hover) and reduced-motion users.
 */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("spotlight", className)}
    >
      {children}
    </div>
  );
}
