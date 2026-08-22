import jwt from 'jsonwebtoken';
import blackListToken from '../models/blacklist.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const authUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided",
        });
    }

    const isTokenBlackListed = await blackListToken.findOne({ token });
    if (isTokenBlackListed) {
        return res.status(401).json({
            message: "Token is invalid.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
});