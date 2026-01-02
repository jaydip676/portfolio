'use client'

import { useAnimatedTitle } from "./hooks/useAnimatedTitle";

export default function Provider({ children }: { children: React.ReactNode }) {
    useAnimatedTitle();
    return <>{children}</>;
}