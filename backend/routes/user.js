const router = require("express").Router();
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const auth = require("../middleware/auth");

// Get User Data (balance and transactions)
router.get("/:userId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transactions = await Transaction.find({ userId: user._id });

    res.json({
      balance: user.balance,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
