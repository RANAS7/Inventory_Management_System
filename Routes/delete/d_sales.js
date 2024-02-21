// Assuming you have already set up your Express server and Prisma
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Endpoint for handling deletion
router.delete("/delete-sales/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSales = await prisma.sales.delete({
      where: {
        id: parseInt(id),
      },
    });
    console.log("Sales successfully deleted");
    res
      .status(200)
      .json({ message: "Sales deleted successfully", deletedSales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
