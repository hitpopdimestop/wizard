import type { NextApiRequest, NextApiResponse } from "next";
import type { Question } from "@/types";
import { MOCK_QUESTIONS } from "@/mocks";

// Simulating gRPC service or Database call to get the layout schema
async function fetchQuestionsSchema(): Promise<Question[]> {
    return MOCK_QUESTIONS;
}

// Simulating a catalog lookup to find real-time active pricing metrics
async function fetchCurrentPriceBounds(): Promise<{ dynamicMin: number; dynamicMax: number; dynamicStep: number}> {
    return {
        dynamicMin: 15,
        dynamicMax: 120,
        dynamicStep: 1,
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Question[]>,
) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const [rawQuestions, priceBounds] = await Promise.all([
            fetchQuestionsSchema(),
            fetchCurrentPriceBounds(),
            new Promise((resolve) => setTimeout(resolve, 600)), // Simulate network latency
        ]);

        const { dynamicMin, dynamicMax, dynamicStep } = priceBounds;

        const enrichedQuestions = rawQuestions.map((question) => {
            if (question.type === "slider" && question.id === "q-price") {
                return {
                    ...question,
                    sliderConfig: {
                        min: dynamicMin,
                        max: dynamicMax,
                        step: dynamicStep,
                    },
                };
            }
            return question;
        });

        return res.status(200).json(enrichedQuestions);
        // error won't ever happen with mocked data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        return res.status(500).json([]);
    }
}