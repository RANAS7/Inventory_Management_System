const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-vendor", async (req, res) => {
  try {
    const vendorData = await prisma.vendor.create({
      data: {
        name: req.body.supplier,
        email: req.body.email,
        contact: req.body.phone,
        contact_person: req.body.contactPerson,
        address: req.body.address,
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
