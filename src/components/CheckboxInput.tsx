import type { CheckboxQuestion } from "@/types";

interface CheckboxInputProps {
    question: CheckboxQuestion;
    value: string[];
    onChange: (value: string[]) => void;
}

export function CheckboxInput({ question, value = [], onChange }: CheckboxInputProps) {
    return (
        <div className="space-y-3 animate-fade-in">
            {question.answerOptions.map(opt => {
                const isSelected = value.includes(opt.id);
                const toggleCheckbox = () => {
                    const nextSelection = isSelected
                        ? value.filter(id => id !== opt.id)
                        : [...value, opt.id];
                    onChange(nextSelection);
                };
                return (
                    <button
                        key={opt.id}
                        onClick={toggleCheckbox}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex justify-between items-center ${
                            isSelected
                                ? "border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50"
                                : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50"
                        }`}
                    >
                        <span>{opt.value}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                            isSelected ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:text-black" : "border-zinc-300"
                        }`}>
                            {isSelected && "✓"}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}