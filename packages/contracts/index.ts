export class Resume {
  constructor(public readonly file: string) {}
}

export class Skill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icons: string[],
    public readonly status?: "published" | "draft" | "archived",
    public readonly className?: string
  ) {}
}

export class Media {
  constructor(
    public readonly id: string,
    public readonly file: string
  ) {}
}

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
