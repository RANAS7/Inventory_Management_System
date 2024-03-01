const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.put("/update-exp/:editId", async (req, res) => {
  const { editId } = req.params;
  const { exp_type } = req.body;
  try {
    if (exp_type === "daily-exp") {
      const { date, created_by, amount, payment_type, detail } = req.body;
      const updatedExp = await prisma.daily_exp.update({
        where: { id: parseInt(editId) },
        data: {
          date: date,
          created_by: created_by,
          amount: amount,
          payment_type: payment_type,
          detail: detail,
        },
      });

      res
        .status(200)
        .json({ message: "Daily Exp updated successfully", updatedExp });
      console.log("Daily Exp updated successfully");
    } else {
      const { date, created_by, amount, payment_type, detail } = req.body;
      const updatedExp = await prisma.miscellaneous.update({
        where: {
          id: parseInt(id),
        },
        data: {
          date: date,
          created_by: created_by,
          amount: amount,
          payment_type: payment_type,
          detail: detail,
        },
      });
      res
        .status(200)
        .json({ message: "Miscellaneous updated successfully", updatedExp });
      console.log("Miscellaneous updated successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
