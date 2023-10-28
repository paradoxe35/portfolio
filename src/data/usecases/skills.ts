import { getSkills } from "@/features/skill";
import { SkillFirebaseRepository } from "../repositories/skill";

export function getSkillsUsecase() {
  return getSkills(new SkillFirebaseRepository());
}
