import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.greenBright("✅ Connected to MongoDB successfully"));
  } catch (error) {
    console.error(
      chalk.redBright("❌ Error connecting to MongoDB:", error.message)
    );
    process.exit(1);
  }
};

export default connectToMongoDB;
