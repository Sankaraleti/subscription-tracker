import express from "express";
import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middileware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.get("/", (req, res) => {
  res.send({ body: "welcome to the  Subscription tracker api" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);
async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Subscription tracker listening on http://localhost:${PORT}`);
  });
}

startServer();

export default app;
