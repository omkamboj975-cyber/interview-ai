import { GoogleGenAI } from "@google/genai";
import z from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const technicalQuestionSchema = z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
});

const behavioralQuestionSchema = z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
});

const skillGapSchema = z.object({
    skills: z.string(),
    severity: z.enum(["low", "medium", "high"]),
});

const preparationPlanSchema = z.object({
    day: z.number().int().min(1),
    focus: z.string(),
    tasks: z.array(z.string()).min(1),
});

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z
        .array(technicalQuestionSchema)
        .min(3)
        .max(7),

    behavioralQuestions: z
        .array(behavioralQuestionSchema)
        .min(2)
        .max(5),

    skillGap: z.array(skillGapSchema),

    preparationPlan: z
        .array(preparationPlanSchema)
        .min(3)
        .max(14),
});

const responseSchema = z.toJSONSchema(interviewReportSchema);

const buildPrompt = ({
    resume,
    selfDescription,
    jobDescription,
}) => {
    return `
You are an expert technical interviewer and career coach.

Analyze the candidate's resume against the given job description and create a structured interview preparation report.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription || "Not provided."}

Follow these rules strictly:

1. Calculate matchScore from 0 to 100 based only on the skills, experience, and requirements actually present in the resume and job description.

2. Do not assume that the candidate has a skill if it is not mentioned in the resume.

3. Generate 3 to 7 technical interview questions.

4. Every technical question MUST be an object with exactly these fields:
   - question
   - intention
   - answer

5. Generate 2 to 5 behavioral interview questions.

6. Every behavioral question MUST be an object with exactly these fields:
   - question
   - intention
   - answer

7. Identify the candidate's skill gaps.

8. Every skill gap MUST be an object with:
   - skills
   - severity

9. severity MUST be exactly:
   - low
   - medium
   - high

10. Create a preparation plan containing 3 to 14 days.

11. Every preparation plan item MUST be an object with:
   - day
   - focus
   - tasks

12. tasks MUST be an array of strings.

13. Do not return technicalQuestions as an array of strings.

14. Do not return behavioralQuestions as an array of strings.

15. Do not return preparationPlan as an array of strings.

16. If the resume and job description are completely unrelated, give a very low matchScore and explain the missing skills through skillGap.

17. Return ONLY the JSON object. Do not include markdown, explanations, or any text outside the JSON.

The response MUST follow this exact structure:

{
    "matchScore": 80,
    "technicalQuestions": [
        {
            "question": "Example technical question",
            "intention": "What this question tests",
            "answer": "Ideal answer"
        }
    ],
    "behavioralQuestions": [
        {
            "question": "Example behavioral question",
            "intention": "What this question tests",
            "answer": "Ideal answer"
        }
    ],
    "skillGap": [
        {
            "skills": "Example skill",
            "severity": "medium"
        }
    ],
    "preparationPlan": [
        {
            "day": 1,
            "focus": "Example topic",
            "tasks": [
                "Task 1",
                "Task 2"
            ]
        }
    ]
}
`.trim();
};

const generateInterviewReport = async ({
    resume,
    selfDescription,
    jobDescription,
}) => {
    if (!jobDescription || !resume) {
        throw new Error(
            "Both resume and jobDescription are required to generate a report"
        );
    }

    const prompt = buildPrompt({
        resume,
        selfDescription,
        jobDescription,
    });

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const rawText = response.text;

    let parsed;

    try {
        parsed = JSON.parse(rawText);
    } catch (error) {
        throw new Error(
            "Gemini returned invalid JSON, could not parse report"
        );
    }

    const validated = interviewReportSchema.parse(parsed);

    return validated;
};

export default generateInterviewReport;