import { Skill } from "@repo/contracts";
import { SkillFirebaseRepository } from "../repositories/skill-repository";

export async function getSkills() {
  const repo = new SkillFirebaseRepository();

  return (await repo.getSkills()).filter(
    (skill) => skill.status === "published"
  );
}

export function getDefaultSkills(): Skill[] {
  return [
    {
      name: "Backend Symfony, Laravel",
      icons: ["/laravel-symfony.svg"],
    },
    {
      name: "Frontend React, VueJS",
      icons: ["/react.svg", "/vue.svg"],
    },
    {
      name: "NodeJs, Golang",
      icons: ["/node.svg", "/golang.svg"],
      className: "skills-icons-left",
    },
  ].map((skill, i) => {
    return new Skill(String(i), skill.name, skill.icons);
  });
}
