import {BaseFallbackComponent} from "./fallback/base";

import emptySrc from "../../../../assets/icons/empty.png"

export default function EmptyContentBoundary({isEmpty, children}) {
    if (isEmpty()) {
        return <BaseFallbackComponent iconSrc={emptySrc} text="Empty content" includeBaseActions={false}/>
    }
    return (
        <>
            {children}
        </>
    )
}