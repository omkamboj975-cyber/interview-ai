import { createRequire } from "module";
import { generateResumePdf } from '../services/ai.services.js';
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import InterviewReport from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.services.js";
import asyncHandler from "../utils/asyncHandler.js";

export const generateInterviewReportController = asyncHandler(async (req, res) => {
    const { jobDescription, selfDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({
            message: "Job description is required",
        });
    }

    const hasResume = !!req.file;
    const hasSelfDescription = typeof selfDescription === "string" && selfDescription.trim().length > 0;

    if (!hasResume && !hasSelfDescription) {
        return res.status(400).json({
            message: "Either a resume or a self description is required",
        });
    }

    let resumeText = "";
    if (hasResume) {
        const pdfData = await pdfParse(req.file.buffer);
        resumeText = pdfData.text ? pdfData.text.trim() : "";

        if (!resumeText && !hasSelfDescription) {
            return res.status(400).json({
                message: "Could not extract text from the uploaded resume",
            });
        }

        console.log("Resume text extracted successfully");
    }

    const report = await generateInterviewReport({
        resume: resumeText,
        selfDescription: hasSelfDescription ? selfDescription.trim() : "",
        jobDescription: jobDescription.trim(),
    });

    const savedReport = await InterviewReport.create({
        user: req.user.id,
        jobDescription: jobDescription.trim(),
        resume: resumeText || undefined,
        selfDescription: hasSelfDescription ? selfDescription.trim() : undefined,
        matchScore: report.matchScore,
        scoreExplanation: report.scoreExplanation,
        technicalQuestions: report.technicalQuestions,
        behavioralQuestions: report.behavioralQuestions,
        skillGap: report.skillGap,
        preparationPlan: report.preparationPlan,
    });

    return res.status(201).json({
        message: "Interview report generated successfully",
        report: savedReport,
    });
});

export const getInterviewReportByIdController = asyncHandler(async (req, res) => {
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
});

export const getAllInterviewReportsController = asyncHandler(async (req, res) => {
    const reports = await InterviewReport.find({ user: req.user.id })
        .select("jobDescription matchScore createdAt")
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: "Reports fetched successfully",
        reports,
    });
});

export const generateResumePdfController = asyncHandler(async (req, res) => {
    const { jobDescription, selfDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({
            message: "Job description is required",
        });
    }

    const hasResume = !!req.file;
    const hasSelfDescription = typeof selfDescription === "string" && selfDescription.trim().length > 0;

    if (!hasResume && !hasSelfDescription) {
        return res.status(400).json({
            message: "Either a resume or a self description is required",
        });
    }

    let resumeText = "";
    if (hasResume) {
        const pdfData = await pdfParse(req.file.buffer);
        resumeText = pdfData.text ? pdfData.text.trim() : "";

        if (!resumeText && !hasSelfDescription) {
            return res.status(400).json({
                message: "Could not extract text from the uploaded resume",
            });
        }
    }

    const pdfBuffer = await generateResumePdf({
        resume: resumeText,
        jobDescription: jobDescription.trim(),
        selfDescription: hasSelfDescription ? selfDescription.trim() : "",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=tailored-resume.pdf");
    res.send(pdfBuffer);
});