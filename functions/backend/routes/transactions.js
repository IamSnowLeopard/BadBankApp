const router = require("express").Router();
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

// Deposit Route
router.post("/deposit", auth, async (req, res) => {
  try {
    const { userId, amount } = req.body;
    console.log(
      "Deposit request received for user:",
      userId,
      "Amount:",
      amount
    );

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return res.status(400).json({ message: "User not found" });
    }

    const newBalance = user.balance + amount;
    console.log("New balance calculated:", newBalance);

    const transaction = new Transaction({
      userId,
      type: "Deposit",
      amount,
      balanceAfterTransaction: newBalance,
      message: `Deposited $${amount}`,
    });

    await transaction.save();
    console.log("Transaction saved:", transaction);

    user.balance = newBalance;
    await user.save();
    console.log("User balance updated:", user);

    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (error) {
    console.error("Server error during deposit:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Withdrawal Route
router.post("/withdraw", auth, async (req, res) => {
  try {
    const { userId, amount } = req.body;
    console.log(
      "Withdrawal request received for user:",
      userId,
      "Amount:",
      amount
    );

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return res.status(400).json({ message: "User not found" });
    }

    if (user.balance < amount) {
      console.log("Insufficient funds for user:", userId);
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newBalance = user.balance - amount;
    console.log("New balance calculated:", newBalance);

    const transaction = new Transaction({
      userId,
      type: "Withdrawal",
      amount,
      balanceAfterTransaction: newBalance,
      message: `Withdrew $${amount}`,
    });

    await transaction.save();
    console.log("Transaction saved:", transaction);

    user.balance = newBalance;
    await user.save();
    console.log("User balance updated:", user);

    res.status(201).json({ message: "Withdrawal successful", transaction });
  } catch (error) {
    console.error("Server error during withdrawal:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
