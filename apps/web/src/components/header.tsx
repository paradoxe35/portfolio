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
      className="pt-[150px] pb-[120px] relative bg-gradient-to-br from-neutral-1 to-neutral-2 dark:from-dark-bg dark:to-dark-bg-secondary"
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
      <Container>
        <div className="relative z-[6]">
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
              image 
                ? "text-neutral-9 dark:text-neutral-1" 
                : "text-neutral-9 dark:text-neutral-1"
            }`}
          >
            {title}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className={`text-lg md:text-xl leading-relaxed font-normal mt-6 max-w-3xl ${
              image 
                ? "text-neutral-8 dark:text-neutral-2" 
                : "text-neutral-7 dark:text-neutral-3"
            }`}
          >
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
}
