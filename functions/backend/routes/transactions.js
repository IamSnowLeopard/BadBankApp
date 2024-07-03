const router = require("express").Router();
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

// Deposit Route
router.post("/deposit", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newBalance = user.balance + amount;

    const transaction = new Transaction({
      userId,
      type: "Deposit",
      amount,
      balanceAfterTransaction: newBalance,
      message: `Deposited $${amount}`,
    });

    await transaction.save();

    user.balance = newBalance;
    await user.save();

    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Withdrawal Route
router.post("/withdraw", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newBalance = user.balance - amount;

    const transaction = new Transaction({
      userId,
      type: "Withdrawal",
      amount,
      balanceAfterTransaction: newBalance,
      message: `Withdrew $${amount}`,
    });

    await transaction.save();

    user.balance = newBalance;
    await user.save();

    res.status(201).json({ message: "Withdrawal successful", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
