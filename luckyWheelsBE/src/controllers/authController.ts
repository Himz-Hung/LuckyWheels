import { Request, Response } from "express";

import { db } from "../config/firebase";

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message:
          "Username and password are required",
      });
    }

    const snapshot = await db
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = snapshot.docs[0];

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        ...user.data(),
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};