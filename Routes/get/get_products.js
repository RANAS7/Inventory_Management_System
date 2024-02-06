const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/get-products", async (req, res) => {
  try {
    const allData = await prisma.products.findMany(); // Replace 'yourModel' with your actual model name
    res.json({ success: true, data: allData, message: "fetched user " });
  } catch (error) {
    console.error("Error fetching all data", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all data",
      error: error.message,
    });
    console.log(allData);
  }
});

module.exports = router;
