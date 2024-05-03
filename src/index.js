import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import mongoose from "mongoose";
import { router } from "./routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use("/", router);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

export default server;
