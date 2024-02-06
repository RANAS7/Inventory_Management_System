const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-vendor", async (req, res) => {
  try {
    const vendorData = await prisma.vendor.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        contact_person: req.body.contact_person,
      },
    });
    res.json(vendorData);
    console.log("vendor data successfully submitted", vendorData);
  } catch (err) {
    console.error("Error inserting vendor with Prisma", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
