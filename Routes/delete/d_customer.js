// Assuming you have already set up your Express server and Prisma
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Endpoint for handling deletion
router.delete("/delete-customer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log("Customer successfully deleted");
    res
      .status(200)
      .json({ message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
