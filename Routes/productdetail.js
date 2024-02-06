const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/product-details", async (req, res) => {
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
    const details = await prisma.product_detail.create({
      data: {
        date: date.toISOString(),
        company: req.body.company,
        quantity: parseInt(req.body.quantity),
        price: parseFloat(req.body.price),
        product_id: parseInt(req.body.selectedProduct),
      },
    });
    res.json(details);
    console.log(details);
  } catch (error) {
    console.error("Error inserting user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
