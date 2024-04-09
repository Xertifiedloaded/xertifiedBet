import cloudinary from "../../middleware/cloudinary.js";
import User from "../../models/user.model.js";
import upload from "../../middleware/multer.js";
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, firstName, lastName, picture, address } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("User not found");
    }

    if (req.file && username && firstName && lastName && address) {
      const cloudinaryImage = await cloudinary.v2.uploader.upload(req.file.path);
      user.picture = cloudinaryImage.secure_url;
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user.address = address;
    }

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
