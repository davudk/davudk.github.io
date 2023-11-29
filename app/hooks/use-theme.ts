"use client"

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const ThemeKey = 'theme';
const ThemeDefault: ThemeType = 'auto';

export type ThemeType = 'light' | 'dark' | 'auto';

export function getThemeValue(): ThemeType {
    return globalThis.localStorage.getItem(ThemeKey) as ThemeType
        ?? ThemeDefault;
}

export function isDarkMode(): boolean {
    let v = getThemeValue();
    if (v === 'auto') {
        if (globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches) {
            v = 'dark';
        }
    }
    return v === 'dark';
}

export function refreshTheme() {
    if (globalThis.window) {
        const v = getThemeValue();
        const html = globalThis.document.documentElement;
        html.classList.remove('light', 'dark', 'auto');
        html.classList.add(v);
    }
}

export function useTheme() {
    const [theme, setThemeValue] = useLocalStorage<ThemeType>(ThemeKey, ThemeDefault);

    const setTheme = useCallback((v: ThemeType) => {
        setThemeValue(v);
        refreshTheme();
    }, [setThemeValue]);

    return [theme, setTheme] as const;
}

refreshTheme();
