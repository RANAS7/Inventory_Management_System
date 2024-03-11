const express = require("express");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const prisma = new PrismaClient();

router.put("/update-product/:editId", async (req, res) => {
  try {
    const { editId } = req.params;
    const { Product_Name, Image, quantity, price } = req.body;

    const existingProduct = await prisma.products.findUnique({
      where: {
        id: parseInt(editId),
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product image
    if (Image && Image !== existingProduct.Images) {
      // Delete the old image after successfully updating
      fs.unlink(path.join("Public/Images", existingProduct.Images), (error) => {
        if (error) {
          console.log("Error deleting existing Image", error.message);
        }
      });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        Product_Name,
        Image,
        product_detail: {
          update: {
            quantity,
            price,
          },
        },
        // Add other fields you want to update here
      },
      include: {
        product_detail: true,
      },
    });

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
    console.log("Updatd product", updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
