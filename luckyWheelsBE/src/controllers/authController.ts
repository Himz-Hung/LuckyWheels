import { Request, Response } from "express";

import { LoginDto } from "../dtos/auth/loginDto";

import { loginService } from "../services/authService";

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const body: LoginDto = req.body;

    if (
      !body.username ||
      !body.password
    ) {
      return res.status(400).json({
        message:
          "Username and password are required",
      });
    }

    const snapshot =
      await loginService(body);

    if (snapshot.empty) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    const user = snapshot.docs[0];

    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user.id,
      },
    });
  } catch (error) {
    console.log("error");

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};