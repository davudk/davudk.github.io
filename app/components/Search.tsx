'use client'
import { useCallback, useMemo, useState } from "react"
import { Dialog, Combobox } from '@headlessui/react'
import { performSearch } from "../util/search";
import { Post } from "@/posts";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface SearchProps {
    posts: Post[];
    open: boolean;
    onClose?(): void;
}

export function Search(props: SearchProps) {
    const router = useRouter();
    const { posts, open, onClose } = props;
    const [query, setQuery] = useState('');

    const searchResults = useMemo(() => {
        const q = query.trim();
        if (!q) return [];
        else return performSearch(posts, q);
    }, [posts, query]);

    const selectResult = useCallback((slug: string) => {
        console.log('select', slug)
        router.push(`/${slug}`);
        onClose?.();
    }, [router, onClose]);

    return (
        <Dialog className="relative z-50"
            open={open}
            onClose={() => onClose?.()}>
            <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-start justify-center pt-10 px-4 pb-4">
                <Dialog.Panel className="w-full max-w-md rounded shadow bg-white">

                    <Combobox onChange={selectResult}>
                        <Combobox.Input className="block w-full p-4 shadow-sm outline-none"
                            autoFocus
                            placeholder="Search posts..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)} />
                        <Combobox.Options>
                            {searchResults.map(p => (
                                <Combobox.Option key={p.slug} value={p.slug}>
                                    {({ active }) => (
                                        <div className={active ? 'bg-slate-100 outline-dashed outline-2 outline-slate-600' : ''}>
                                            <div className="group px-4 py-2 cursor-pointer">
                                                <div className="group-hover:underline truncate">{p.title}</div>
                                                {p.excerpt && (
                                                    <div className="text-sm text-slate-600 truncate">{p.excerpt}</div>
                                                )}
                                            </div>
                                        </div>
                                        // <Link href={`/${p.slug}`} className={'block px-4 py-2 ' + (active ? 'bg-slate-300' : '')}>
                                        //     <div>{p.title}</div>
                                        //     {p.excerpt && (
                                        //         <div className="text-sm text-slate-600 truncate">{p.excerpt}</div>
                                        //     )}
                                        // </Link>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Combobox>

                </Dialog.Panel>
            </div>
        </Dialog>
    );
}