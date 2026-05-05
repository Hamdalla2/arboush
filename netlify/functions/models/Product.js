import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    imageUrl: { type: String },
    image: { type: String },
    images: [String],
    details: { type: String },
    type: { type: String },
    barcode: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
