export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly active: string,
    public readonly description: string,
    public readonly imageId: string,
    public readonly technology: string,
    public readonly link?: string
  ) {}
}
