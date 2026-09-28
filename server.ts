
import app from "./app";
import { env } from "./env";
 
const server = app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port} (${env.nodeEnv})`);
});
 
server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${env.port} is already in use`);
  } else {
    console.error(err);
  }
  process.exit(1);
});