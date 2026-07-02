"use client";

const PARTICLES = ["✨", "💗", "🌸", "●", "◆", "🎉"];

export function ConfettiBurst() {
  return (
    <div className="confetti-burst pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="confetti-particle absolute select-none"
          style={{
            left: `${6 + ((i * 19) % 88)}%`,
            top: `${4 + ((i * 11) % 30)}%`,
            animationDelay: `${i * 0.07}s`,
            fontSize: i % 3 === 0 ? "1.5rem" : "0.75rem",
          }}
        >
          {PARTICLES[i % PARTICLES.length]}
        </span>
      ))}
    </div>
  );
}
