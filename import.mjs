import "dotenv/config";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    imageUrl: { type: String },
    image: { type: String },
    images: [{ type: String }],
    details: { type: String },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

const rawProducts = [
  {
    _id: "69d7c58cc0f66cc92e3e887e",
    user: "69d3edfb200be665d1b7e311",
    name: "معطر رش 300مل",
    price: 0,
    quantity: 12,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776863303492-8D83B5D2-7E15-487B-90D6-D057EFEFD237.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776863303492-8D83B5D2-7E15-487B-90D6-D057EFEFD237.webp",
    ],
  },
  {
    _id: "69d4a6292da0b86d4e8fc56f",
    user: "69d3edfb200be665d1b7e311",
    name: "Stp 18",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543799218-75DED1CC-8C42-47F9-93E7-75329B13ECB4.webp",
    price: 0,
    quantity: 4,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d5257165f1aa3bfddb4640",
    user: "69d3edfb200be665d1b7e311",
    name: "كرتون اوضيات",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775623587705-image.webp",
    price: 0,
    quantity: 13,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d57123f91ba7ac6e59fd2c",
    user: "69d3edfb200be665d1b7e311",
    name: "حاوية نفايات 60 L",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775623626642-image.webp",
    price: 0,
    quantity: 7,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d4a66e2da0b86d4e8fc579",
    user: "69d3edfb200be665d1b7e311",
    name: "حماية ارضيه 3w",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543863694-IMG_1715.webp",
    price: 0,
    quantity: 1,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d4a5772da0b86d4e8fc553",
    user: "69d3edfb200be665d1b7e311",
    name: "صابون غسيل سيارات",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543621585-b6df60d2-de0e-4ad5-8e30-e8c093a48107.webp",
    price: 0,
    quantity: 15,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543621585-b6df60d2-de0e-4ad5-8e30-e8c093a48107.webp",
    ],
  },
  {
    _id: "69e3e2011bc96bd14e97cbea",
    user: "69d3edfb200be665d1b7e311",
    name: "قنبلة ريحة H T",
    price: 0,
    quantity: 3,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "مزيل روائح استخدام مره واحده يدوم لاسابيع",
    image: "",
    images: [],
  },
  {
    _id: "69d74ff4f160dd0edc35f21d",
    user: "69d3edfb200be665d1b7e311",
    name: "فرش سياره ممتاز ( شباح)",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775718359934-IMG_1729.webp",
    price: 350,
    quantity: 300,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d74fbef160dd0edc35f213",
    user: "69d3edfb200be665d1b7e311",
    name: "قشاطة ماء",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775718313432-IMG_1651.webp",
    price: 25,
    quantity: 20,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d7c5a9c0f66cc92e3e8899",
    user: "69d3edfb200be665d1b7e311",
    name: "كرتون ساده",
    price: 0,
    quantity: 45,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d7c5a1c0f66cc92e3e8890",
    user: "69d3edfb200be665d1b7e311",
    name: "سكاي شفاف 3 لتر",
    price: 0,
    quantity: 6,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d7c597c0f66cc92e3e8887",
    user: "69d3edfb200be665d1b7e311",
    name: "كرتون مجلتن",
    price: 0,
    quantity: 26,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d8e3ed8a7f04c2b95dce26",
    user: "69d3edfb200be665d1b7e311",
    name: "كرت ريحه اصلي / تقليد",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775821777207-043BED9A-5C13-4648-A348-604BF923969B.webp",
    price: 0,
    quantity: 100,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d4a6fa937ecfbca0821203",
    user: "69d3edfb200be665d1b7e311",
    name: "مزيل دهون C7",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543992536-23A97722-05B9-44D6-A9E0-F2898E24F827.webp",
    price: 0,
    quantity: 20,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    images: [],
  },
  {
    _id: "69d7be57a548cf5d13257fef",
    user: "69d3edfb200be665d1b7e311",
    name: "معطر ليو 500 Ml",
    price: 0,
    quantity: 5,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776189117493-0be02e99-3249-4d6f-8cc3-7a16c522446e.webp",
    description: "",
    images: [],
  },
  {
    _id: "69d4a5ec2da0b86d4e8fc565",
    user: "69d3edfb200be665d1b7e311",
    name: "ماء مساحات ٤ لتر",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543738519-855DED0B-96FF-4A92-9063-ADEFD4A5DD1B.webp",
    price: 0,
    quantity: 50,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775543738519-855DED0B-96FF-4A92-9063-ADEFD4A5DD1B.webp",
    ],
  },
  {
    _id: "69e67b225a4819f19246e617",
    user: "69d3edfb200be665d1b7e311",
    name: "ريحة عيدان ديموند",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712457642-IMG_2306.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712457642-IMG_2306.webp",
    ],
    price: 0,
    quantity: 8,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
  },
  {
    _id: "69e67afb5a4819f19246e60a",
    user: "69d3edfb200be665d1b7e311",
    name: "ريحة تعليق",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712415641-IMG_2314.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712415641-IMG_2314.webp",
    ],
    price: 0,
    quantity: 35,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
  },
  {
    _id: "69e67aa85a4819f19246e5fb",
    user: "69d3edfb200be665d1b7e311",
    name: "علاقة مفتاح شنكل",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712320134-IMG_2020.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712320134-IMG_2020.webp",
    ],
    price: 0,
    quantity: 20,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
  },
  {
    _id: "69e67a585a4819f19246e5e4",
    user: "69d3edfb200be665d1b7e311",
    name: "ريحة تونه بدون غطى",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712252251-IMG_2298.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776712252251-IMG_2298.webp",
    ],
    price: 0,
    quantity: 30,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
  },
  {
    _id: "69e5cd95bba8ef97212568d9",
    user: "69d3edfb200be665d1b7e311",
    name: "فرش حمايه باديستا",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776668067197-8695fe76-8f85-4fdb-b377-4dfe52b1a58e.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776668067197-8695fe76-8f85-4fdb-b377-4dfe52b1a58e.webp",
    ],
    price: 0,
    quantity: 1,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "7 قطع كرسين / ستيرنج/غمازات / جير متوفر الوان",
  },
  {
    _id: "69d74c680db41183c8f035d8",
    user: "69d3edfb200be665d1b7e311",
    name: "حمالة هاتف صغيره",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1775717453495-IMG_1648.webp",
    price: 15,
    quantity: 20,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "",
    images: [],
  },
  {
    _id: "69e3eebcec9606ad463d6968",
    user: "69d3edfb200be665d1b7e311",
    name: "سبري تابلو ملمع",
    price: 0,
    quantity: 1,
    country: "Palestine",
    target: "cars",
    status: "hidden",
    description: "ملمع ومعطر تابلو",
    image:
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776667741947-IMG_2069.webp",
    images: [
      "https://pub-4167c846ee5243129b3203e5950ac764.r2.dev/1776667741947-IMG_2069.webp",
    ],
  },
];

async function run() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/arboush",
    {
      serverSelectionTimeoutMS: 5000,
    },
  );

  for (const p of rawProducts) {
    const doc = {
      name: p.name,
      description: p.description || "",
      image: p.image || p.imageUrl || "",
      images: p.images || [],
    };
    await Product.create(doc);
    console.log(`Inserted ${p.name}`);
  }

  console.log("Done");
  process.exit(0);
}

run().catch(console.error);
