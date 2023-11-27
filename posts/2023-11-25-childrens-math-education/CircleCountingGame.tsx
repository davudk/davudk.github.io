'use client';
import { RenderOptions, createDefaultCanvas } from "@/app/components/interactive/Canvas";
import { Interactive, InteractiveContextOptions } from "@/app/components/interactive/Interactive";
import { Toolbar, ToolbarSelectOption } from "@/app/components/interactive/Toolbar";
import { useCallback, useEffect } from "react";
import random from 'random';
import { useStateRef } from "@/app/hooks/use-state-ref";
import { useStopwatch } from "@/app/hooks/use-stopwatch";
import { isDarkMode } from "@/app/hooks/use-theme";

interface BunchSize extends ToolbarSelectOption {
    min: number;
    max: number;
}

interface Circle {
    x: number; // x location on canvas [0-1]
    y: number; // y location on canvas [0-1]
    r: number; // radius in pixels
}

function generateCircle(): Circle {
    const x = random.float(0.1, 0.9);
    const y = random.float(0.15, 0.85);
    const r = random.int(20, 35);
    return { x, y, r };
}

function generateBunch(size: BunchSize): Circle[] {
    return Array.from({ length: random.int(size.min, size.max) })
        .map(() => generateCircle());
}

export function CircleCountingGame(props: { id: string }) {
    const { id } = props;

    const bunchSizes: BunchSize[] = [[3, 5], [4, 6], [5, 8], [6, 10]]
        .map(([min, max]) => ({
            min, max,
            value: `${min}-${max}`,
            text: `${min} to ${max}`
        }));

    const [getBunchSize, setBunchSize, bunchSize] = useStateRef(bunchSizes[0]);
    const [getBunch, setBunch] = useStateRef(() => generateBunch(bunchSize));

    const { restart: restartStopwatch, getElapsedTime } = useStopwatch();

    const resetBunch = useCallback(() => {
        restartStopwatch();
        setBunch(generateBunch(getBunchSize()));
    }, []);

    useEffect(() => {
        resetBunch();
    }, [bunchSize]);

    const render = useCallback((options: RenderOptions, interactiveContext: InteractiveContextOptions) => {
        const { ctx, width, height } = options;
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = isDarkMode() ? 'darkblue' : 'red';
        ctx.strokeStyle = isDarkMode() ? 'white' : 'black';
        ctx.lineWidth = 4;
        for (let c of getBunch()) {
            const x = c.x * width;
            const y = c.y * height;
            ctx.beginPath();
            ctx.arc(x, y, c.r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

        const elapsedTime = Math.round(getElapsedTime());
        const elapsedTimeStr = elapsedTime > 60 ? '>60' : elapsedTime;

        ctx.font = '20px normal monospaced';
        ctx.fillStyle = isDarkMode() ? 'white' : 'black';
        ctx.fillText(`Elapsed time: ${elapsedTimeStr}s`, 8, height - 12);
    }, []);


    const toolbar = (
        <Toolbar>
            <Toolbar.Title>Circles demo</Toolbar.Title>
            <Toolbar.Gap grow />
            <Toolbar.Text>Circles:</Toolbar.Text>
            <Toolbar.Select value={bunchSize.value}
                options={bunchSizes}
                onChange={v => setBunchSize(bunchSizes.find(x => x.value === v) ?? bunchSizes[0])} />
            <Toolbar.Gap />
            {/* <Toolbar.Text>Maximum:</Toolbar.Text>
            <Toolbar.Slider min={3} value={getBunchSize()} max={10} onChange={setBunchSize} /> */}
            <Toolbar.ResetButton keyboardShortcut />
            <Toolbar.FullscreenButton keyboardShortcut />
        </Toolbar>
    )

    return (
        <Interactive id={id} toolbar={toolbar} onReset={resetBunch}>
            {createDefaultCanvas(render)}
        </Interactive>
    )
}