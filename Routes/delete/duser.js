// Assuming you have already set up your Express server and Prisma
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Endpoint for handling deletion
router.delete("/delete-user", async (req, res) => {
  try {
    // Assuming you have a 'Expense' model in your Prisma schema
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res
      .status(200)
      .json({ message: "Expense deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
