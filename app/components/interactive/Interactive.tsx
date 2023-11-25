'use client';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react"
import { Container, ContainerChildrenProps } from "./Container";
import { useInteractiveManager } from "./InteractiveManager";

export const InteractiveContext = createContext<Readonly<InteractiveContextOptions>>(null as any);

export interface InteractiveContextOptions {
    hasUserAttention: boolean;
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
    id: string;
    startPaused?: boolean;
    aspectRatio?: number;
    toolbar: ReactNode;
    children(props: InteractiveChildrenProps): ReactNode;
    onReset?(): void;
}

export function Interactive(props: InteractiveProps) {
    const { id, startPaused, aspectRatio, toolbar, children, onReset } = props;

    const { isPrimary } = useInteractiveManager(id);

    const [currentStep, setCurrentStep] = useState(0);
    const [paused, setPaused] = useState(startPaused ?? false);
    const [fullscreen, setFullscreen] = useState(false);

    const step = useCallback((newValue?: number) => setCurrentStep(newValue ?? (currentStep + 1)), [currentStep]);
    const reset = useCallback(() => onReset?.(), [onReset])
    const togglePause = useCallback((newValue?: boolean) => setPaused(newValue ?? !paused), [paused]);
    const toggleFullscreen = useCallback((newValue?: boolean) => setFullscreen(newValue ?? !fullscreen), [fullscreen]);

    const context: InteractiveContextOptions = {
        hasUserAttention: isPrimary(),
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
        <div id={id}>
            <InteractiveContext.Provider value={context}>
                <Container fullscreen={fullscreen} aspectRatio={aspectRatio} toolbar={toolbar}>
                    {containerProps => (
                        <div style={containerProps}>
                            {children({ containerProps, context })}
                        </div>
                    )}
                </Container>
            </InteractiveContext.Provider>
        </div>
    )
}
