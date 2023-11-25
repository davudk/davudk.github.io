'use client'
import { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook";
import { Post } from "@/app/posts";
import { Search } from "./Search";
import Link from "next/link";

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
        <header className="flex items-center mt-2 mb-4">

            <div className="grow">
                <Link className="text-2xl hover:underline underline-offset-2 decoration-[1.5px]" href="/">
                    {process.env.siteName}
                </Link>
            </div>

            <button className="group hidden sm:block text-slate-600 dark:text-slate-200 hover:text-current"
                onClick={() => setSearchIsOpen(!searchIsOpen)}>
                <span className="group-hover:underline">Search</span>
                &nbsp;&#x1F50D;
            </button>

            <button className="text-2xl sm:hidden"
                onClick={() => setSearchIsOpen(!searchIsOpen)}>&#x1F50D;</button>

            <Search posts={props.posts}
                open={searchIsOpen}
                onClose={() => setSearchIsOpen(false)} />
        </header>
    )
}
