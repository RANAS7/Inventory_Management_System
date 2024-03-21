const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/get-sales", async (req, res) => {
  try {
    const productsWithDetails = await prisma.products.findMany({
      select: {
        id: true,
        product: true,
        image: true,
        sales: {
          select: {
            quantity: true,
            price: true,
            total: true,
            discount: true,
            payment_type: true,
            customer: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    console.log("Products with details:", productsWithDetails);

    res.json(productsWithDetails);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
