import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/file.middleware.js';
import {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
} from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

interviewRouter.post('/generate', authUser, upload.single("resume"), generateInterviewReportController);
interviewRouter.get('/history', authUser, getAllInterviewReportsController);
interviewRouter.get('/:id', authUser, getInterviewReportByIdController);

export default interviewRouter;