"use client";

import { useEffect, useState } from "react";

const PALETTE = ["var(--mm-accent)", "var(--mm-accent-strong)", "var(--mm-on-container)", "#e8c9a0"];

type Piece = {
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  size: number;
};

export default function Confetti({
  fire,
  onEnd,
}: {
  fire: boolean;
  onEnd?: () => void;
}) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!fire) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onEnd?.();
      return;
    }

    const next: Piece[] = Array.from({ length: 44 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2.6 + Math.random() * 1.8,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotate: Math.random() * 360,
      size: 0.7 + Math.random() * 0.7,
    }));
    setPieces(next);
    const t = setTimeout(() => {
      setPieces([]);
      onEnd?.();
    }, 5000);
    return () => clearTimeout(t);
  }, [fire, onEnd]);

  if (pieces.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="mm-confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg) scale(${p.size})`,
          }}
        />
      ))}
    </div>
  );
}
