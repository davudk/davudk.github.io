'use client';

import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { InteractiveContext } from "./Interactive";

export interface ToolbarProps {
    children?: ReactNode;
}

export function Toolbar(props: ToolbarProps) {
    const { children } = props;
    return (
        <div className="px-4 py-2 flex items-center gap-x-1 bg-neutral-200">
            {children}
        </div>
    )
}

export interface ToolbarTitleProps {
    children: ReactNode;
}

Toolbar.Title = function ToolbarTitle(props: ToolbarTitleProps) {
    const { children } = props;
    return (<div className="text-lg">{children}</div>)
}

Toolbar.Gap = function ToolbarGap() {
    return (<div className="grow" />)
}

export interface ToolbarButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick(): void;
}

Toolbar.Button = function ToolbarButton(props: ToolbarButtonProps) {
    const { children, disabled, onClick } = props;

    return (
        <button className="w-8 block text-lg font-bold enabled:hover:bg-black/10 aspect-square rounded-full"
            disabled={disabled}
            onClick={() => onClick()}>
            {children}
        </button>
    )
}

export interface ToolbarFullscreenButtonProps {
    disabled?: boolean;
}

Toolbar.FullscreenButton = function ToolbarFullscreenButton(props: ToolbarFullscreenButtonProps) {
    const { disabled } = props;
    const ctx = useContext(InteractiveContext);

    return (
        <Toolbar.Button disabled={disabled}
            onClick={() => ctx.toggleFullscreen()}>&#x26F6;</Toolbar.Button>
    )
}

export interface ToolbarPlayPauseButtonProps {
    disabled?: boolean;
}

Toolbar.PlayPauseButton = function ToolbarPlayPauseButton(props: ToolbarPlayPauseButtonProps) {
    const { disabled } = props;
    const ctx = useContext(InteractiveContext);

    return (
        <Toolbar.Button disabled={disabled}
            onClick={() => ctx.togglePause()}>
            {ctx.paused ? '▶️' : '⏸️'}
        </Toolbar.Button>
    )
}

export interface ToolbarSliderProps {
    min?: number;
    max: number;
    value?: number;
    onChange(value: number): void;
}

Toolbar.Slider = function ToolbarSlider(props: ToolbarSliderProps) {
    const { max, onChange } = props;

    const min = props.min ?? 0;
    if (max < min) return (
        <div>Invalid options for slider.</div>
    );

    const [value, setValue] = useState(props.value ?? min);

    useEffect(() => {
        if (typeof props.value !== 'undefined') {
            setValue(Math.max(min, props.value));
        }
    }, [props.value, min, max]);

    const assignValue = useCallback((newValue: number) => {
        const v = Math.min(Math.max(newValue, min), max);
        if (v !== value) {
            setValue(v);
            onChange(v);
        }
    }, [value, min, max]);

    const charLength = Math.max(min.toString().length, max.toString().length);
    const valueStr = value.toString().padStart(charLength, ' ');
    const minStr = min.toString().padStart(charLength, ' ');
    const maxStr = max.toString().padStart(charLength, ' ');
    const text = min === 0
        ? `${valueStr}/${maxStr}`
        : `${valueStr} [${minStr}, ${maxStr}]`

    return (
        <>
            <input type="range"
                className="ml-2 grow"
                min={min} max={max} value={value}
                onChange={e => assignValue(e.target.valueAsNumber)} />
            <span className="mr-2 font-mono">{text}</span>
        </>
    )
}

export interface ToolbarStepSliderProps {
    steps: number;
}

Toolbar.StepSlider = function ToolbarStepSlider(props: ToolbarStepSliderProps) {
    const { steps } = props;
    const ctx = useContext(InteractiveContext);

    return (
        <Toolbar.Slider min={0} max={steps} value={ctx.currentStep}
            onChange={v => ctx.step(v)} />
    )
}