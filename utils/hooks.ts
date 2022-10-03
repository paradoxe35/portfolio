import { useState, useEffect, useCallback } from "react";
import { flamelinkApp } from "./db";

export const useFlamelinkStorage = (
  imageId: string,
  defaultValue: string | undefined = undefined
) => {
  const { image, cacheImage } = useImageCacheLocalStorage(
    imageId,
    defaultValue
  );

  useEffect(() => {
    flamelinkApp.storage
      .getURL({ fileId: imageId })
      .then((src: string) => cacheImage(src));
  }, [imageId]);

  return image;
};

export const useImageCacheLocalStorage = (
  id: string | undefined,
  defaultValue: string | undefined = undefined
) => {
  const [image, setImage] = useState<string | undefined>(defaultValue);

  const cacheImage = useCallback(
    (link: string) => {
      if (!id) return;
      localStorage.setItem(id, link);
      setImage(link);
    },
    [id]
  );

  useEffect(() => {
    if (!id) return;
    localStorage.getItem(id);
  }, [id]);

  return {
    cacheImage,
    image,
  };
};
