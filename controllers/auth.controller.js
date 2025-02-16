import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
export const signUp = async (req, res, next) => {
  //session for mongoose tranasaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //logic to create a new user
    const { name, email, password } = req.body;

    //check if a use exists
    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters long");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    // hash the password (securing it)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    //generating token
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    //don't do anything just abort the complete transaction
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401; //unauthorized
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
// export const signOut = (req, res, next) => {};
