export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icons: string[],
    public readonly status?: "published" | "draft" | "archived",
    public readonly className?: string
  ) {}
}
