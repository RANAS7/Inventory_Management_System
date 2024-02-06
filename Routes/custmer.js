const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-customer", async (req, res) => {
  try {
    const customerData = await prisma.customer.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
      },
    });
    res.json(customerData);
    console.log("Customer data successfully submitted", customerData);
  } catch (err) {
    console.error("Error inserting customer with Prisma", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
