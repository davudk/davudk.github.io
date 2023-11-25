'use client';
import { useCallback } from "react";
import { Canvas, RenderOptions, createDefaultCanvas } from "../interactive/Canvas";
import { Toolbar } from "../interactive/Toolbar";
import { Interactive, InteractiveContextOptions } from "../interactive/Interactive";

export function Demo2(props: { id: string }) {
    const { id } = props;

    const TotalSteps = 10;

    const render = useCallback((options: RenderOptions, interactiveContext: InteractiveContextOptions) => {
        const step = interactiveContext.currentStep;
        const { ctx, width, height } = options;
        ctx.clearRect(0, 0, width, height);

        const a = 2 * Math.PI / TotalSteps * (step + 0.5);
        const r = 100;
        const cx = width / 2 + Math.cos(a) * r;
        const cy = height / 2 + Math.sin(a) * r;
        const s = 50;
        ctx.fillStyle = 'red';
        ctx.fillRect(cx - s / 2, cy - s / 2, s, s);

        ctx.fillStyle = 'black';
        ctx.font = 'normal 20px Arial';
        ctx.textBaseline = 'top'
        ctx.fillText(`Step: ${step}/10`, 10, 10);
    }, []);

    const toolbar = (
        <Toolbar>
            <Toolbar.Title>Demo 2 - Steps</Toolbar.Title>
            <Toolbar.StepSlider steps={TotalSteps} />
            <Toolbar.FullscreenButton />
        </Toolbar>
    )

    return (
        <Interactive id={id} toolbar={toolbar}>
            {createDefaultCanvas(render)}
        </Interactive>
    )
}