import React from "react";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function StorageImg(props: Props) {
  return <img {...props} alt={props.alt} />;
}
