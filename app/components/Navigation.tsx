'use client';
import Link from "next/link";
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook";
import { Post } from "@/posts";
import { Search } from "./Search";
import dynamic from "next/dynamic";
// import { NavigationThemeSwitch } from "./Navigation.ThemeSwitch";

// I did this because the standard import was causing a nextjs error (probably a bug)
const NavigationThemeSwitch = dynamic(() =>
    import('./Navigation.ThemeSwitch').then(x => x.NavigationThemeSwitch), { ssr: false });

export interface NavigationProps {
    posts: Post[];
}

export function Navigation(props: NavigationProps) {
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
            <NavigationThemeSwitch />

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
