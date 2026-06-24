import type { Question, UserAnswers, RadioQuestion, CheckboxQuestion, SliderQuestion, TextQuestion } from "@/types";
import { RadioInput } from "@/components/RadioInput";
import { CheckboxInput } from "@/components/CheckboxInput";
import { TextInput } from "@/components/TextInput";
import { RangeSliderInput } from "@/components/RangeSliderInput";

import { useHeadingFocus } from "@/hooks/useHeadingFocus";

interface WizardStepProps {
    currentQuestion: Question;
    history: number[];
    answers: UserAnswers;
    shouldShowSkipButton: boolean;
    handleSelectAnswer: (questionId: string, value: UserAnswers[string]) => void;
    handleNext: () => void;
    handleBack: () => void;
    handleSkip: () => void;
}

export function WizardStep({
                               currentQuestion,
                               history,
                               answers,
                               shouldShowSkipButton,
                               handleSelectAnswer,
                               handleNext,
                               handleBack,
                               handleSkip,
                           }: WizardStepProps) {

    const headingRef = useHeadingFocus<HTMLHeadingElement>(currentQuestion.id);

    const renderActiveInput = (q: Question) => {
        const currentVal = answers[q.id];
        switch (q.type) {
            case "radio":
                return <RadioInput question={q as RadioQuestion} value={currentVal as string} onChange={(val) => handleSelectAnswer(q.id, val)} />;
            case "checkbox":
                return <CheckboxInput question={q as CheckboxQuestion} value={currentVal as string[]} onChange={(val) => handleSelectAnswer(q.id, val)} />;
            case "text":
                return <TextInput question={q as TextQuestion} value={currentVal as string} onChange={(val) => handleSelectAnswer(q.id, val)} />;
            case "slider":
                return <RangeSliderInput question={q as SliderQuestion} value={currentVal as { min: number; max: number }} onChange={(val) => handleSelectAnswer(q.id, val)} />;
            default:
                return null;
        }
    };

    const stepNumber = history.length + 1;

    return (
        <div
            className="flex-1 flex flex-col justify-between space-y-6"
            role="region"
            aria-live="polite"
            aria-labelledby="wizard-question-title"
        >
            <div className="flex items-center justify-between" role="navigation" aria-label="Wizard progress">
                <button
                    onClick={handleBack}
                    disabled={history.length === 0}
                    aria-label="Go back to the previous step"
                    className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 disabled:opacity-0 transition-all dark:hover:text-zinc-200"
                >
                    ← Back
                </button>
                <span
                    className="text-xs font-mono text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-md dark:bg-zinc-800"
                    aria-label={`Current Step ${stepNumber}`}
                >
                    Step {stepNumber}
                </span>
                <div className="w-10" aria-hidden="true" />
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
                <h2
                    id="wizard-question-title"
                    key={currentQuestion.id}
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 outline-none"
                >
                    {currentQuestion.title}
                </h2>
                <div className="flex-1 pt-2">
                    {renderActiveInput(currentQuestion)}
                </div>
            </div>

            <div>
                {shouldShowSkipButton ? (
                    <button
                        onClick={handleSkip}
                        aria-label={`Skip answering: ${currentQuestion.title}`}
                        className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 py-3.5 rounded-xl font-semibold text-sm transition-all dark:bg-zinc-800 dark:text-zinc-200"
                    >
                        Skip This Step
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        aria-label={`Save answer and continue to next layout step`}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-xl font-semibold text-sm transition-all dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}