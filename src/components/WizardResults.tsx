import type { UserAnswers } from "@/types";

import { useHeadingFocus } from "@/hooks/useHeadingFocus";

interface WizardResultsProps {
    answers: UserAnswers;
    onRestart: () => void;
}

export function WizardResults({ answers, onRestart }: WizardResultsProps) {
    const headingRef = useHeadingFocus<HTMLHeadingElement>();

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in"
            role="region"
            aria-labelledby="wizard-results-title"
        >
            <div className="text-4xl animate-bounce" aria-hidden="true">
                🎉
            </div>

            <h2
                id="wizard-results-title"
                ref={headingRef}
                tabIndex={-1}
                className="text-xl font-bold text-zinc-900 dark:text-zinc-50 outline-none"
            >
                Filters Ready!
            </h2>

            <p className="text-xs text-zinc-400 max-w-xs">
                Below is the client-side payload generated for the catalog search query:
            </p>

            <pre
                className="text-left text-xs bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl overflow-auto max-h-60 w-full font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-850"
                aria-label="Generated filters state JSON payload"
            >
                {JSON.stringify(answers, null, 2)}
            </pre>

            <button
                onClick={onRestart}
                aria-label="Restart the entire discovery wizard flow from scratch"
                className="mt-2 w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-sm rounded-xl transition-all dark:bg-zinc-800 dark:text-zinc-200"
            >
                Restart Discovery Flow
            </button>
        </div>
    );
}