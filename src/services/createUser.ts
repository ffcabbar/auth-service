import { HttpError } from "../errors/CustomError";
import User from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HttpError("Email is already in use", 400);
  }
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ email, password: hashedPassword });
  return await user.save();
};
