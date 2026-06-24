import type { RadioQuestion } from "@/types";

interface RadioInputProps {
    question: RadioQuestion;
    value: string;
    onChange: (value: string) => void;
}

export function RadioInput({ question, value, onChange }: RadioInputProps) {
    return (
        <div
            className="space-y-3 animate-fade-in"
            role="radiogroup"
            aria-labelledby="wizard-question-title"
        >
            {question.answerOptions.map(opt => {
                const isSelected = value === opt.id;

                return (
                    <label
                        key={opt.id}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-zinc-950 dark:focus-within:ring-zinc-300 ${
                            isSelected
                                ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black"
                                : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50"
                        }`}
                    >
                        <input
                            type="radio"
                            name={question.id}
                            value={opt.id}
                            checked={isSelected}
                            onChange={() => onChange(opt.id)}
                            className="sr-only"
                        />
                        <span>{opt.value}</span>
                    </label>
                );
            })}
        </div>
    );
}