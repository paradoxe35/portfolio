import { Skill, SkillRepository } from "@/features/skill";

export class SkillFlameLinkRepository implements SkillRepository {
  getSkills(): Promise<Skill[]> {
    throw new Error("Method not implemented.");
  }
}
