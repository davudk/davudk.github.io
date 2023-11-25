'use client';

import { useForceRender } from "@/app/hooks/use-force-render";
import { useCallback, useEffect, useRef } from "react";

interface Entry {
    interactiveId: string;
    refreshCallback: Function;
}

const interactives = new Map<string, Entry>();
let primaryInteractiveId: string | undefined = undefined;

window.addEventListener('scroll', () => determinePrimaryInteractive());

export function isPrimaryInteractive(id: string) {
    return id === primaryInteractiveId;
}

export function registerInteractive(id: string, refreshCallback: Function) {
    unregisterInteractive(id);
    interactives.set(id, { interactiveId: id, refreshCallback });
    determinePrimaryInteractive();
}

export function unregisterInteractive(id: string) {
    const e = interactives.get(id);
    interactives.delete(id);

    if (e) {
        e.refreshCallback();
    }

    determinePrimaryInteractive();
}

export function useInteractiveManager(id: string) {
    const forceRender = useForceRender();

    useEffect(() => {
        registerInteractive(id, forceRender);
        return () => unregisterInteractive(id);
    }, [id]);

    const isPrimary = useCallback(() => {
        return isPrimaryInteractive(id);
    }, [id]);

    return {
        isPrimary
    };
}

function determinePrimaryInteractive() {
    const results = Array.from(interactives.keys())
        .map(id => document.getElementById(id)!)
        .filter(Boolean)
        .map(elem => ({ elem, score: getVisibleArea(elem) }))
        .filter(({ score }) => score > 64) // exclude ones that are barely visible
        .sort(({ score: s1 }, { score: s2 }) => {
            if (s1 > s2) return -1;
            else if (s2 > s1) return 1;
            else return 0;
        });

    primaryInteractiveId = results[0]?.elem.id;

    for (let e of interactives.values()) {
        e.refreshCallback();
    }
}

function getVisibleArea(e: HTMLElement) {
    let { top, bottom, left, right } = e.getBoundingClientRect()

    if (top > window.innerHeight
        || bottom <= 0
        || left > window.innerWidth
        || right <= 0) return 0;


    top = Math.max(top, 0);
    bottom = Math.min(bottom, window.innerHeight)
    left = Math.max(left, 0);
    right = Math.min(right, window.innerWidth);

    const w = right - left;
    const h = bottom - top;

    return w * h / 1000;
}
