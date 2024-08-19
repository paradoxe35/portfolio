import { MediaFirebaseRepository } from "../repositories/media-repository";

export class Media {
  constructor(
    public readonly id: string,
    public readonly file: string,
  ) {}
}

export function getMediasUsecase() {
  const repo = new MediaFirebaseRepository();

  return repo.getMedia();
}
