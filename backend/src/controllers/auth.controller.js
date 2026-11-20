import User from "../models/user.model.js";
import blackListToken from "../models/blacklist.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from "../utils/asyncHandler.js";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
};

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password",
        });
    }

    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters",
        });
    }

    const isUserAlreadyExists = await User.findOne({ $or: [{ name }, { email }] });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email or username",
        });
    }

    const newUser = new User({ name, email, password });
    await newUser.validate();

    const hash = await bcrypt.hash(password, 10);
    newUser.password = hash;
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }
    });
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
});

export const logoutUserController = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        await blackListToken.create({ token });
    }
    res.clearCookie("token", clearCookieOptions);
    res.status(200).json({
        message: "User logout successfully",
    });
});

export const getMeController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
});