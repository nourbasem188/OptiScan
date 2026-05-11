import jwt from "jsonwebtoken";
import UserModel from "../DB/Models/user.model.js";


export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: "Token is required" });
        }

        const token = authorization.startsWith('Bearer ')
            ? authorization.slice(7)
            : authorization;

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Auth Error", error: error.message });
    }
};