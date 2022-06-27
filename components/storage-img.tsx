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
    typeof storageSrc === "string"
      ? storageSrc
      : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAwIiBoZWlnaHQ9IjEwMDAiPjwvc3ZnPg=="
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
