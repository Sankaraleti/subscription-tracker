import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({
      $or: [
        {
          email,
        },
        { username },
      ],
    });
    console.log(userExists);
    if (userExists) {
      const error = new Error(
        "user already exists with provided username or email"
      );
      error.statusCode = 409;
      throw error;
    }
    //encrypt password and store
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create(
      [{ username, email, password: hashedPassword }],
      session
    );
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "user created successfully",
      token,
      user: {
        userName: newUsers[0].username,
        email: newUsers[0].email,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    console.log("signin");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("user not found with provided email");
      error.statusCode = 404;
      throw error;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "user signed in successfully",
      token,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
