import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    details: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
