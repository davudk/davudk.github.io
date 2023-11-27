'use client';
import { ReactNode, useRef } from "react"
import { useAnimationFrame } from "../../hooks/use-animation-frame";
import { InteractiveChildrenProps, InteractiveContextOptions } from "./Interactive";

export type DefaultCanvasRenderer =
    (options: RenderOptions, interactiveContext: InteractiveContextOptions) => void;

export function createDefaultCanvas(render: DefaultCanvasRenderer): (props: InteractiveChildrenProps) => ReactNode {
    return function DefaultCanvas({ containerProps: { width, height }, context }) {
        const { hasUserAttention, paused } = context;
        return (
            <Canvas width={width} height={height} render={p => hasUserAttention && !paused && render(p, context)} />
        )
    };
}

export interface RenderOptions {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    currentTime: number;
    elapsedTime: number;
    width: number;
    height: number;
}

export interface CanvasProps {
    width: number;
    height: number;
    render(options: RenderOptions): void;
}

export function Canvas(props: CanvasProps) {
    const { width, height, render } = props;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useAnimationFrame(({ timestamp: currentTime, elapsedTime }) => {
        const { current: canvas } = canvasRef;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const { width, height } = canvas;
        render({ canvas, ctx, currentTime, elapsedTime, width, height });
    }, [render]);

    const deviceScale = window.devicePixelRatio ?? 1;

    return (
        <canvas ref={canvasRef}
            tabIndex={0}
            width={width * deviceScale} height={height * deviceScale}
            style={{ width: `${width}px`, height: `${height}px` }}
            className="outline-none bg-white dark:bg-neutral-800" />
    )
}
