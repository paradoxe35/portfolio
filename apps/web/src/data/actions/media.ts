import { MediaFirebaseRepository } from "../repositories/media-repository";

export function getMedias() {
  const repo = new MediaFirebaseRepository();

  return repo.getMedia();
}
