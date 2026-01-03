const Subscription = require("../models/subscription.schema");
const {
  BILLING_CYCLES,
  SUBSCRIPTION_STATUSES,
  SUBSCRIPTION_SOURCES,
} = require("../../constants/subscriptionConstants");

// POST /api/subscriptions
const createSubscription = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, amount, billingCycle, renewalDate, source } = req.body;

    // Basic validation
    if (!name || !amount || !billingCycle || !renewalDate || !source) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const subscription = await Subscription.create({
      userId,
      name,
      amount,
      billingCycle,
      renewalDate,
      source,
      status: SUBSCRIPTION_STATUSES.ACTIVE,
    });

    return res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create subscription",
    });
  }
};

// GET /api/subscriptions
const getSubscriptions = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const subscriptions = await Subscription.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch subscriptions",
    });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
};
