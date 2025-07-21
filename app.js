import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabse from "./database/mongodb.js";
import errorMiddleWare from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleWare);

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
