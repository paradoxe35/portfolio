import { Resume, ResumeRepository } from "@/features/resume";

export class ResumeFirebaseRepository implements ResumeRepository {
  getResume(): Promise<Resume> {
    throw new Error("Method not implemented.");
  }
}
