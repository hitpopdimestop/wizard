import { useSyncExternalStore } from "react";
import type { Question, UserAnswers } from "@/types";

const STORAGE_KEY = "wizard_flow_state";

interface WizardState {
    currentIndex: number;
    history: number[];
    answers: UserAnswers;
}

const defaultState: WizardState = {
    currentIndex: 0,
    history: [],
    answers: {},
};

let isInitialLoadCleared = false;

function getSnapshot(): string {
    if (typeof window === "undefined") return JSON.stringify(defaultState);

    const savedRaw = sessionStorage.getItem(STORAGE_KEY);
    if (!savedRaw) return JSON.stringify(defaultState);

    try {
        const parsed = JSON.parse(savedRaw) as WizardState;

        if (!isInitialLoadCleared) {
            isInitialLoadCleared = true;

            const resetState = {
                currentIndex: 0,
                history: [],
                answers: parsed.answers || {},
            };

            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
            return JSON.stringify(resetState);
        }

        return savedRaw;
    } catch {
        return JSON.stringify(defaultState);
    }
}

function getServerSnapshot(): string {
    return JSON.stringify(defaultState);
}

function subscribe(callback: () => void): () => void {
    window.addEventListener("wizard_state_change", callback);
    return () => window.removeEventListener("wizard_state_change", callback);
}

function isQuestionValid(question: Question, answers: UserAnswers): boolean {
    if (!question.conditions || question.conditions.length === 0) return true;

    return question.conditions.every(condition => {
        const userAnswer = answers[condition.relatedQuestionId];
        if (userAnswer === undefined) return false;

        if (Array.isArray(condition.expectedValue)) {
            if (Array.isArray(userAnswer)) {
                return userAnswer.some(val => condition.expectedValue.includes(val));
            }
            return condition.expectedValue.includes(userAnswer as string);
        }

        if (Array.isArray(userAnswer)) {
            return userAnswer.includes(condition.expectedValue);
        }
        return userAnswer === condition.expectedValue;
    });
}

// Drops stale cached keys if their rendering rules fail the current path selection
function sanitizeAnswers(questions: Question[], answers: UserAnswers): UserAnswers {
    const sanitized = { ...answers };
    let currentValidAnswers = { ...answers };
    let changed = true;

    while (changed) {
        changed = false;
        for (const question of questions) {
            if (sanitized[question.id] !== undefined && !isQuestionValid(question, currentValidAnswers)) {
                delete sanitized[question.id];
                currentValidAnswers = { ...sanitized };
                changed = true;
            }
        }
    }

    return sanitized;
}

export function useWizardFlow(questions: Question[], isLoading: boolean) {
    const rawState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const state: WizardState = JSON.parse(rawState);

    const { currentIndex, history, answers } = state;

    const currentQuestion = questions[currentIndex];
    const isFinish = currentIndex === -1 || (!isLoading && questions.length > 0 && !currentQuestion);

    const updateStore = (nextState: WizardState) => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
            window.dispatchEvent(new Event("wizard_state_change"));
        } catch (error) {
            console.error("Failed to update wizard state store:", error);
        }
    };

    const handleSelectAnswer = (questionId: string, value: UserAnswers[string]) => {
        updateStore({
            ...state,
            answers: { ...answers, [questionId]: value },
        });
    };

    const handleNext = () => {
        const cleanAnswers = sanitizeAnswers(questions, answers);
        let nextIndex = currentIndex + 1;

        while (nextIndex < questions.length) {
            if (isQuestionValid(questions[nextIndex], cleanAnswers)) {
                updateStore({
                    currentIndex: nextIndex,
                    history: [...history, currentIndex],
                    answers: cleanAnswers,
                });
                return;
            }
            nextIndex++;
        }
        updateStore({
            currentIndex: -1,
            history: [...history, currentIndex],
            answers: cleanAnswers,
        });
    };

    const handleBack = () => {
        if (history.length === 0) return;
        const newHistory = [...history];
        const prevIndex = newHistory.pop()!;
        updateStore({
            currentIndex: prevIndex,
            history: newHistory,
            answers,
        });
    };

    const handleSkip = () => {
        if (!currentQuestion) return;

        const updatedAnswers = { ...answers };
        delete updatedAnswers[currentQuestion.id];

        const cleanAnswers = sanitizeAnswers(questions, updatedAnswers);
        let nextIndex = currentIndex + 1;

        while (nextIndex < questions.length) {
            if (isQuestionValid(questions[nextIndex], cleanAnswers)) {
                updateStore({
                    currentIndex: nextIndex,
                    history: [...history, currentIndex],
                    answers: cleanAnswers,
                });
                return;
            }
            nextIndex++;
        }
        updateStore({
            currentIndex: -1,
            history: [...history, currentIndex],
            answers: cleanAnswers,
        });
    };

    const handleRestart = () => {
        try {
            isInitialLoadCleared = true;
            sessionStorage.removeItem(STORAGE_KEY);
            window.dispatchEvent(new Event("wizard_state_change"));
        } catch (error) {
            console.error("Failed to clear store:", error);
        }
    };

    const hasValue = () => {
        if (!currentQuestion) return false;
        const val = answers[currentQuestion.id];
        if (currentQuestion.type === 'checkbox') return Array.isArray(val) && val.length > 0;
        return val !== undefined && val !== "";
    };

    const shouldShowSkipButton = currentQuestion && !hasValue();

    return {
        currentQuestion,
        currentIndex,
        isFinish,
        history,
        answers,
        shouldShowSkipButton,
        handleSelectAnswer,
        handleNext,
        handleBack,
        handleSkip,
        handleRestart,
    };
}