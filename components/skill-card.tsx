import { Card, Grid } from "./layouts/layouts";
import style from "styles/modules/home.module.scss";
import { Skill } from "types";
import { StorageImg } from "./storage-img";

export function SkillCard({
  skills,
}: {
  skills: Skill<string | { id?: string }>[];
}) {
  return (
    <Grid col={4}>
      {skills.map((skill, i) => {
        return (
          <Card
            data-aos="fade-right"
            data-aos-duration={500 + i * 100}
            key={skill.id || i}
          >
            {skill.icons.length === 1 ? (
              <StorageImg
                storageSrc={skill.icons[0]}
                alt={skill.name}
                className={style.service__logo}
              />
            ) : (
              <div style={{ display: "flex" }}>
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={typeof img === "string" ? img : img.id}
                      storageSrc={img}
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
