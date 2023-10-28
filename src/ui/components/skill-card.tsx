import { Card, Grid } from "./layouts/layouts";
import style from "@/ui/styles/modules/home.module.scss";
import { StorageImg } from "./storage-img";
import styleLayout from "@/ui/styles/layout.module.scss";
import { Skill } from "@/features/skill";

export function SkillCard({ skills }: { skills: Skill[] }) {
  return (
    <Grid col={4}>
      {skills.map((skill, i) => {
        const hidden = !skill.name.length;
        return (
          <Card
            hidden={hidden}
            className={`${hidden && i > 1 ? styleLayout["hidden:992"] : ""} ${
              hidden && i === 1 ? styleLayout["hidden:600"] : ""
            }`}
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 100}
            key={skill.id || i}
          >
            {skill.icons.length === 1 ? (
              <StorageImg
                storageSrc={skill.icons[0].image}
                alt={skill.name}
                className={style.service__logo}
              />
            ) : (
              <div style={{ display: "flex" }} className={skill.className}>
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={img.image}
                      storageSrc={{ id: img.image }}
                      alt={skill.name}
                      className={style.service__logo}
                    />
                  );
                })}
              </div>
            )}
            <h3>{skill.name}</h3>
          </Card>
        );
      })}
    </Grid>
  );
}
