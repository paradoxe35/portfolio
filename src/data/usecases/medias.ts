import { MediaFirebaseRepository } from "../repositories/media";
import { getMedia } from "@/features/media";

export function getMediasUsecase() {
  return getMedia(new MediaFirebaseRepository());
}
