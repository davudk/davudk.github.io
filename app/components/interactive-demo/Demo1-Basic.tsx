'use client';
import { useCallback, useRef } from "react";
import { Canvas, RenderOptions, createDefaultCanvas } from "../interactive/Canvas";
import { Toolbar } from "../interactive/Toolbar";
import { Interactive } from "../interactive/Interactive";

export function Demo1(props: { id: string }) {
    const { id } = props;

    const stateRef = useRef({
        angle: 0
    });

    const render = useCallback((options: RenderOptions) => {
        const { ctx, elapsedTime, width, height } = options;
        ctx.clearRect(0, 0, width, height);

        stateRef.current.angle += elapsedTime;

        ctx.fillStyle = "green";
        ctx.fillRect(20, 10, 150, 100);

        const a = stateRef.current.angle;
        const r = 100;
        const cx = width / 2 + Math.cos(a) * r;
        const cy = height / 2 + Math.sin(a) * r;
        const s = 50;
        ctx.fillStyle = 'red';
        ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
    }, []);

    const toolbar = (
        <Toolbar>
            <Toolbar.Title>Demo 1 - Basic Rendering</Toolbar.Title>
            <Toolbar.Gap grow />
            <Toolbar.PlayPauseButton />
            <Toolbar.FullscreenButton />
        </Toolbar>
    )

    return (
        <Interactive id={id} toolbar={toolbar}>
            {createDefaultCanvas(render)}
        </Interactive>
    )
}