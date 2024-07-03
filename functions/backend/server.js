const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router;
