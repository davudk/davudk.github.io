'use client';
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import { ReactNode, useEffect, useRef } from "react"
import { useAnimationFrame } from "../hooks/use-animation-frame";
import { useForceRender } from "../hooks/use-force-render";

export const DefaultAspectRatio = 16 / 9;

export interface RenderOptions {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    elapsedTime: number;
    width: number;
    height: number;
}

export interface CanvasProps {
    children?: ReactNode;
    fullscreen?: boolean;
    aspectRatio?: number; // default is 16/9
    render(options: RenderOptions): void;
}

export function Canvas(props: CanvasProps) {
    const { children, fullscreen, aspectRatio: providedAspectRatio, render } = props;
    const preferredAspectRatio = providedAspectRatio || DefaultAspectRatio;

    useWindowSize();
    useWindowScroll();
    const forceRender = useForceRender();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const placeholderSizeRef = useRef({ width: 0, height: 0 });

    let width = canvasRef.current?.clientWidth ?? 0,
        height = canvasRef.current?.clientHeight ?? 0;
    const { current: parent } = parentRef;
    if (parent) {
        const containerAspectRatio = (parent.clientWidth / parent.clientHeight) || 0;
        if (fullscreen && preferredAspectRatio < containerAspectRatio) {
            // fill vertically, adjust horizontally
            height = parent.clientHeight;
            width = height * preferredAspectRatio;
        } else {
            // fill horizontally, adjust vertically
            width = parent.clientWidth;
            height = width / preferredAspectRatio;
        }
    }

    if (!fullscreen && rootRef.current) {
        placeholderSizeRef.current.width = rootRef.current.clientWidth;
        placeholderSizeRef.current.height = rootRef.current.clientHeight;
    }

    useEffect(() => {
        setTimeout(() => forceRender(), 10);
        setTimeout(() => forceRender(), 100);
    }, [fullscreen]);

    useAnimationFrame(({ elapsedTime }) => {
        const { current: canvas } = canvasRef;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const { width, height } = canvas;
        render({ canvas, ctx, elapsedTime, width, height });
    }, [render])

    return (
        <>
            {fullscreen && (
                <div className="flex items-center justify-center bg-zinc-300"
                    style={{
                        width: `${placeholderSizeRef.current.width}px`,
                        height: `${placeholderSizeRef.current.height}px`
                    }}>
                    PLACEHOLDER
                </div>
            )}
            <div ref={rootRef}
                className={'flex flex-col items-stretch bg-zinc-300 outline-dashed outline-slate-300 ' +
                    (fullscreen ? 'fixed inset-0 z-30' : '')}>

                <div className="bg-white">
                    {children}
                </div>

                <div className="flex grow items-center justify-center" ref={parentRef}>
                    <canvas ref={canvasRef}
                        tabIndex={0}
                        width={width} height={height}
                        style={{ width: `${width}px`, height: `${height}px` }}
                        className="outline-none bg-white" />
                </div>
            </div>
        </>
    )
}
