import { Router } from "express";
import {
  getAllSubscriptions,
  getUserSubscriptions,
  createSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);
subscriptionRouter.get("/:id", authorize, getUserSubscriptions);
subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/", (req, res) =>
  res.send({ title: "UPDATE subscription" })
);
subscriptionRouter.delete("/", (req, res) =>
  res.send({ title: "DELETE subscription" })
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL subscription" })
);
subscriptionRouter.put("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming subscription" })
);
export default subscriptionRouter;
