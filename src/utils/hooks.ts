import { useState, useEffect, useCallback } from "react";

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
    const simage = localStorage.getItem(id);
    if (simage) setImage(simage);
  }, [id]);

  return {
    cacheImage,
    image,
  };
};
