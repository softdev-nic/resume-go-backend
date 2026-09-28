import type { ErrorRequestHandler, RequestHandler } from "express";
import multer from "multer";
import { AppError } from "../utils/AppError";
import { env } from "../env";
 
export const notFound: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
 
// Express recognises error handlers by their 4 parameters, so keep _next
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
 
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "File too large (max 5 MB)" : err.message;
    res.status(400).json({ success: false, message });
    return;
  }
 
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(env.nodeEnv === "development" && { error: String(err) }),
  });
};