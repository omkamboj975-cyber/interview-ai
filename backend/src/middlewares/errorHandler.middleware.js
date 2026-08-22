import ApiError from '../utils/apiError.js';

export const notFoundHandler = (req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    // Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((e) => e.message).join(", ");
    }

    // Mongoose duplicate key error (e.g. duplicate email)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }

    // Invalid MongoDB ObjectId format (e.g. malformed :id param)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}`;
    }

    // Zod validation errors (from your AI response validation)
    if (err.name === "ZodError") {
        statusCode = 500;
        message = "AI response did not match the expected format";
    }

    // Multer file upload errors
    if (err.name === "MulterError") {
        statusCode = 400;
        message = err.message;
    }

    console.error(err);

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};