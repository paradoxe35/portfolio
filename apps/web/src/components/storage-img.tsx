import Image from "next/image";
import React from "react";

type Props = React.ComponentProps<typeof Image>;

export function StorageImg(props: Props) {
  return <Image {...props} alt={props.alt} />;
}
