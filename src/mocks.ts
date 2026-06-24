import { Question } from '@/types'; // підстав свій шлях до типів

export const MOCK_QUESTIONS: Question[] = [
    {
        id: 'q-sport',
        title: 'Which sport interests you the most?',
        type: 'radio',
        image: '/images/sport.png',
        answerOptions: [
            { id: 'yoga', value: 'Yoga' },
            { id: 'football', value: 'Football' },
            { id: 'crossfit', value: 'CrossFit' },
            { id: 'tennis', value: 'Tennis' }
        ]
    },
    {
        id: 'q-tennis-equipment',
        title: 'Do you have your own tennis equipment (racket, balls)?',
        type: 'radio',
        image: '/images/tennis-gear.png',
        answerOptions: [
            { id: 'eq-yes', value: 'Yes, I have everything' },
            { id: 'eq-no', value: 'No, I need help to pick the right gear' }
        ],
        conditions: [
            {
                id: 'cond-tennis-only',
                relatedQuestionId: 'q-sport',
                expectedValue: 'tennis'
            }
        ]
    },
    {
        id: 'q-frequency',
        title: 'How often do you want to train?',
        type: 'radio',
        image: '/images/calendar.png',
        answerOptions: [
            { id: 'freq-1', value: 'Once a week' },
            { id: 'freq-2-3', value: '2-3 times/week' },
            { id: 'freq-4-5', value: '4-5 times/week' },
            { id: 'freq-daily', value: 'Daily' }
        ]
    },
    {
        id: 'q-availability',
        title: 'When are you usually available?',
        type: 'checkbox',
        image: '/images/clock.png',
        answerOptions: [
            { id: 'time-mornings', value: 'Mornings' },
            { id: 'time-afternoons', value: 'Afternoons' },
            { id: 'time-evenings', value: 'Evenings' },
            { id: 'time-nights', value: 'Nights' }
        ]
    },
    {
        id: 'q-fitness-level',
        title: "What's your current fitness level?",
        type: 'radio',
        image: '/images/weightlifter.png',
        answerOptions: [
            { id: 'lvl-beginner', value: 'Beginner' },
            { id: 'lvl-intermediate', value: 'Intermediate' },
            { id: 'lvl-advanced', value: 'Advanced' },
            { id: 'lvl-athlete', value: 'Pro/Athlete' }
        ]
    },
    {
        id: 'q-motivation',
        title: 'What motivates you to stay active?',
        type: 'text',
        image: '/images/notebook.png'
    },
    {
        id: 'q-goals',
        title: 'What are your fitness goals?',
        type: 'checkbox',
        image: '/images/target.png',
        answerOptions: [
            { id: 'goal-wellbeing', value: 'Enhance physical well-being' },
            { id: 'goal-strength', value: 'Build strength' },
            { id: 'goal-endurance', value: 'Improve endurance' },
            { id: 'goal-fun', value: 'Have fun' }
        ]
    },
    {
        id: 'q-price',
        title: "What's your ideal price per lesson?",
        type: 'slider',
        image: '/images/money-bag.png',
        sliderConfig: {
                min: 0,
                max: 0,
                step: 0
        }
    }
];