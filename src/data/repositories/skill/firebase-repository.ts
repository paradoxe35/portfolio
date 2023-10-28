import { Skill, SkillRepository } from "@/features/skill";

export class SkillFirebaseRepository implements SkillRepository {
  getSkills(): Promise<Skill[]> {
    // throw new Error("Method not implemented.");

    return Promise.resolve([]);
  }
}
