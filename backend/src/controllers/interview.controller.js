import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import InterviewReport from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.services.js";

export const generateInterviewReportController = async (req, res) => {
    try {
        console.log("req.file:", req.file);
        console.log("content-type header:", req.headers["content-type"]);
        console.log("req.body:", req.body);

        const { jobDescription, selfDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                message: "Job description is required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required",
            });
        }

        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                message: "Could not extract text from the uploaded resume",
            });
        }

        console.log("Resume text extracted successfully");

        const report = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
        });

        const savedReport = await InterviewReport.create({
            user: req.user.id,
            jobDescription,
            resume: resumeText,
            selfDescription,
            matchScore: report.matchScore,
            technicalQuestions: report.technicalQuestions,
            behavioralQuestions: report.behavioralQuestions,
            skillGap: report.skillGap,
            preparationPlan: report.preparationPlan,
        });

        return res.status(201).json({
            message: "Interview report generated successfully",
            report: savedReport,
        });

    } catch (error) {
        console.error("Interview report generation error:", error);

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message,
        });
    }
};

export const getInterviewReportByIdController = async (req, res) => {
    const { id } = req.params;

    const report = await InterviewReport.findOne({
        _id: id,
        user: req.user.id,
    });

    if (!report) {
        return res.status(404).json({
            message: "Report not found",
        });
    }

    res.status(200).json({
        message: "Report fetched successfully",
        report,
    });
};

export const getAllInterviewReportsController = async (req, res) => {
    const reports = await InterviewReport.find({ user: req.user.id })
        .select("jobDescription matchScore createdAt")
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: "Reports fetched successfully",
        reports,
    });
};