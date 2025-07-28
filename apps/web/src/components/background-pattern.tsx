import { cn } from "@/utils/cn";

interface BackgroundPatternProps {
  variant?: "diagonal" | "grid" | "dots" | "mesh";
  className?: string;
}

export function BackgroundPattern({
  variant = "diagonal",
  className,
}: BackgroundPatternProps) {
  const patterns = {
    diagonal: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`,
    grid: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(138, 105, 59, 0.015) 40px,
        rgba(138, 105, 59, 0.015) 41px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 40px,
        rgba(138, 105, 59, 0.015) 40px,
        rgba(138, 105, 59, 0.015) 41px
      )
    `,
    dots: `
      radial-gradient(
        circle at 10px 10px,
        rgba(138, 105, 59, 0.03) 1.5px,
        transparent 1.5px
      ),
      radial-gradient(
        circle at 30px 30px,
        rgba(139, 92, 246, 0.02) 1px,
        transparent 1px
      )
    `,
    mesh: `
      conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(138, 105, 59, 0.02) 90deg, transparent 180deg, rgba(139, 92, 246, 0.02) 270deg, transparent 360deg),
      radial-gradient(circle at 20% 80%, rgba(138, 105, 59, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.01) 0%, transparent 50%),
      radial-gradient(circle at 60% 60%, rgba(138, 105, 59, 0.01) 0%, transparent 50%)
    `,
  };

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        "opacity-[0.02] dark:opacity-[0.04]",
        "transition-opacity duration-500",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: patterns[variant],
          backgroundSize:
            variant === "dots"
              ? "40px 40px, 40px 40px"
              : variant === "mesh"
                ? "200px 200px"
                : undefined,
        }}
      />

      {/* Additional gradient overlay for depth */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary-light/10",
        )}
      />
    </div>
  );
}
