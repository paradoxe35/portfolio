import { ResumeFirebaseRepository } from "../repositories/resume-repository";

export function getResume() {
  const repo = new ResumeFirebaseRepository();

  return repo.getResume();
}
