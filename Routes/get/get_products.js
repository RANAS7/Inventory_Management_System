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
        date: true,
        image: true,
        supplier_id: true,
        quantity: true,
        price: true,
        vendor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Modify the productData to only include the date part
    const modifiedProductData = productData.map((product) => {
      // Convert date to a string in YYYY-MM-DD format
      const formattedDate = product.date.toISOString().split("T")[0];
      // Return a new object with the formatted date
      return {
        ...product,
        date: formattedDate,
      };
    });

    console.log("Products with details:", modifiedProductData);

    res.json(modifiedProductData);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
