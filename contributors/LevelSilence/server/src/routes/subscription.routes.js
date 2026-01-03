const express = require("express");
const {
  createSubscription,
  getSubscriptions,
} = require("../controllers/subscription.controller");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/subscriptions", authMiddleware, createSubscription);
router.get("/subscriptions", authMiddleware, getSubscriptions);

module.exports = router;
