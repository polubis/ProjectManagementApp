import React, { ReactNode } from "react"

import csx from "./Layout.scss"

namespace Layout {
    export interface Props {
        className?: string;
        children: ReactNode;
        scroll?: boolean;
    }
}

const Layout = ({ className, children, scroll = false }: Layout.Props) => {
    return (
        <div className={`${csx.layout} ${className}`}
            style={{ height: scroll ? "110%" : "100%" }}>
            {children}
        </div>
    )
}

export default Layout;