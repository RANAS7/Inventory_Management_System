const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/addSales", async (req, res) => {
  try {
    let totalAmount = 0;
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

    // Define salesData array to store parsed sales data
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
      if (inventory_id && !isNaN(quantity) && !isNaN(price)) {
        const product = {
          customer_id: parseInt(req.body.selectedCustomer),
          inventory_id: parseInt(inventory_id),
          payment_type: req.body.payment_type,
          quantity: quantity,
          price: price,
          date: date,
          discount: discount,
          total: total,
          paymentType: paymentType,
        };

        salesData.push(product);
        totalAmount += quantity * price;
      }
    }

    // Insert sales into the database
    const newSales = await prisma.sales.createMany({
      data: salesData,
    });

    // Update inventory for each sold product
    for (const sale of salesData) {
      const { inventory_id, quantity } = sale;

      await prisma.inventory.update({
        where: { id: inventory_id },
        data: {
          available: {
            decrement: quantity,
          },
        },
      });
    }

    res.json({
      message: "New sales added successfully",
      sales: newSales,
    });

    const { payment_type } = req.body;

    let payment;
    switch (payment_type) {
      case "cash":
        payment = await prisma.transactions.create({
          data: {
            cash: totalAmount,
          },
        });
        break;
      case "cheque":
        payment = await prisma.transactions.create({
          data: { cheque: totalAmount },
        });
      case "bank":
        payment = await prisma.transactions.create({
          data: {
            cheque: totalAmount,
          },
        });
        break;
      default:
        return res.status(400).json({ error: "Invalid payment type" });
    }

    res.status(201).json({ message: "Expense created successfully", payment });
  } catch (error) {
    console.error("Error handling sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
