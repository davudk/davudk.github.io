'use client';
import { useRef } from "react"
import { useAnimationFrame } from "../../hooks/use-animation-frame";

export interface RenderOptions {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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

    useAnimationFrame(({ elapsedTime }) => {
        const { current: canvas } = canvasRef;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const { width, height } = canvas;
        render({ canvas, ctx, elapsedTime, width, height });
    }, [render]);

    return (
        <canvas ref={canvasRef}
            tabIndex={0}
            width={width} height={height}
            style={{ width: `${width}px`, height: `${height}px` }}
            className="outline-none bg-white" />
    )
}
