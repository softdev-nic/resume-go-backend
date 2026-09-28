import express from "express";
import cors from "cors";
import { env } from "./env";
// import resumeRoutes from "./routes/resume.routes";
import { errorHandler, notFound } from "./middleware/errorHandler";
 
const app = express();
 
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
 
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
 
// app.use("/api/resume", resumeRoutes);
 
app.use(notFound);
app.use(errorHandler);
 
export default app;
 