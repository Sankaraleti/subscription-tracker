import express from "express";
import { PORT } from "./config/env.js";
const app = express();

app.get("/", (req, res) => {
  res.send({ body: "welcome to the  Subscription tracker api" });
});

app.listen(3000, () => {
  console.log(`Subscription tracker listening http://localhost:${PORT}`);
});

export default app;
