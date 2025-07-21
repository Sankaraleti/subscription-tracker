import User from "../models/user.model.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
