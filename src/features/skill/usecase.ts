import { SkillRepository } from "./repository";

export async function getSkills(repo: SkillRepository) {
  const skills = await repo.getSkills();

  return skills.filter((skill) => skill.status === "published");
}
