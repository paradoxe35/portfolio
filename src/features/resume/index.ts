export class Resume {
  constructor(public readonly fileLink: string) {}
}

export interface ResumeRepository {
  getResume(): Promise<Resume>;
}

export function getResume(repo: ResumeRepository) {
  return repo.getResume();
}
