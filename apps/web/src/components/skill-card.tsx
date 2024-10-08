import { Card, Grid } from "./layouts/layouts";
import style from "@/styles/modules/home.module.scss";
import { StorageImg } from "./storage-img";
import styleLayout from "@/styles/layout.module.scss";
import { Skill } from "@repo/contracts";

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
                src={skill.icons[0]}
                alt={skill.name}
                className={style.service__logo}
              />
            ) : (
              <div style={{ display: "flex", gap: 4 }}>
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={img}
                      src={img}
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
