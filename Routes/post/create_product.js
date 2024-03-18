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
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Adjusting multer upload fields for the form
const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Images only!"));
    }
  },
});

router.post("/addProduct", upload.array("image"), async (req, res) => {
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
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "File upload failed" });
    }

    // Ensure products data is provided and is an array
    const { products } = req.body;
    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Products must be an array" });
    }

    // Parse form data
    const { supplierName } = req.body;
    const productsData = products.map((product) => ({
      supplier_id: parseInt(supplierName),
      product: product.productName,
      quantity: parseInt(product.quantity),
      price: parseFloat(product.rate),
      date: date,
      Image: req.files.map((file) => file.filename).join(","),
    }));

    // Insert products into database
    const newProducts = await prisma.products.createMany({
      data: productsData,
    });

    res.json({
      message: "New products added successfully",
      products: newProducts,
    });
  } catch (error) {
    console.error("Error handling products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
