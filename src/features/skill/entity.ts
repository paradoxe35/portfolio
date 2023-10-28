export class Skill {
  constructor(
    public readonly name: string,
    public readonly icons: { id: string }[],
    public readonly id?: string,
    public readonly className?: string
  ) {}
}
