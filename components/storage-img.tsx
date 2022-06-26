import React, { useEffect, useState } from "react";
import { flamelinkApp } from "utils/db";

export function StorageImg(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { storageSrc: string | { id?: string } }
) {
  const { storageSrc, ...nprops } = props;
  const [image, setImage] = useState(
    typeof storageSrc === "string" ? storageSrc : undefined
  );

  useEffect(() => {
    if (typeof storageSrc === "object" && storageSrc.id) {
      flamelinkApp.storage
        .getURL({ fileId: storageSrc.id })
        .then((src: string) => setImage(src));
    }
  }, [storageSrc]);

  return <img {...nprops} src={image} />;
}
