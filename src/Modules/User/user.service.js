import UserModel from "../../DB/Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {

    try {
        const { name, email, phone, age } = req.body;
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const newUser = await UserModel.create({ name, email, phone, age, password: hashedPassword })
        return res.status(201).json({
            message: "Users created successfully",
            user: newUser._id
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create user",
            error: error.message
        })
    }

}

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User Does Not Exist"
            })
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET || "OptiScan_Secret_Key_2026", 
            { expiresIn: '3h' }
        );
        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            data:
            {
                name: user.name,
                email: user.email,
                phone: user.phone,
                age: user.age
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to login",
            error: error.message
        })
    }
}
