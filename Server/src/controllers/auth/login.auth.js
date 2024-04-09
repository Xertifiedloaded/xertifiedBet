import comparePassword from "../../helper/comparepassword.js";
import User from "../../models/user.model.js";
import jwt from 'jsonwebtoken';

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return errorResMsg(res, 400, "User not found");
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if (isPasswordMatch) {
            const token = jwt.sign(
                { email: user.email, userId: user.userId, name: user.username }, // Include userId in the payload
                process.env.JWT_SECRET
            );
            user.token = token;
            res.cookie("token", token, { httpOnly: true });

            // show all the user reffered by his/her code
            const referredUsers = await User.find({ referredBy: user.username }, 'username email');

            res.json({ message: "Login successful", user, referredUsers });
        } else {
            return errorResMsg(res, 401, "Invalid");
        }
    } catch (error) {
        console.log(error);
        return errorResMsg(res, 500, "Internal Server Error");
    }
};

export default loginUsers;