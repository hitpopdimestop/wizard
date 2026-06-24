import { Geist, Geist_Mono } from "next/font/google";

import { WizardLoader } from "@/components/WizardLoader";
import { WizardResults } from "@/components/WizardResults";
import { WizardError } from "@/components/WizardError";
import { WizardStep } from "@/components/WizardStep";

import { useFetchQuestions } from "@/hooks/useFetchQuestions";
import { useWizardFlow } from "@/hooks/useWizardFlow";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  const { questions, isLoading, error } = useFetchQuestions();

  const {
    currentQuestion,
    isFinish,
    history,
    answers,
    shouldShowSkipButton,
    handleSelectAnswer,
    handleNext,
    handleBack,
    handleSkip,
    handleRestart,
  } = useWizardFlow(questions, isLoading);

  const shouldShowError = error && !isLoading;
  const shouldShowFinalResults = !isLoading && !error && isFinish;
  const shouldShowSteps = !isLoading && !error && !isFinish && currentQuestion;

  return (
      <div className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans p-4 dark:bg-zinc-950 transition-colors`}>
        <div className="w-full max-w-md bg-white border border-zinc-200/60 rounded-3xl shadow-xl p-6 dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-none flex flex-col min-h-[520px] justify-between">

          {isLoading && <WizardLoader message="Loading layout configurations..." />}

          {shouldShowError && <WizardError error={error} />}

          {shouldShowFinalResults && (
              <WizardResults answers={answers} onRestart={handleRestart} />
          )}

          {shouldShowSteps && (
              <WizardStep
                  currentQuestion={currentQuestion}
                  history={history}
                  answers={answers}
                  shouldShowSkipButton={shouldShowSkipButton}
                  handleSelectAnswer={handleSelectAnswer}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSkip={handleSkip}
              />
          )}

        </div>
      </div>
  );
}