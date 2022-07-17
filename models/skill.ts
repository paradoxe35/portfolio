import { Skill, SerializedSkill } from "types";

export default class SkillModel implements SerializedSkill {
  public name: string;
  public icons: { id: string }[];
  public id?: string;
  public className?: string;

  constructor(skill: Skill) {
    this.name = skill.name;
    this.icons = skill.icons.map((d) => ({ id: d.id! }));
    this.id = skill.id;
    this.className = skill.className;
  }

  public toJson() {
    return {
      id: this.id,
      name: this.name,
      className: this.className,
      icons: this.icons,
    } as SerializedSkill;
  }
}

export async function getSerializedSkills(skills: Promise<Skill[]>) {
  return skills.then(async (skills) =>
    skills.map((p) => new SkillModel(p).toJson())
  );
}
