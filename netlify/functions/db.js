import mongoose from "mongoose";

let conn = null;

export const connectDB = async () => {
  if (conn == null) {
    conn = mongoose
      .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/arboush", {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose);

    await conn;
  }
  return conn;
};
