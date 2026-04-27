import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsapp: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// Since Netlify functions might reload and cause schema re-registration errors:
export default mongoose.models.User || mongoose.model("User", userSchema);
