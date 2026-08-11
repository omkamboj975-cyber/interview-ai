import User from "../models/user.model.js";
import blackListToken from "../models/blacklist.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password",
        });
    }

    const isUserAlreadyExists = await User.findOne({ $or: [{ name }, { email }] });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email or username",
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hash,
    });

    const token = jwt.sign({ id: newUser._id, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }
    });
};

export const loginUserController = async (req, res) => {
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

    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
};

export const logoutUserController = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        await blackListToken.create({ token });
    }
    res.clearCookie("token");
    res.status(200).json({
        message: "User logout successfully",
    });
};

export const getMeController = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
};