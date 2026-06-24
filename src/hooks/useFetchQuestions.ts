import { useState, useEffect } from "react";
import type { Question } from "@/types";

export function useFetchQuestions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadQuestions() {
            try {
                setIsLoading(true);
                const res = await fetch("/api/questions");
                if (!res.ok) throw new Error("Failed to load layout configurations.");
                const data = await res.json();
                setQuestions(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        }
        loadQuestions();
    }, []);

    return { questions, isLoading, error };
}