"use client";

import { useTheme } from "../hooks/use-theme";

export function NavigationThemeSwitch() {
    const [theme, setTheme] = useTheme();
    const themeChoices = [
        { value: 'light', icon: '☀️', text: 'Light' }, // &#x2600;&#xFE0F;
        { value: 'dark', icon: '🌑', text: 'Dark' }, // &#x1F311;
        { value: 'auto', icon: '🖥️', text: 'System' }, // &#x1F5A5;&#xFE0F;
    ] as const;
    const selectedThemeChoiceIndex = themeChoices.findIndex(x => x.value === theme) ?? 0;
    const nextThemeValue = themeChoices[(selectedThemeChoiceIndex + 1) % themeChoices.length].value;
    return (
        <button className="group text-slate-600 dark:text-slate-200 hover:text-current"
            onClick={() => setTheme(nextThemeValue)}>
            <span>{themeChoices[selectedThemeChoiceIndex].icon}</span>
            &nbsp;
            <span className="hidden sm:inline group-hover:underline">{themeChoices[selectedThemeChoiceIndex].text}</span>
        </button>
    )
}
