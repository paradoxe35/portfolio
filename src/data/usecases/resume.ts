import { getResume } from "@/features/resume";
import { ResumeFirebaseRepository } from "../repositories/resume";

export function getResumeUsecase() {
  return getResume(new ResumeFirebaseRepository());
}
