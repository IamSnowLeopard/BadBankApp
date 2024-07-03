const router = require("express").Router();
const admin = require("firebase-admin");

// Deposit Route
router.post("/deposit", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const userRef = admin.firestore().collection("users").doc(userId);

    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userDoc.data();
    const newBalance = user.balance + amount;

    await userRef.update({
      balance: newBalance,
    });

    const transaction = {
      userId,
      type: "Deposit",
      amount,
      balanceAfterTransaction: newBalance,
      message: `Deposited $${amount}`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.firestore().collection("transactions").add(transaction);

    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (error) {
    console.error("Error processing deposit:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Withdrawal Route
router.post("/withdraw", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const userRef = admin.firestore().collection("users").doc(userId);

    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = userDoc.data();
    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newBalance = user.balance - amount;

    await userRef.update({
      balance: newBalance,
    });

    const transaction = {
      userId,
      type: "Withdrawal",
      amount,
      balanceAfterTransaction: newBalance,
      message: `Withdrew $${amount}`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await admin.firestore().collection("transactions").add(transaction);

    res.status(201).json({ message: "Withdrawal successful", transaction });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
