'use client';
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Listbox } from '@headlessui/react'
import { InteractiveContext } from "./Interactive";
import classnames from "classnames";
import classNames from "classnames";
import { useHotkeys } from "react-hotkeys-hook";

export interface ToolbarProps {
    children?: ReactNode;
}

export function Toolbar(props: ToolbarProps) {
    const { children } = props;
    return (
        <div className="px-4 py-2 flex items-center gap-x-1 bg-neutral-200 dark:bg-black">
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

export interface ToolbarTextProps {
    children: ReactNode;
}

Toolbar.Text = function ToolbarText(props: ToolbarTextProps) {
    const { children } = props;
    return (<div>{children}</div>)
}

export interface ToolbarGapProps {
    grow?: boolean;
}

Toolbar.Gap = function ToolbarGap(props: ToolbarGapProps) {
    const { grow } = props;
    return (<div className={classnames(grow ? 'grow' : 'w-4')} />)
}

export interface ToolbarSelectOption {
    value: string;
    text?: string;
    disabled?: boolean;
}

export interface ToolbarSelectProps {
    options: ToolbarSelectOption[];
    disabled?: boolean;
    value?: string;
    onChange(value: string): void;
}

Toolbar.Select = function ToolbarSelect(props: ToolbarSelectProps) {
    const { options, disabled, value, onChange } = props;

    const selected = options.find(x => x.value === value);

    return (
        <div className="relative">
            <Listbox
                disabled={disabled} value={value} onChange={onChange}>
                <Listbox.Button className="px-2 shadow-sm outline-none bg-white dark:bg-black">
                    {selected?.text ?? selected?.value ?? 'None selected'}
                </Listbox.Button>
                <Listbox.Options className="absolute top-full left-0 w-32 m-0 p-0 list-none shadow outline-none bg-white dark:bg-black">
                    {options.map((x) => (
                        <Listbox.Option className="m-0 p-0"
                            key={x.value}
                            value={x.value}
                            disabled={x.disabled}
                        >
                            {({ active }) => (
                                <div className={classNames(
                                    'px-2 py-1 cursor-pointer',
                                    active && 'bg-slate-100 dark:bg-white/10 outline-dashed outline-2 outline-slate-600 dark:outline-white/40'
                                )}>
                                    {x.text ?? x.value}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export interface ToolbarButtonProps {
    children: ReactNode;
    disabled?: boolean;
    keyboardShortcut?: string;
    onClick(source: 'click' | 'keyboard-shortcut'): void;
}

Toolbar.Button = function ToolbarButton(props: ToolbarButtonProps) {
    const { children, disabled, keyboardShortcut, onClick } = props;
    const ctx = useContext(InteractiveContext);

    useHotkeys([keyboardShortcut!].filter(Boolean), e => {
        e.preventDefault();
        onClick('keyboard-shortcut');
    }, {
        enabled: ctx.hasUserAttention
    }, [keyboardShortcut, onClick]);

    return (
        <button className="w-8 block text-lg font-bold enabled:hover:bg-black/10 aspect-square rounded-full"
            disabled={disabled}
            onClick={() => onClick('click')}>
            {children}
        </button>
    )
}

export interface ToolbarResetButtonProps {
    disabled?: boolean;
    keyboardShortcut?: true | string;
}

Toolbar.ResetButton = function ToolbarResetButton(props: ToolbarResetButtonProps) {
    const { disabled } = props;
    const ctx = useContext(InteractiveContext);

    const keyboardShortcut = props.keyboardShortcut === true
        ? 'space'
        : props.keyboardShortcut;

    return (
        <Toolbar.Button disabled={disabled}
            keyboardShortcut={keyboardShortcut}
            onClick={() => ctx.reset()}>
            &#8635;
        </Toolbar.Button>
    )
}

export interface ToolbarFullscreenButtonProps {
    disabled?: boolean;
    keyboardShortcut?: true | string;
}

Toolbar.FullscreenButton = function ToolbarFullscreenButton(props: ToolbarFullscreenButtonProps) {
    const { disabled } = props;
    const ctx = useContext(InteractiveContext);

    const keyboardShortcut = props.keyboardShortcut === true
        ? 'esc'
        : props.keyboardShortcut;

    return (
        <Toolbar.Button disabled={disabled}
            keyboardShortcut={keyboardShortcut}
            onClick={type => {
                if (type === 'keyboard-shortcut') ctx.toggleFullscreen(false);
                else ctx.toggleFullscreen();
            }}>
            &#x26F6;
        </Toolbar.Button>
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
    className?: string;
    min?: number;
    max: number;
    value?: number;
    onChange(value: number): void;
}

Toolbar.Slider = function ToolbarSlider(props: ToolbarSliderProps) {
    const { className, max, onChange } = props;

    const min = props.min ?? 0;
    if (max < min) throw new Error('invalid properties specified to toolbar slider');

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
    }, [value, min, max, onChange]);

    const charLength = Math.max(min.toString().length, max.toString().length);
    const valueStr = value.toString().padStart(charLength, ' ');
    const minStr = min.toString().padStart(charLength, ' ');
    const maxStr = max.toString().padStart(charLength, ' ');
    const text = min === 0
        ? `${valueStr}/${maxStr}`
        : `${valueStr} in [${min}, ${max}]`

    return (
        <div className={classnames('flex items-center gap-x-2', className)}>
            <input type="range"
                className="grow"
                min={min} max={max} value={value}
                onChange={e => assignValue(e.target.valueAsNumber)} />
            <span className="font-mono">{text}</span>
        </div>
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