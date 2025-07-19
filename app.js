import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabse from "./database/mongodb.js";
const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("welcome to subscription tracker");
});

const startServer = async () => {
  try {
    await connectToDatabse();
    app.listen(PORT, async () => {
      console.log(
        `Subscription Tracker API is running on http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log("Error starting server", err);
  }
};
startServer();
export default app;
