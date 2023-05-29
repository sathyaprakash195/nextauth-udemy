import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error", err);
    });
  } catch (error: any) {
    console.log(error);
  }
}
