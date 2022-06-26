import { useState, useEffect } from "react";
import { flamelinkApp } from "./db";

export const useFlamelinkStorage = (
  imageId: string,
  defaultValue: string | undefined = undefined
) => {
  const [image, setImage] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    
  }, [imageId]);

  return image;
};
