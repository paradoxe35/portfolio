import { Container } from "@/components/layouts/layouts";
import { cn } from "@/utils/cn";

export default function Header({
  title,
  subtitle,
  image,
}: {
  image?: string;
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
}) {
  return (
    <div
      className={cn(
        "pt-[150px] pb-[120px] relative overflow-hidden",
        "bg-gradient-to-br from-white via-neutral-1 to-neutral-2",
        "dark:from-dark-bg dark:via-dark-bg-secondary dark:to-black",
      )}
      style={{
        background:
          image === undefined
            ? undefined
            : `url(${image || "/bg-elements.png"}) ${
                image ? "50% / cover" : "0 no-repeat"
              }`,
      }}
    >
      {image && (
        <>
          {/* Overlay gradient */}
          <div
            className={cn(
              "absolute inset-0 z-[5]",
              "bg-gradient-to-t from-neutral-1 via-neutral-1/95 to-neutral-1/90",
              "dark:from-dark-bg dark:via-dark-bg/95 dark:to-dark-bg/90",
            )}
          />
          {/* Left blur for better text readability */}
          <div
            className={cn(
              "absolute top-0 left-0 bottom-0 w-full md:w-3/4 z-[4] opacity-95",
              "bg-gradient-to-r from-neutral-1 via-neutral-1/95 to-transparent",
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
              "dark:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(26,15,31,0.3)_40%,_rgba(26,15,31,0.5)_100%)]",
            )}
          />

          {/* Decorative gradient orbs */}
          <div className="absolute inset-0 overflow-hidden z-[1]">
            <div
              className={cn(
                "absolute -top-40 -right-40 w-[600px] h-[600px]",
                "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
                "dark:from-primary-light/15 dark:via-primary-light/5",
                "rounded-full blur-3xl",
              )}
            />
            <div
              className={cn(
                "absolute -bottom-40 -left-40 w-[600px] h-[600px]",
                "bg-gradient-to-tr from-purple-500/10 via-purple-500/5 to-transparent",
                "dark:from-purple-400/15 dark:via-purple-400/5",
                "rounded-full blur-3xl",
              )}
            />
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[800px] h-[800px]",
                "bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5",
                "dark:from-primary-light/10 dark:via-transparent dark:to-purple-400/10",
                "rounded-full blur-3xl",
              )}
            />
          </div>

          {/* Subtle mesh pattern overlay */}
          <div
            className={cn(
              "absolute inset-0 z-[4]",
              "opacity-[0.03] dark:opacity-[0.05]",
            )}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(138, 105, 59, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 50% 80%, rgba(138, 105, 59, 0.1) 0%, transparent 50%)
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
              "bg-gradient-to-r from-neutral-9 to-neutral-8",
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
