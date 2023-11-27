'use client'
import Link from "next/link";
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook";
import { Post } from "@/posts";
import { Search } from "./Search";
import { useTheme } from "../hooks/use-theme";

export interface NavigationProps {
    posts: Post[];
}

export function Navigation(props: NavigationProps) {
    const [theme, setTheme] = useTheme();
    const themeChoices = [
        { value: 'light', icon: '☀️', text: 'Light' }, // &#x2600;&#xFE0F;
        { value: 'dark', icon: '🌑', text: 'Dark' }, // &#x1F311;
        { value: 'auto', icon: '🖥️', text: 'System' }, // &#x1F5A5;&#xFE0F;
    ] as const;
    const selectedThemeChoiceIndex = themeChoices.findIndex(x => x.value === theme) ?? 0;
    const nextThemeValue = themeChoices[(selectedThemeChoiceIndex + 1) % themeChoices.length].value;
    // const themeOptions: SelectOption[] = [
    //     { value: 'light', text: '☀️ Light' }, // &#x2600;&#xFE0F;
    //     { value: 'dark', text: '🌑 Dark' }, // &#x1F311;
    //     { value: 'auto', text: '🖥️ System' }, // &#x1F5A5;&#xFE0F;
    // ]


    const [searchIsOpen, setSearchIsOpen] = useState(false);

    useHotkeys('/', e => {
        e.preventDefault();
        setSearchIsOpen(true);
    }, []);

    return (
        <header className="flex items-center mt-2 mb-4 gap-x-2">

            {/* Brand / site title */}
            <div className="grow">
                <Link className="text-2xl hover:underline underline-offset-2 decoration-[1.5px]" href="/">
                    {process.env.siteName}
                </Link>
            </div>

            {/* Dark/light mode */}
            <button className="group text-slate-600 dark:text-slate-200 hover:text-current"
                onClick={() => setTheme(nextThemeValue)}>
                <span>{themeChoices[selectedThemeChoiceIndex].icon}</span>
                &nbsp;
                <span className="hidden sm:inline group-hover:underline">{themeChoices[selectedThemeChoiceIndex].text}</span>
            </button>

            {/* Search */}
            <button className="group text-slate-600 dark:text-slate-200 hover:text-current"
                onClick={() => setSearchIsOpen(!searchIsOpen)}>
                &#x1F50D;&nbsp;
                <span className="hidden sm:inline group-hover:underline">Search</span>
            </button>

            {/* Search model */}
            <Search posts={props.posts}
                open={searchIsOpen}
                onClose={() => setSearchIsOpen(false)} />
        </header>
    )
}
