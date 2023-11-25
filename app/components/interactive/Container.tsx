'use client';
import { useWindowSize } from "@uidotdev/usehooks";
import { ReactNode, useEffect, useRef } from "react"
import { useForceRender } from "../../hooks/use-force-render";

export const DefaultAspectRatio = 16 / 9;

export interface ContainerChildrenProps {
    width: number;
    height: number;
}

export interface ContainerProps {
    fullscreen?: boolean;
    aspectRatio?: number; // default is 16/9
    toolbar: ReactNode;

    children(props: ContainerChildrenProps): ReactNode;
}

export function Container(props: ContainerProps) {
    const { fullscreen, aspectRatio: providedAspectRatio, toolbar, children } = props;
    const preferredAspectRatio = providedAspectRatio || DefaultAspectRatio;

    useWindowSize();
    // useWindowScroll();
    const forceRender = useForceRender();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);

    const placeholderSizeRef = useRef({ width: 0, height: 0 });

    let width = 0,
        height = 0;
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

    const placeholder = (
        <div className="flex items-center justify-center bg-zinc-300"
            style={{
                width: `${placeholderSizeRef.current.width}px`,
                height: `${placeholderSizeRef.current.height}px`
            }}>
            PLACEHOLDER
        </div>
    );

    return (
        <div className="mt-4 mb-6">
            {fullscreen && placeholder}
            <div ref={rootRef}
                className={'flex flex-col items-stretch bg-zinc-300 outline-dashed outline-slate-300 ' +
                    (fullscreen ? 'fixed inset-0 z-30' : '')}>

                <div className="bg-white">
                    {toolbar}
                </div>

                <div className="flex grow items-center justify-center" ref={parentRef}>
                    {children({ width, height })}
                </div>
            </div>
        </div>
    )
}
