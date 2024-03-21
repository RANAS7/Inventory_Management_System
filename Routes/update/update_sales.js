const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.put("/update-sales/:editId", async (req, res) => {
  try {
    const { editId } = req.params;
    const { quantity, price, date, discount, total, paymentType } = req.body;

    const updateData = await prisma.sales.update({
      where: {
        id: parseInt(editId), // Assuming id is of type integer, convert it to the appropriate type
      },
      data: {
        quantity: quantity,
        price: price,
        date: date,
        discount: discount,
        total: total,
        paymentType: paymentType,
      },
    });

    res.json({
      message: "Product updated successfully",
      result: updateData,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
