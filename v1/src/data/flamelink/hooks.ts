import { useImageCacheLocalStorage } from "@/utils/hooks";
import { useEffect } from "react";
import { flamelinkApp } from ".";

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
  }, [imageId, cacheImage]);

  return image;
};
