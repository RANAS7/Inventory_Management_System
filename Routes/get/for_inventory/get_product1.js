const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.use("/images", express.static("./public/images/"));

router.get("/get-products", async (req, res) => {
  try {
    const productData = await prisma.products.findMany({
      orderBy: {
        date: "desc", // Assuming 'date' is the field you want to order by
      },
      select: {
        id: true,
        product: true,
        image: true,
        supplier_id: true,
        quantity: true,
        price: true,
      },
    });

    console.log("Products with details:", productData);

    res.json(productData);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
