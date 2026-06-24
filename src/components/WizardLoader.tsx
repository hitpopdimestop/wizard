interface WizardLoaderProps {
    message?: string;
}

export function WizardLoader({ message = "Loading wizard config..." }: WizardLoaderProps) {
    return (
        <div
            className="flex-1 flex flex-col items-center justify-center space-y-3 animate-fade-in"
            role="status"
        >
            <div
                className="w-7 h-7 border-2 border-zinc-200 border-t-zinc-950 rounded-full animate-spin dark:border-zinc-800 dark:border-t-white"
                aria-hidden="true"
            />
            <span className="text-xs font-medium text-zinc-400 font-mono">
                {message}
            </span>
        </div>
    );
}