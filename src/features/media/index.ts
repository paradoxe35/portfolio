export class Media {
  constructor(public readonly id: string, public readonly file: string) {}
}

export interface MediaRepository {
  getMedia(): Promise<Media[]>;
}

export function getMedia(repo: MediaRepository) {
  return repo.getMedia();
}
