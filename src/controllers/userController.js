import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
