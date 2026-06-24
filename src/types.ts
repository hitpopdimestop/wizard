export type QuestionType = 'text' | 'radio' | 'checkbox' | 'slider';

export type QuestionCondition = {
    id: string;
    relatedQuestionId: string;
    expectedValue: string | string[];
};

export type StandardAnswerOption = {
    id: string;
    value: string;
};

export type SliderConfig = {
    min: number;
    max: number;
    step: number;
};

interface BaseQuestion {
    id: string;
    title: string;
    image: string;
    conditions?: QuestionCondition[];
}

export interface TextQuestion extends BaseQuestion {
    type: 'text';
}

export interface RadioQuestion extends BaseQuestion {
    type: 'radio';
    answerOptions: StandardAnswerOption[];
}

export interface CheckboxQuestion extends BaseQuestion {
    type: 'checkbox';
    answerOptions: StandardAnswerOption[];
}

export interface SliderQuestion extends BaseQuestion {
    type: 'slider';
    sliderConfig: SliderConfig;
}

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion | SliderQuestion;

export type AnswerValue = string | string[] | { min: number; max: number };

export type UserAnswers = {
    [questionId: string]: AnswerValue;
};