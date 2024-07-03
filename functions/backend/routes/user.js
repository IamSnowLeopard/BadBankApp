const router = require("express").Router();
const admin = require("firebase-admin");

// Get User Data Route
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userRef = admin.firestore().collection("users").doc(userId);

    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userDoc.data();
    const transactionsRef = admin
      .firestore()
      .collection("transactions")
      .where("userId", "==", userId);
    const transactionsSnapshot = await transactionsRef.get();
    const transactions = transactionsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ ...user, transactions });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
