import { ResumeFirebaseRepository } from "../repositories/resume-repository";

export class Resume {
  constructor(public readonly file: string) {}
}

export function getResume() {
  const repo = new ResumeFirebaseRepository();

  return repo.getResume();
}
