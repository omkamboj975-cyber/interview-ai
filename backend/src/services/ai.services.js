import { GoogleGenAI } from "@google/genai";
import z from "zod";
import puppeteer from 'puppeteer';

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

    scoreExplanation: z.string(),

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
${resume || "Not provided."}

CANDIDATE SELF-DESCRIPTION:
${selfDescription || "Not provided."}

Follow these rules strictly:

1. Calculate matchScore from 0 to 100 based only on the skills, experience, and requirements actually present in the candidate's profile (resume and/or self-description) and job description.

2. Do not assume that the candidate has a skill if it is not mentioned in the resume or self-description.

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

18. Include a "scoreExplanation" field: 2-3 sentences explaining specifically what pulled the matchScore up or down. Reference real skills from the resume that matched well, and real skills from the job description that were missing or weak. Be specific and concrete, not generic or vague.

The response MUST follow this exact structure:

{
    "matchScore": 80,
    "scoreExplanation": "The candidate demonstrates strong hands-on experience with React, Node.js, and MongoDB, which are core requirements for this role. However, the resume lacks any mention of testing frameworks, CI/CD pipelines, or cloud deployment experience, which are explicitly requested in the job description.",
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
    if (!jobDescription || (!resume && !selfDescription)) {
        throw new Error(
            "Job description and either a resume or self description are required to generate a report"
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

const resumeHtmlSchema = z.object({
    html: z.string(),
});

const buildResumePrompt = ({ resume, jobDescription, selfDescription }) => {
    return `
You are an expert resume writer and HTML/CSS designer.

Using the candidate's existing resume, their self-description, and the target job description below, generate a single, complete, polished, ATS-friendly resume as a self-contained HTML document.

JOB DESCRIPTION:
${jobDescription}

EXISTING RESUME CONTENT:
${resume || "Not provided."}

CANDIDATE SELF-DESCRIPTION:
${selfDescription || "Not provided."}

Follow these rules strictly:

1. Tailor the resume content to align with the job description — emphasize relevant skills and experience already present in the candidate's resume. Do not invent experience, companies, job titles, or metrics that are not present in the original resume or self-description.

2. Output a SINGLE, COMPLETE, self-contained HTML document, including:
   - <!DOCTYPE html>, <html>, <head>, and <body> tags
   - All CSS inline inside a <style> tag in the <head> — do not link external stylesheets, since this will be rendered offline
   - Do not use external images, fonts from external URLs, or JavaScript

3. Design it to look clean, professional, and print-ready:
   - Use a simple, readable font stack (e.g. Arial, Helvetica, sans-serif)
   - Use clear section headings (Summary, Skills, Experience, Education, Projects — only include sections that have real content)
   - Use consistent spacing and a layout that fits well on a standard A4/Letter page
   - Avoid large decorative elements, background images, or anything that wastes print space

4. Do not include any markdown, explanations, or commentary — return ONLY a JSON object with a single field "html" containing the full HTML document as a string.

Return your response in exactly this shape:
{
    "html": "<!DOCTYPE html><html>...</html>"
}
`.trim();
};

const generateResumeHtml = async ({ resume, jobDescription, selfDescription }) => {
    if (!jobDescription || (!resume && !selfDescription)) {
        throw new Error("Job description and either a resume or self description are required to generate a resume");
    }

    const prompt = buildResumePrompt({ resume, jobDescription, selfDescription });
    const resumeResponseSchema = z.toJSONSchema(resumeHtmlSchema);

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumeResponseSchema,
        },
    });

    const rawText = response.text;

    let parsed;
    try {
        parsed = JSON.parse(rawText);
    } catch (error) {
        throw new Error("Gemini returned invalid JSON, could not parse resume HTML");
    }

    const validated = resumeHtmlSchema.parse(parsed);
    return validated.html;
};

const generateResumePdf = async ({ resume, jobDescription, selfDescription }) => {
    const html = await generateResumeHtml({ resume, jobDescription, selfDescription });

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20px",
                bottom: "20px",
                left: "20px",
                right: "20px",
            },
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
};

export default generateInterviewReport;
export { generateResumePdf };