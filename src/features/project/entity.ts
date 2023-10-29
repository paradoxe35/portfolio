export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly status: "published" | "draft" | "archived",
    public readonly description: string,
    public readonly image: string,
    public readonly technology: string,
    public readonly link?: string
  ) {}
}
