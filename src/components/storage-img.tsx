import React, { useEffect, useState } from "react";
import { flamelinkApp } from "@/utils/db";
import { useImageCacheLocalStorage } from "@/utils/hooks";

export function StorageImg(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { storageSrc: string | { id?: string } }
) {
  const { storageSrc, ...nprops } = props;

  const imageId =
    typeof storageSrc === "object" && storageSrc.id ? storageSrc.id : undefined;

  const { image, cacheImage } = useImageCacheLocalStorage(
    imageId,
    typeof storageSrc === "string"
      ? storageSrc
      : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAwIiBoZWlnaHQ9IjEwMDAiPjwvc3ZnPg=="
  );

  useEffect(() => {
    if (!imageId) return;
    flamelinkApp.storage
      .getURL({ fileId: imageId })
      .then((src: string) => cacheImage(src));
  }, [imageId]);

  return <img {...nprops} src={image} />;
}
