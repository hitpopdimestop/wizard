import type { TextQuestion } from "@/types";

interface TextInputProps {
    question: TextQuestion;
    value: string;
    onChange: (value: string) => void;
}

export function TextInput({ value = "", onChange }: TextInputProps) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer here..."
            aria-labelledby="wizard-question-title"
            className="w-full h-32 p-4 rounded-xl border border-zinc-200 bg-white text-sm transition-all resize-none outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 animate-fade-in"
        />
    );
}