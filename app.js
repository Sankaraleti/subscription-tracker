import express from "express";
import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
const app = express();

app.get("/", (req, res) => {
  res.send({ body: "welcome to the  Subscription tracker api" });
});

app.use("/api/v1/auth", authRouter);
app.use("api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.listen(PORT, () => {
  console.log(`Subscription tracker listening http://localhost:${PORT}`);
});

export default app;
