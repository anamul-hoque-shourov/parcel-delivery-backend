import mongoose from "mongoose";

export default async function dbConnection(): Promise<void> {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "parcel-delivery-management-system",
    });

    console.log("Connected to database");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error connecting to database: ${error.message}`);
    } else {
      console.error("Unknown error connecting to database:", error);
    }
    process.exit(1);
  }
}
