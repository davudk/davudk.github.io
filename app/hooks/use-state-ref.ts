import { useCallback, useRef, useState } from "react";

export function useStateRef<S>(initialState?: S | (() => S)) {
    const [value, setValue] = useState(initialState);
    const valueRef = useRef(value);

    const getState = useCallback(() => valueRef.current!, [valueRef]);
    const setState = useCallback((value: S) => {
        setValue(value);
        valueRef.current = value;
    }, [setValue, valueRef]);

    return [getState, setState, value!] as const;
}
