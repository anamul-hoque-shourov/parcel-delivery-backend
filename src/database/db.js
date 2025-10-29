import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "parcel-delivery-management-system",
    });
    console.log("Connected to database");
  } catch (error) {
    console.error(`Error connecting to database: ${error.message || error}`);
    process.exit(1);
  }
};

export default dbConnection;
