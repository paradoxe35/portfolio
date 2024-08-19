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
      name: "Frontend VueJS, React, Svelte",
      icons: ["/vue.svg", "/react.svg", "/svelte.svg"],
    },
    {
      name: "NodeJs, Python",
      icons: ["/node.svg", "/python.svg"],
      className: "skills-icons-left",
    },
    {
      name: "Flutter Mobile development",
      icons: ["/flutter.svg"],
    },
  ].map((skill, i) => {
    return new Skill(String(i), skill.name, skill.icons);
  });
}
