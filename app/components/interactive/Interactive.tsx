'use client';
import { ReactNode, createContext, useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook";
import { Container, ContainerChildrenProps } from "./Container";

export const InteractiveContext = createContext<Readonly<InteractiveContextOptions>>(null as any);

export interface InteractiveContextOptions {
    currentStep: number;
    paused: boolean;
    fullscreen: boolean;

    step(newValue?: number): void;
    reset(): void;
    togglePause(newValue?: boolean): void;
    toggleFullscreen(newValue?: boolean): void;
}

export interface InteractiveChildrenProps {
    containerProps: ContainerChildrenProps;
    context: InteractiveContextOptions;
}

export interface InteractiveProps {
    startPaused?: boolean;
    aspectRatio?: number;
    toolbar: ReactNode;
    children(props: InteractiveChildrenProps): ReactNode;
    onReset?(): void;
}

export function Interactive(props: InteractiveProps) {
    const { startPaused, aspectRatio, toolbar, children, onReset } = props;

    const [currentStep, setCurrentStep] = useState(0);
    const [paused, setPaused] = useState(startPaused ?? false);
    const [fullscreen, setFullscreen] = useState(false);

    const step = useCallback((newValue?: number) => setCurrentStep(newValue ?? (currentStep + 1)), [currentStep]);
    const reset = useCallback(() => onReset?.(), [onReset])
    const togglePause = useCallback((newValue?: boolean) => setPaused(newValue ?? !paused), [paused]);
    const toggleFullscreen = useCallback((newValue?: boolean) => setFullscreen(newValue ?? !fullscreen), [fullscreen]);

    const context: InteractiveContextOptions = {
        currentStep,
        paused,
        fullscreen,
        step,
        reset,
        togglePause,
        toggleFullscreen
    };

    useEffect(() => {
        const html = document.documentElement;
        if (fullscreen) html.classList.add('lock-scroll');
        else html.classList.remove('lock-scroll');
    }, [fullscreen]);

    return (
        <InteractiveContext.Provider value={context}>
            <Container fullscreen={fullscreen} aspectRatio={aspectRatio} toolbar={toolbar}>
                {containerProps => (
                    <div style={containerProps}>
                        {children({ containerProps, context })}
                    </div>
                )}
            </Container>
        </InteractiveContext.Provider>
    )
}
