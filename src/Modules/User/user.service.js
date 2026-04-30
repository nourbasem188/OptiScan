import UserModel from "../../DB/Models/user.model.js";


export const signUp = async (req, res) => {

    try {
        const user = req.body;
        const newUser = await UserModel.create(user)
        return res.status(201).json({
            message: "Users created successfully",
            user: newUser
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
                message: "User Does Not Exist",
                error: error.message
            })
        }
        if (user.password !== password) {
            return res.status(400).json({
                message: "Password is incorrect",
                error: error.message
            })
        }
        return res.status(200).json({
            message: "User logged in successfully",
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
