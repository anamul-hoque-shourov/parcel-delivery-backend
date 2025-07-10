import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnection } from "./database/db.js";
config();

const app = express();
const port = process.env.PORT || 3000;
dbConnection();

app.listen(port, () => {
    console.log(
        `Server is running on ${port} in ${process.env.ENVIRONMENT} environment.`
    );
});
