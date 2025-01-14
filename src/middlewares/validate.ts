import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // or schema.parseAsync() if you need async checks
      return next();
    } catch (error) {
      return next(error);
    }
  };