const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Serve static images from the public directory
router.use("/images", express.static("./public/images/"));

// Get products with optional custom date filter
router.get("/get-products", async (req, res) => {
  try {
    let date;

    // Check if the user has provided a custom date
    if (req.query.date) {
      date = new Date(req.query.date);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      date = date.toISOString().split("T")[0]; // Get only the date part
    } else {
      // If no custom date is provided, use today's date
      date = new Date().toISOString().split("T")[0]; // Get only the date part
    }

    // Query product data with an optional date filter
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
  }
});

module.exports = router;
