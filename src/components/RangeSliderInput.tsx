import type { SliderQuestion } from "@/types";

interface RangeSliderInputProps {
    question: SliderQuestion;
    value: { min: number; max: number };
    onChange: (value: { min: number; max: number }) => void;
}

export function RangeSliderInput({ question, value, onChange }: RangeSliderInputProps) {
    const config = question.sliderConfig;
    const sliderVal = value || { min: config.min, max: config.max };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(e.target.value), sliderVal.max - config.step);
        onChange({ min: val, max: sliderVal.max });
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(e.target.value), sliderVal.min + config.step);
        onChange({ min: sliderVal.min, max: val });
    };

    const minPercent = ((sliderVal.min - config.min) / (config.max - config.min)) * 100;
    const maxPercent = ((sliderVal.max - config.min) / (config.max - config.min)) * 100;

    return (
        <div
            className="space-y-6 py-4 animate-fade-in"
            role="group"
            aria-labelledby="wizard-question-title"
        >
            <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-zinc-50 font-mono">
                <span className="bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    Min: ${sliderVal.min}
                </span>
                <span className="bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                    Max: ${sliderVal.max}
                </span>
            </div>

            <div className="relative w-full h-7 flex items-center">
                <div className="absolute left-0 right-0 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full z-0" />
                <div
                    className="absolute h-2 bg-zinc-900 dark:bg-zinc-50 rounded-full z-10"
                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                />

                <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={sliderVal.min}
                    onChange={handleMinChange}
                    aria-label={`Minimum value selection for ${question.title}`}
                    className={`absolute w-full h-2 pointer-events-none appearance-none bg-transparent focus:outline-none focus-visible:z-30 range-slider-double min-range-input ${
                        sliderVal.min > config.max / 2 ? "z-30" : "z-20"
                    }`}
                    style={{ WebkitAppearance: 'none' }}
                />

                <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={sliderVal.max}
                    onChange={handleMaxChange}
                    aria-label={`Maximum value selection for ${question.title}`}
                    className={`absolute w-full h-2 pointer-events-none appearance-none bg-transparent focus:outline-none focus-visible:z-30 range-slider-double max-range-input ${
                        sliderVal.min > config.max / 2 ? "z-20" : "z-30"
                    }`}
                    style={{ WebkitAppearance: 'none' }}
                />
            </div>

            <p id="slider-description" className="text-xs text-zinc-400 text-center">
                Adjust the range to match your preferred parameters
            </p>
        </div>
    );
}