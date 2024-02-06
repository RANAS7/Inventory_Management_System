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

    // images file upload should not be saved to db
    // fileName,media-table

    // MEDIA - prdoduct,category,

    const productName = req.body.productName;
    const images = req.file.filename;

    // Using Prisma to check for an existing product
    const existingProduct = await prisma.products.findMany({
      where: {
        Product_Name: productName,
      },
    });

    if (existingProduct.length > 0) {
      const existedImage = existingProduct[0].Images;
      const existingProductId = existingProduct[0].id;

      // Update product image
      const updateData = await prisma.products.update({
        where: {
          id: existingProductId,
        },
        data: {
          Images: images,
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
    } else {
      // Insert a new product record
      const newProduct = await prisma.products.create({
        data: {
          Product_Name: productName,
          Images: images,
        },
      });

      res.json({
        message: "New product added successfully",
        result: newProduct,
      });
    }
  } catch (error) {
    console.error("Error inserting user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
