import mongoose from "mongoose";

const FaqSchema: any = new mongoose.Schema({
  questions: String,
  answers: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("faqs", FaqSchema);
