import { NextFunction, Request, RequestHandler, Response } from "express";
import { MESSAGES } from "../constants/messages";
import { createUser } from "../services/createUser";
import { generateToken } from "../services/tokenService";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    const token = generateToken(String(user._id));
    res
      .status(201)
      .json({
        message: MESSAGES.USER_REGISTERED,
        user: { id: user._id, email: user.email },
        token,
      });
  } catch (error) {
    next(error);
  }
};
