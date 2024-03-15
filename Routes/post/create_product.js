const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const multer = require("multer");
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "_" + path.extname(file.originalname)); // Use the original filename
  },
});

const upload = multer({ storage: storage });

router.post("/addProduct", upload.single("images"), async (req, res) => {
  try {
    let date;

    if (req.body.date) {
      // If date is provided in the request, use it
      date = new Date(req.body.date);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
    } else {
      // If date is not provided, use the current date as the default
      date = new Date();
    }
    // Check if files were uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }

    // Parse form data
    const { productName, selectedSupplier, quantity, total, price } = req.body;
    const images = req.file.filename
      ? req.files.map((file) => file.filename).join(",")
      : "";

    const newProduct = await prisma.products.create({
      data: {
        supplier_id: parseInt(selectedSupplier),
        product: productName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        date: date,
        image: images,
        total: parseFloat(total), // Assuming 'images' is a field in your products table
      },
    });
    res.json({
      message: "New product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error handling product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
