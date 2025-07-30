import Header from "@/components/header";
import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import { site_details } from "@/utils/constants";
import { getResume } from "@/data/actions/resume";
import { BackgroundPattern } from "@/components/background-pattern";
import { ContactForm } from "@/components/contact-form";
import { ResumeDownload } from "@/components/resume-download";
import { entityToJSON } from "@/utils/entity-to-json";
import { Resume } from "@repo/contracts";

export const revalidate = 30;

async function About() {
  const resumeData = await getResume();
  const resume = resumeData ? (entityToJSON(resumeData) as Resume) : null;

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-1 to-white dark:from-dark-bg-secondary dark:to-dark-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 dark:bg-primary-light/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-3xl" />

      <Container>
        <div className="relative z-10">
          <Titles
            title="About"
            subtitle="A bit about me"
            className="animate-fadeUp animation-delay-200"
          />

          <div className="prose prose-lg dark:prose-invert max-w-3xl mb-12 animate-fadeUp animation-delay-200">
            <p className="text-neutral-7 dark:text-neutral-3 leading-relaxed">
              {`I'm ${site_details.full_name}, a Software Engineer with 
              ${new Date().getFullYear() - 2017} years of hands-on experience
              building web applications. My journey began in 2017 as a
              self-taught developer, and since then, I've honed my skills across
              the full stack, working with technologies like PHP, Laravel,
              React.js, Next.js, Node.js, and Go.`.replace(/\s+/g, " ")}
            </p>
          </div>

          <ResumeDownload resume={resume} />
        </div>
      </Container>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Application>
      <main>
        <Header
          title="Contact"
          subtitle="Let's discuss your next project or collaboration opportunity"
        />
        <section className="py-24 min-h-[60vh] bg-gradient-to-b from-neutral-1 via-white to-neutral-1 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg relative">
          <BackgroundPattern variant="diagonal" />

          <Container>
            <div className="relative z-10">
              <ContactForm className="animate-fadeUp animation-delay-200" />
            </div>
          </Container>
        </section>

        <About />
      </main>
    </Application>
  );
}
