import mongoose from "mongoose";

const databaseConnection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to the database");
  }
};

export default databaseConnection;