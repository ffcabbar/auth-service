import { NextFunction, Request, RequestHandler, Response } from "express";
import { MESSAGES } from "../constants/messages";
import { createUser } from "../services/createUser";
import { generateToken } from "../services/tokenService";
import { findUserByEmail } from "../services/findUserByEmail";
import { HttpError } from "../errors/CustomError";
import bcrypt from "bcrypt";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    const token = generateToken(String(user._id));
    res.status(201).json({
      message: MESSAGES.USER_REGISTERED,
      user: { id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new HttpError(MESSAGES.INVALID_CREDENTIALS, 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpError(MESSAGES.INVALID_CREDENTIALS, 401);
    }
    const token = generateToken(String(user._id));
    res.status(200).json({
      message: MESSAGES.USER_LOGGED_IN,
      user: { id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    next(error);
  }
};
