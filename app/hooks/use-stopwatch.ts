import { useCallback } from "react";
import { useStateRef } from "./use-state-ref";

export function useStopwatch() {
    const [getStartTime, setStartTime] = useStateRef(() => getCurrentTime());

    const restart = useCallback(() => {
        setStartTime(getCurrentTime());
    }, []);

    const getElapsedTime = useCallback(() => {
        return getCurrentTime() - getStartTime();
    }, []);

    return { restart, getElapsedTime, getStartTime };

    function getCurrentTime() {
        return new Date().getTime() / 1000;
    }
}
