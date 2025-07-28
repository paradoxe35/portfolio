import { Container } from "@/components/layouts/layouts";

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
      className="pt-[150px] pb-[120px] relative bg-gradient-to-br from-white via-neutral-1 to-neutral-2 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-black overflow-hidden"
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
          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-neutral-1 via-neutral-1/95 to-neutral-1/90 dark:from-dark-bg dark:via-dark-bg/95 dark:to-dark-bg/90" />
          {/* Left blur for better text readability */}
          <div className="absolute top-0 left-0 bottom-0 w-full md:w-3/4 z-[4] opacity-95 bg-gradient-to-r from-neutral-1 via-neutral-1/95 to-transparent dark:from-dark-bg dark:via-dark-bg/95 dark:to-transparent" />
        </>
      )}
      
      {/* Background Pattern - Only when no image */}
      {!image && (
        <>
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_theme(colors.primary.DEFAULT)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_theme(colors.purple.500)_0%,_transparent_50%)]" />
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 dark:bg-primary-light/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-3xl" />
        </>
      )}
      
      <Container>
        <div className="relative z-[6]">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-9 dark:text-neutral-1 bg-gradient-to-r from-neutral-9 to-neutral-8 dark:from-neutral-1 dark:to-neutral-2 bg-clip-text text-transparent animate-fadeUp"
          >
            {title}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed font-normal mt-6 max-w-3xl text-neutral-7 dark:text-neutral-3 animate-fadeUp animation-delay-200"
          >
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
}
