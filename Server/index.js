
import dotenv from "dotenv";

import databaseConnection from "./src/config/connection.js";
import app from "./app.js";

dotenv.config(); 

const PORT = process.env.PORT || 2000;
const DATABASE = process.env.DATABASE;

const server = app.listen(PORT, async () => {
  try {
    await databaseConnection(DATABASE);
    console.log(`Server is running on port http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});