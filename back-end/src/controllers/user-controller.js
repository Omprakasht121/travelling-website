
import { loginUser, registerUser } from "../services/user-service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const login = async (request, response) => {
    const userInfo = request.body;

    try {
        const user = await loginUser(userInfo);
        if (!user) {
            return response.status(401).json({ 
                message: "Invalid email or password" 
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return response.json({
            message: "user logged in",
            token,               // 🔥 MUST RETURN THIS
            id: user._id,
            email: user.email,
            name:user.name
        });

    } catch (err) {
        response.status(500).json({ 
            message: "Something went wrong during login",
            error: err
        });
    }
};

export const register = async (request, response) => {
    try {
        const user = await registerUser(request.body);
        return response.json({
            message: "user registered",
            id: user._id
        });

    } catch (err) {
        response.status(500).json({
            message: "Something went wrong during register",
            error: err
        });
    }
};
