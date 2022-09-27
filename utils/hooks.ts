import { useState, useEffect } from "react";
import { flamelinkApp } from "./db";

export const useFlamelinkStorage = (
  imageId: string,
  defaultValue: string | undefined = undefined
) => {
  const [image, setImage] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    flamelinkApp.storage
      .getURL({ fileId: imageId })
      .then((src: string) => setImage(src));
  }, [imageId]);

  return image;
};
