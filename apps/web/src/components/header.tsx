import { Container } from "@/components/layouts/layouts";
import { cn } from "@/utils/cn";

export default function Header({
  title,
  subtitle,
  image,
}: {
  image?: string;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}) {
  const background = image
    ? `url(${image || "/bg-elements.png"}) ${
        image ? "50% / cover" : "0 no-repeat"
      }`
    : undefined;

  return (
    <div
      className={cn(
        "pt-[120px] sm:pt-[140px] md:pt-[150px] pb-[80px] sm:pb-[100px] md:pb-[120px] relative overflow-hidden",
        "bg-gradient-to-br from-white via-neutral-1 to-neutral-3",
        "dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg-secondary",
      )}
      style={{ background }}
    >
      {image && (
        <>
          {/* Overlay gradient */}
          <div
            className={cn(
              "absolute inset-0 z-[5]",
              "bg-gradient-to-t from-white via-white/95 to-white/90",
              "dark:from-dark-bg dark:via-dark-bg/95 dark:to-dark-bg/90",
            )}
          />
          {/* Left blur for better text readability */}
          <div
            className={cn(
              "absolute top-0 left-0 bottom-0 w-full md:w-3/4 z-[4] opacity-95",
              "bg-gradient-to-r from-white via-white/95 to-transparent",
              "dark:from-dark-bg dark:via-dark-bg/95 dark:to-transparent",
            )}
          />
        </>
      )}

      {/* Beautiful Background Pattern - When no image */}
      {!image && (
        <>
          {/* Glass overlay base */}
          <div
            className={cn("absolute inset-0 z-[2]", "backdrop-blur-[0.5px]")}
          />

          {/* Center radial gradient */}
          <div
            className={cn(
              "absolute inset-0 z-[3]",
              "bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(245,245,245,0.3)_40%,_rgba(245,245,245,0.5)_100%)]",
              "dark:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(26,26,26,0.3)_40%,_rgba(26,26,26,0.5)_100%)]",
            )}
          />

          {/* Decorative gradient orbs */}
          <div className="absolute inset-0 overflow-hidden z-[1]">
            <div
              className={cn(
                "absolute -top-40 -right-40 w-[500px] h-[500px]",
                "bg-gradient-to-br from-primary/8 via-primary/3 to-transparent",
                "dark:from-primary-light/10 dark:via-primary-light/3",
                "rounded-full blur-3xl",
              )}
            />
            <div
              className={cn(
                "absolute -bottom-40 -left-40 w-[500px] h-[500px]",
                "bg-gradient-to-tr from-primary/6 via-primary/2 to-transparent",
                "dark:from-primary-light/8 dark:via-primary-light/2",
                "rounded-full blur-3xl",
              )}
            />
          </div>

          {/* Subtle mesh pattern overlay */}
          <div
            className={cn(
              "absolute inset-0 z-[4]",
              "opacity-[0.02] dark:opacity-[0.03]",
            )}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(138, 105, 59, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 50%, rgba(138, 105, 59, 0.1) 0%, transparent 50%)
                `,
                backgroundSize: "150% 150%",
              }}
            />
          </div>
        </>
      )}

      <Container>
        <div className="relative z-[6]">
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold",
              "text-neutral-9 dark:text-neutral-1",
              "bg-gradient-to-r from-primary to-primary-dark",
              "dark:from-neutral-1 dark:to-neutral-2",
              "bg-clip-text text-transparent animate-fadeUp",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "text-lg md:text-xl leading-relaxed font-normal",
              "mt-6 max-w-3xl",
              "text-neutral-7 dark:text-neutral-3",
              "animate-fadeUp animation-delay-200",
            )}
          >
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
}
