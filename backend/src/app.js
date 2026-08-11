import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter); //getting all the authentication specific routes 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`);
})