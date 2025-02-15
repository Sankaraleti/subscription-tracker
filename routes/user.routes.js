import { Router } from "express";
const userRouter = Router();
// /users => get's all uses
// /users/123 => get's user by id i.e users/123 322

userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "GET user details" }));
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
