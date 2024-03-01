// Assuming you have already set up your Express server and Prisma
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Endpoint for handling deletion
router.delete("/delete-exp/:id", async (req, res) => {
  const { id } = req.params;
  const { exp_type } = req.body;
  try {
    if (exp_type === "daily-exp") {
      const deletedExp = await prisma.daily_exp.delete({
        where: {
          id: parseInt(id),
        },
      });
      console.log("Daily Expencess successfully deleted");
      res
        .status(200)
        .json({ message: "Daily Expencess deleted successfully", deletedExp });
    } else {
      const deleteExp = await prisma.miscellaneous.delete({
        where: {
          id: parseInt(id),
        },
      });
      console.log("Miscellaneous deleted successfully");
      res
        .status(200)
        .json({ message: "Miscellaneous deleted successfully", deleteExp });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
