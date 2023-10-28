import { Skill, getSkills } from "@/features/skill";
import { SkillFirebaseRepository } from "../repositories/skill";

export function getSkillsUsecase() {
  return getSkills(new SkillFirebaseRepository());
}

export function getDefaultSkillsUsecase(): Skill[] {
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
  ].map((skill) => {
    const icons = skill.icons.map((icon) => ({ id: icon }));
    return new Skill(skill.name, icons);
  });
}
