import { useEffect, useRef } from "react";

export interface AnimationFrameHookOptions {
    timestamp: DOMHighResTimeStamp;
    elapsedTime: number;
}

export function useAnimationFrame(callback: (options: AnimationFrameHookOptions) => void, dep?: any[]) {
    const requestRef = useRef(0);
    const previousTimeRef = useRef(0);

    const animate = (timestamp: DOMHighResTimeStamp) => {
        if (previousTimeRef.current != undefined) {
            const elapsedTime = (timestamp - previousTimeRef.current) / 1000;
            callback({ timestamp, elapsedTime });
        }
        previousTimeRef.current = timestamp;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, dep);
}