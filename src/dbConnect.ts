import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/buycar", {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    });
    console.log("connected to db!!!");
  } catch (error) {
    console.log("error connecting to db!!!");
  }
};
