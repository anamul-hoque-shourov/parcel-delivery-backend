import { Request, Response } from "express";
import { UserService } from "@/application/services/user_services";

const userService = new UserService();

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Username, email, and password are required" });
      return;
    }

    const createdUser = await userService.createUser({
      username,
      email,
      password,
    });

    res.status(201).json(createdUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const { user, token } = await userService.loginUser(email, password);

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Invalid credentials") {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
