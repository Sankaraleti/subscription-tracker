import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
//need to have admin authorization in order to get all subscriptions
export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      message: "fetched subscription successfully",
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      message: "fetched subscription successfully",
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription._id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });
    res.status(201).json({
      success: true,
      message: "subscription created successfully",
      data: { subscription, workflowRunId },
    });
  } catch (err) {
    next(err);
  }
};
