'use client';
import { useCallback, useEffect, useState } from "react"
import { Canvas, RenderOptions } from "./Canvas";
import { useHotkeys } from "react-hotkeys-hook";

export interface InteractiveProps {
    title?: string;
    startPaused?: boolean;
    allowFullscreen?: boolean;
    allowPausing?: boolean;
    aspectRatio?: number;
    render(options: RenderOptions): void;
}

export function Interactive(props: InteractiveProps) {
    const { title, startPaused, allowFullscreen, allowPausing, aspectRatio, render } = props;
    const [fullscreen, setFullscreen] = useState(false);
    const [paused, setPaused] = useState(startPaused ?? false);

    useHotkeys('esc', e => {
        e.preventDefault();
        setFullscreen(false);
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        if (fullscreen) html.classList.add('lock-scroll');
        else html.classList.remove('lock-scroll');
    }, [fullscreen])


    const wrapRender = useCallback((options: RenderOptions) => {
        if (paused) return;
        render(options);
    }, [render, paused]);

    return (
        <Canvas render={wrapRender} fullscreen={fullscreen} aspectRatio={aspectRatio}>
            <Toolbar title={title}
                paused={paused}
                allowFullscreen={allowFullscreen ?? true}
                allowPausing={allowPausing ?? true}
                toggleFullscreen={() => setFullscreen(!fullscreen)}
                togglePause={() => setPaused(!paused)} />
        </Canvas>
    )
}

interface ToolbarProps {
    title?: string;
    paused?: boolean;
    allowFullscreen?: boolean;
    allowPausing?: boolean;
    toggleFullscreen(): void;
    togglePause(): void;
}

function Toolbar(props: ToolbarProps) {
    const { title, paused, allowFullscreen, allowPausing, toggleFullscreen, togglePause } = props;

    return (
        <div className="px-4 py-2 flex items-center gap-x-1 bg-neutral-200">
            <div className="text-lg grow">{title || 'Untitled demo'}</div>

            <button className="w-8 block text-lg font-bold enabled:hover:bg-black/10 aspect-square rounded-full"
                disabled={!allowPausing}
                onClick={() => togglePause()}>
                {paused ? '▶️' : '⏸️'}
            </button>

            <button className="w-8 block text-lg font-bold enabled:hover:bg-black/10 aspect-square rounded-full"
                disabled={!allowFullscreen}
                onClick={() => toggleFullscreen()}>
                &#x26F6;
            </button>
        </div>
    )
}
