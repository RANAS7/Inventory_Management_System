const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/get-transaction", async (req, res) => {
  try {
    const cashSumResult = await prisma.sales.aggregate({
      _sum: {
        cash: true,
      },
      where: {
        cash: {
          not: null,
        },
      },
    });

    const chequeSumResult = await prisma.sales.aggregate({
      _sum: {
        cheque: true,
      },
      where: {
        cheque: {
          not: null,
        },
      },
    });

    const bankSumResult = await prisma.sales.aggregate({
      _sum: {
        bank: true,
      },
      where: {
        bank: {
          not: null,
        },
      },
    });

    // Calculate the total sum by adding the sums of cash, cheque, and bank
    const totalSum =
      (cashSumResult._sum.cash || 0) +
      (chequeSumResult._sum.cheque || 0) +
      (bankSumResult._sum.bank || 0);

    console.log(
      "Total sum of non-null amounts (cash + cheque + bank):",
      totalSum
    );

    // Send the total sum as a response
    res.json({ totalSum });
  } catch (error) {
    console.error("Error summing sales amounts:", error);
    // Send error response if there's an error
    res.status(500).json({ error: "Error summing sales amounts" });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
