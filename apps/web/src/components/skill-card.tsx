import { Card, Grid } from "./layouts/layouts";
import { StorageImg } from "./storage-img";
import { Skill } from "@repo/contracts";

export function SkillCard({ skills }: { skills: Skill[] }) {
  return (
    <Grid col={4}>
      {skills.map((skill, i) => {
        const hidden = !skill.name.length;
        return (
          <Card
            hidden={hidden}
            className={`${hidden && i > 1 ? "hidden lg:block" : ""} ${
              hidden && i === 1 ? "hidden md:block" : ""
            }`}
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 100}
            key={skill.id || i}
          >
            {skill.icons.length === 1 ? (
              <StorageImg
                src={skill.icons[0]}
                alt={skill.name}
                className="block mb-8 w-auto h-[42px] max-w-full"
              />
            ) : (
              <div className="flex gap-1 mb-8">
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={img}
                      src={img}
                      alt={skill.name}
                      className="block w-auto h-[42px] max-w-full"
                    />
                  );
                })}
              </div>
            )}
            <h3 className="text-base text-neutral-7 dark:text-neutral-3 mb-0 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{skill.name}</h3>
          </Card>
        );
      })}
    </Grid>
  );
}