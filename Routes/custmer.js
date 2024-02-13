const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-customer", async (req, res) => {
  try {
    // Validate incoming data
    const { customer, email, phone, address, contactPerson } = req.body;
    if (!customer || !email || !phone || !address || !contactPerson) {
      return res.status(400).json({ error: "Incomplete data provided" });
    }

    // Create a new customer
    const customerData = await prisma.customer.create({
      data: {
        customer_name: customer,
        email: email,
        phone: phone,
        address: address,
        contact_person: contactPerson,
      },
    });

    // Send a JSON response with the created customer data
    res.status(201).json(customerData);
    console.log("Customer data successfully submitted", customerData);
  } catch (err) {
    // Log detailed error information for debugging
    console.error("Error inserting customer with Prisma", err);

    // Send a 500 Internal Server Error response with a generic error message
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the Prisma client to avoid resource leaks
    await prisma.$disconnect();
  }
});

module.exports = router;
