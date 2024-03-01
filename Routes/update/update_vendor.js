const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.put("/update-vendor/:editId", async (req, res) => {
  try {
    const { editId } = req.params;
    const { name, email, contact, contact_person, address } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(editId) },
      data: {
        name: name,
        email: email,
        contact: contact,
        contact_person: contact_person,
        address: address,
      },
    });

    res.status(200).json({ message: "User updated successfully", updatedUser });
    console.log("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
