const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/get-sales", async (req, res) => {
  try {
    const productsWithDetails = await prisma.products.findMany({
      select: {
        id: true,
        Product_Name: true,
        Images: true,
        sales: {
          select: {
            quantity: true,
            price: true,
            total: true,
            payment_type: true,
            customer: {
              select: {
                name: true,
                email: true,
                contact: true,
                address: true,
                contact_person: true,
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
