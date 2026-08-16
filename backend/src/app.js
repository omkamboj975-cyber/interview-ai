import 'dotenv/config';
import express from 'express'
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.route.js';
import cors from 'cors';

connectDb();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`);
})