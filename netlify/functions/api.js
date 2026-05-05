import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import serverless from "serverless-http";
import { connectDB } from "./db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const router = express.Router();

router.post("/upload/presigned-url", adminAuth, async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    if (!fileName || !fileType) {
      return res
        .status(400)
        .json({ message: "File name and type are required" });
    }

    const uniqueFileName = `${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;

    res.json({ url, publicUrl, fileName: uniqueFileName });
  } catch (err) {
    console.error("Presigned URL error:", err);
    res.status(500).json({ message: "Error generating upload URL" });
  }
});

router.post("/auth/register", async (req, res) => {
  await connectDB();
  try {
    const { name, whatsapp, password, address } = req.body;
    const existing = await User.findOne({ whatsapp });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const role = "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      whatsapp,
      password: hashedPassword,
      address,
      role,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role, whatsapp: user.whatsapp },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/auth/login", async (req, res) => {
  await connectDB();
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, whatsapp: user.whatsapp },
      JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/auth/change-password", auth, async (req, res) => {
  await connectDB();
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/products", async (req, res) => {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  await connectDB();
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/products", adminAuth, async (req, res) => {
  await connectDB();
  try {
    const data = { ...req.body };
    if (data._id === "" || data._id === null) delete data._id;
    console.log("Creating product with data:", data);
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/products/:id", adminAuth, async (req, res) => {
  await connectDB();
  try {
    const data = { ...req.body };
    delete data._id; // Ensure _id is not being updated
    const product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(product);
  } catch (err) {
    console.error("Product update error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/products/:id", adminAuth, async (req, res) => {
  await connectDB();
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/api", router);
app.use("/.netlify/functions/api", router); // Mount again for prod

// Support both local dev proxy and Netlify prod paths
export const handler = serverless(app);
