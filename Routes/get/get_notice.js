const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/get-notice", async (req, res) => {
  try {
    const allData = await prisma.notice.findMany();
    res.json({
      success: true,
      data: allData,
      message: "fetched notice data ",
    });
  } catch (error) {
    console.error("Error fetching all data", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all data",
      error: error.message,
    });
  }
});

module.exports = router;
