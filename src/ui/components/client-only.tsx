import React, { PropsWithChildren, useEffect, useState } from "react";

const ClientOnly = function ({
  children,
  ...delegated
}: PropsWithChildren<{}>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
