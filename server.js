import "./src/configs/env.js";
import http from "http";
import app from "./app.js";
import dbConnection from "./src/database/db.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const startServer = async () => {
  try {
    await dbConnection();

    server.listen(port, () => {
      console.log(
        `Server running on port ${port} in ${process.env.ENVIRONMENT} environment.`
      );
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message || error}`);
    process.exit(1);
  }
};

startServer();
