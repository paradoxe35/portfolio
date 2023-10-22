import { Skill } from "types";

export const default_skills: Skill<string>[] = [
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
];
