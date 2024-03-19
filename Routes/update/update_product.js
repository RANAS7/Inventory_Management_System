const express = require("express");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();

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

router.put(
  "/update-product/:editId",
  upload.single("productImg"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File upload failed" });
      }

      const { editId } = req.params;
      const { product, quantity, price, date } = req.body;
      const image = req.file.filename;

      const existingProduct = await prisma.products.findMany({
        where: {
          id: parseInt(editId),
        },
      });

      if (existingProduct.length > 0) {
        const existedImage = existingProduct[0].image;

        // Update product image
        const updateData = await prisma.products.update({
          where: {
            id: editId,
          },
          data: {
            product: product,
            quantity: quantity,
            price: price,
            date: date,
            image: image,
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
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
