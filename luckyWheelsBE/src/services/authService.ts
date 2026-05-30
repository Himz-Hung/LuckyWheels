import { db } from "../config/firebase";

import { LoginDto } from "../dtos/auth/loginDto";

export const loginService = async (
  body: LoginDto
) => {
  const snapshot = await db
    .collection("users")
    .where(
      "username",
      "==",
      body.username
    )
    .where(
      "password",
      "==",
      body.password
    )
    .limit(1)
    .get();

  return snapshot;
};