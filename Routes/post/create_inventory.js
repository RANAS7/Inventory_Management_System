const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/addInventory", async (req, res) => {
  try {
    // Define inventoryData array to store parsed inventory data
    const inventoryData = [];

    // Parse form data for each product
    for (let i = 0; i < req.body.productName.length; i++) {
      const productName = req.body.productName[i];
      const available = parseInt(req.body.quantity[i]);
      const price = parseFloat(req.body.rate[i]);
      const image = req.body.image[i];

      // Only add product if all required fields are present
      if (productName && !isNaN(available) && !isNaN(price)) {
        const inventory = {
          product: productName,
          available: available,
          price: price,
          image: image,
        };

        inventoryData.push(inventory);
      }
    }

    // Insert or update products in the database
    console.log("Before inserting/updating inventory...");
    const createdOrUpdatedInventory = await Promise.all(
      inventoryData.map(async (inventory) => {
        // Check if the product already exists in the inventory
        const existingInventory = await prisma.inventory.findFirst({
          where: {
            product: inventory.product,
          },
        });

        if (existingInventory) {
          // If the inventory exists, update its quantity
          return prisma.inventory.update({
            where: {
              id: existingInventory.id,
            },
            data: {
              available: {
                increment: inventory.available,
              },
            },
          });
        } else {
          // If the inventory doesn't exist, create a new entry
          return prisma.inventory.create({
            data: inventory,
          });
        }
      })
    );

    res.json({
      message: "Inventory added/updated successfully",
      inventory: createdOrUpdatedInventory,
    });
  } catch (error) {
    console.error("Error handling inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
