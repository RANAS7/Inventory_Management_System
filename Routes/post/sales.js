const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/addSales", async (req, res) => {
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

    // Define productsData array to store parsed product data
    const salesData = [];

    // Parse form data for each product
    for (let i = 0; i < req.body.productName.length; i++) {
      const inventory_id = req.body.selectedProduct[i];
      const quantity = parseInt(req.body.quantity[i]);
      const price = parseFloat(req.body.rate[i]);
      const discount = parseFloat(req.body.discount[i]);
      const total = parseInt(req.body.total[i]);
      const paymentType = req.body.paymentType[i];

      // Only add product if all required fields are present
      if (productName && !isNaN(quantity) && !isNaN(price)) {
        const product = {
          customer_id: parseInt(req.body.selectedCustomer),
          inventory_id: parseInt(inventory_id),
          quantity: quantity,
          price: price,
          date: date,
          discount: discount,
          total: total,
          paymentType: paymentType,
        };

        salesData.push(product);
      }
    }

    // Insert products into the database
    const newProducts = await prisma.products.createMany({
      data: salesData,
    });

    res.json({
      message: "New sales added successfully",
      products: newProducts,
    });

    await prisma.inventory.findmany({
      where: { id: pr },
    });
  } catch (error) {
    console.error("Error handling products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
