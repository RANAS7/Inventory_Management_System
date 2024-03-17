const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const multer = require("multer");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

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

    // Parse form data
    const { supplierName } = req.body;
    const products = [];

    req.body.products.forEach((product) => {
      const { productName, quantity, rate } = product;
      const image = req.files
        ? req.files.map((file) => file.filename).join(",")
        : "";

      products.push({
        supplier_id: parseInt(supplierName),
        product: productName,
        quantity: parseInt(quantity),
        price: parseFloat(rate),
        date: date,
        Image: image,
      });
    });

    // Insert each product along with supplierName and date into the database as separate rows
    const newProducts = await Promise.all(
      products.map(async (product) => {
        return prisma.products.create({
          data: product,
        });
      })
    );

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
