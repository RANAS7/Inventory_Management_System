const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// DELETE request to delete a product by ID
router.delete("/delete-product/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    // Delete the product using Prisma
    const deleted = await prisma.products.delete({
      where: {
        id: productId,
      },
    });
    console.log("Successfully deleted", deleted);
    res.status(204).send(deleted); // Send a success response with status code 204 (No Content) if the deletion is successful
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response if an error occurs during deletion
  }
});

module.exports = router;
