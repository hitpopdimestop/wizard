interface WizardErrorProps {
    error: string;
}

export function WizardError({ error }: WizardErrorProps) {
    return (
        <div
            className="flex-1 flex flex-col items-center justify-center text-center space-y-3"
            role="alert"
        >
            <div className="text-red-500 text-2xl" aria-hidden="true">
                ⚠️
            </div>
            <p className="text-xs text-zinc-500">
                {error}
            </p>
        </div>
    );
}