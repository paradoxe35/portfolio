import { Skill } from "types";

export const default_skills: Skill<string>[] = [
  {
    name: "Backend Laravel",
    icons: ["/laravel.svg"],
  },
  {
    name: "Frontend VueJS, React, Angular",
    icons: ["/vue.svg", "/react.svg", "/angular.svg"],
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
