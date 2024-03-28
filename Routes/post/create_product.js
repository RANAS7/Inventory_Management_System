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

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Images only!"));
    }
  },
});

router.post("/addProduct", upload.array("image"), async (req, res) => {
  try {
    let totalAmount = 0;
    // Use the current date as default if not provided in the request
    const date = req.body.date ? new Date(req.body.date) : new Date();

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "File upload failed" });
    }

    // Define productsData array to store parsed product data
    const productsData = [];

    // Parse form data for each product
    for (let i = 0; i < req.body.productName.length; i++) {
      const productName = req.body.productName[i];
      const quantity = parseInt(req.body.quantity[i]);
      const price = parseFloat(req.body.rate[i]);
      const image = req.files[i] ? req.files[i].filename : "";

      // Only add product if all required fields are present
      if (productName && !isNaN(quantity) && !isNaN(price)) {
        const product = {
          supplier_id: parseInt(req.body.supplierName),
          payment_type: req.body.payment_type,
          product: productName,
          quantity: quantity,
          price: price,
          date: date,
          image: image,
        };

        productsData.push(product);
        totalAmount += quantity * price;
      }
    }

    // Insert products into the database
    console.log("Before inserting products...");
    const newProducts = await prisma.products.createMany({
      data: productsData,
    });

    res.json({
      message: "New products added successfully",
      products: newProducts,
    });

    // Save total amount in transactions table based on payment type
    const { payment_type } = req.body;

    let payment;
    switch (payment_type) {
      case "cash":
        payment = await prisma.transactions.create({
          data: {
            cash: -totalAmount,
          },
        });
        break;
      case "cheque":
        payment = await prisma.transactions.create({
          data: { cheque: -totalAmount },
        });
      case "bank":
        payment = await prisma.transactions.create({
          data: {
            cheque: -totalAmount,
          },
        });
        break;
      default:
        return res.status(400).json({ error: "Invalid payment type" });
    }

    res.status(201).json({ message: "Expense created successfully", payment });
  } catch (error) {
    console.error("Error handling products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
