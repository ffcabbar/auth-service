import { Response } from "express";
import logger from "./logger";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  logger.error(`Status: ${statusCode}, Message: ${message}`);
  res.status(statusCode).json({ error: message });
};
