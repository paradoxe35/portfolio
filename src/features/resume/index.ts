export class Resume {
  constructor(public readonly file: string) {}
}

export interface ResumeRepository {
  getResume(): Promise<Resume | null>;
}

export function getResume(repo: ResumeRepository) {
  return repo.getResume();
}
