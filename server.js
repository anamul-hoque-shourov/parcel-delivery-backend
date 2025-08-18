import "./src/configs/env.js";
import http from "node:http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app.js";
import dbConnection from "./src/database/db.js";

const port = process.env.PORT || 3000;

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Attach io to app so routes/controllers can use it
app.set("io", io);

// Socket.IO events
io.on("connection", (socket) => {
  socket.on("joinParcelRoom", (parcelId) => {
    socket.join(`parcel_${parcelId}`);
  });

  socket.on("leaveParcelRoom", (parcelId) => {
    socket.leave(`parcel_${parcelId}`);
  });
});

// Start server
const startServer = async () => {
  try {
    await dbConnection();
    server.listen(port, () => {
      console.log(
        `Server is running on port ${port} in ${process.env.ENVIRONMENT} environment.`
      );
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
