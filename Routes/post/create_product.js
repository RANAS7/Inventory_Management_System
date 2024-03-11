const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/addProduct", upload.single("productImg"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const { productName, supplier_id, quantity, price } = req.body;
    const images = req.file.filename;

    const existingProduct = await prisma.products.findMany({
      where: {
        product: productName,
      },
    });

    if (existingProduct.length > 0) {
      const existedImage = existingProduct[0].Image;
      const existingProduct = existingProduct[0].product;

      const updateData = await prisma.products.update({
        where: {
          product: existingProduct,
        },
        data: {
          image: images,
        },
      });

      // Delete the old image after successfully updating
      fs.unlink(path.join("Public/Images", existedImage), (error) => {
        if (error) {
          console.log("Error deleting existed Image", error.message);
        }
      });

      res.json({
        message: "Product image updated successfully",
        result: updateData,
      });
    }

    let total = quantity * price;
    // Insert a new product record
    const newProduct = await prisma.products.createMany({
      data: {
        supplier_id: supplier_id,
        image: images,
        Product: productName,
        quantity: quantity,
        price: price,
        total: total,
      },
    });

    res.json({
      message: "New product added successfully",
      result: newProduct,
    });
  } catch (error) {
    console.error("Error inserting user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
