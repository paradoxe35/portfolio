export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icons: { image: string }[],
    public readonly className?: string
  ) {}
}
