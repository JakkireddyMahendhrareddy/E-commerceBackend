import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email is already in use. Please try logging in." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({
      message: "You’ve registered successfully!",
      user: newUser,
    });
  } catch (err) {
    res
      .status(505)
      .json({ message: "Registartion Failed", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Incorrect email or password. Please try again." });

    //optional
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    res.status(200).json({ message: "You've Login successfully", token, user });
  } catch (err) {
    res.status(505).json({ message: "Login Failed", error: err.message });
  }
};
