import mongoose from "mongoose";

const CarSchema: any = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  model: {
    type: String,
    required: [true, "Model is a required field"],
  },
  description: String,
  price: {
    type: String,
    required: [true, "Price is a required field"],
  },
  distance: String,
  fuel_type: {
    type: String,
    required: [true, "Petrol is a required field"],
  },
  photo_url: String,
  color: String,
  year: String,
  location: {
    type: String,
    required: [true, "Location is a required field"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("cars", CarSchema);
