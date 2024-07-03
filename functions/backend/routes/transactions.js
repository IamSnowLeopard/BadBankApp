const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction.model");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure you have this middleware

// Get user transactions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
