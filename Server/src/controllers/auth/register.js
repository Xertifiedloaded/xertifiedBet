import { v4 as uuidv4 } from 'uuid'; 
import hashedPassword from "../../helper/hashedpassword.js";
import ReferralCode from "../../helper/referralCode.js";
import { errorResMsg, successResMsg } from "../../helper/response.js";
import User from "../../models/user.model.js";

const register = async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;
    if (!username || !email || !password) {
      return errorResMsg(res, 400, "Please provide both email and password");
    }
    if (!password || password.length < 5) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return errorResMsg(res, 400, "Email already exists");
    }

    let referredBy = null;
    if (referralCode) {
      const referringUser = await User.findOne({ referralCode });
      if (referringUser) {
        referredBy = referringUser.username; 
      }
    }

    const generatedReferralCode = ReferralCode();
    const hashPassword = await hashedPassword(password);
    const userId = uuidv4();

    const user = await User.create({
      userId,
      username,
      email,
      password: hashPassword,
      referralCode: generatedReferralCode,
      referredBy,
    });

    if (referredBy) {
      await User.updateOne({ username: referredBy }, { $push: { referredUsers: user._id } });
    }

    return successResMsg(res, 201, {
      message: "User signup successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return errorResMsg(res, 500, "Internal server error");
  }
};

export default register;