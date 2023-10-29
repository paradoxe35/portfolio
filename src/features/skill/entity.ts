export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icons: string[],
    public readonly className?: string
  ) {}
}
