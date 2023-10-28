import { Entity } from "@/core/entity";

export class Project extends Entity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly active: string,
    public readonly description: string,
    public readonly imageLink: string,
    public readonly technology: string,
    public readonly link?: string
  ) {
    super();
  }
}
