import { useCallback, useState } from "react";

export function useForceRender() {
    const [_, setState] = useState<any>();
    const forceRender = useCallback(() => setState(Math.random()), []);
    return forceRender;
}