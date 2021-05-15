import React, { useEffect, useState } from "react";

const ClientOnly: React.FC = function ({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <div {...delegated}>{children}</div>;
}

export default ClientOnly