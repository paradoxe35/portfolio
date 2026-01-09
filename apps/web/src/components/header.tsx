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
  return (
    <div
      className={cn(
        "pt-[120px] sm:pt-[140px] md:pt-[150px] pb-[80px] sm:pb-[100px] md:pb-[120px]",
        "relative overflow-hidden",
        "bg-gradient-to-b from-white via-neutral-1 to-neutral-2",
        "dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg-secondary"
      )}
    >
      {/* Background image (for project pages) */}
      {image && (
        <>
          <div
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Overlay for readability */}
          <div
            className={cn(
              "absolute inset-0 z-[2]",
              "bg-gradient-to-r from-white via-white/95 to-white/80",
              "dark:from-dark-bg dark:via-dark-bg/95 dark:to-dark-bg/80"
            )}
          />
        </>
      )}

      {/* Subtle decorative element */}
      {!image && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <div
            className={cn(
              "absolute -top-1/2 -right-1/4 w-[800px] h-[800px]",
              "bg-primary/[0.03] dark:bg-primary-light/[0.05]",
              "rounded-full blur-3xl"
            )}
          />
        </div>
      )}

      <Container>
        <div className="relative z-[3]">
          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-bold",
              "text-neutral-9 dark:text-white",
              "animate-fadeUp"
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "text-base sm:text-lg md:text-xl",
              "mt-4 max-w-2xl leading-relaxed",
              "text-neutral-6 dark:text-neutral-4",
              "animate-fadeUp animation-delay-100"
            )}
          >
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
}
