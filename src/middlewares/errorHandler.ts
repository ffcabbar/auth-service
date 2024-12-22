import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger";
import { MESSAGES } from "../constants/messages";
import { HttpError } from "../errors/CustomError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    logger.error(`Zod validation error: ${JSON.stringify(err.errors)}`);
    res.status(400).json({
      errors: err.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
    return;
  }
  // Handle HttpError
  if (err instanceof HttpError) {
    logger.error(`${err.message} - Status ${err.statusCode}`);
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Handle other errors
  logger.error(err.stack);
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || MESSAGES.UNKNOWN_ERROR,
  });
  return;
};
