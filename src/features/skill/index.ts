export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icons: string[],
    public readonly status?: "published" | "draft" | "archived",
    public readonly className?: string
  ) {}
}

export interface SkillRepository {
  getSkills(): Promise<Skill[]>;
}

export async function getSkills(repo: SkillRepository) {
  const skills = await repo.getSkills();

  return skills.filter((skill) => skill.status === "published");
}
