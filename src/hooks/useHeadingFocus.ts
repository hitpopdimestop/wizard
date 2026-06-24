import { useEffect, useRef } from "react";

export function useHeadingFocus<T extends HTMLElement>(dependency?: unknown) {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const focusTimeout = requestAnimationFrame(() => {
            if (elementRef.current) {
                elementRef.current.focus();
            }
        });

        return () => cancelAnimationFrame(focusTimeout);
    }, [dependency]);

    return elementRef;
}