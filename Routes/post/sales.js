const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-sales", async (req, res) => {
  try {
    let date;

    let total = req.body.quantity * req.body.price;

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

    const productId = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);

    // Check if product exists
    const product = await prisma.product_detail.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if there's enough quantity available
    if (product.available < quantity) {
      return res
        .status(400)
        .json({ error: "Insufficient quantity of product" });
    }

    // Update available quantity
    const updateProduct = await prisma.product_detail.update({
      where: { id: productId },
      data: {
        available: { decrement: quantity },
      },
    });

    // Create sales record
    const salesData = await prisma.sales.create({
      data: {
        date: date.toISOString(),
        company: req.body.company,
        quantity: quantity,
        price: parseFloat(req.body.price),
        product_id: productId,
        total: total,
        payment_type: req.body.payment_type,
      },
    });

    res
      .status(200)
      .json({ message: "Product sold successfully", updateProduct, salesData });
  } catch (error) {
    console.error("Error inserting sales with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

const PAYMENT = {
  ONLINE: "ONLINE",
  CASH: "CASH",
  BANK: "BANK",
};
