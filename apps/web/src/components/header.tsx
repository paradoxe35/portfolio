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
      className="pt-[150px] pb-[120px] relative"
      style={{
        background:
          image === undefined
            ? undefined
            : `url(${image || "/bg-elements.png"}) ${
                image ? "50% / cover fixed" : "0 fixed no-repeat"
              }`,
      }}
    >
      {image && (
        <>
          {/* Overlay gradient */}
          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-neutral-1 via-neutral-1/90 to-neutral-1/85" />
          {/* Left blur */}
          <div className="absolute top-0 left-0 bottom-0 w-1/2 z-[4] opacity-90 bg-gradient-to-r from-neutral-1 via-neutral-1/90 to-transparent" />
        </>
      )}
      <Container>
        <div className="relative z-[6]">
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className={`text-[40px] font-bold ${image ? 'text-neutral-8' : 'text-neutral-7'}`}
          >
            {title}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className={`text-xl leading-[30px] font-normal mt-8 ${image ? 'text-neutral-8' : 'text-neutral-7'}`}
          >
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
}