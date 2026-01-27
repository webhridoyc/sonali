
"use client";

import { app, auth, firestore, analytics } from "@/firebase/config";
import { FirebaseProvider } from "@/firebase/provider";

export function FirebaseClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FirebaseProvider value={{ app, auth, firestore, analytics }}>
            {children}
        </FirebaseProvider>
    );
}
