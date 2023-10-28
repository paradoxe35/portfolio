import { Skill } from "./entity";

export interface SkillRepository {
  getSkills(): Promise<Skill[]>;
}
