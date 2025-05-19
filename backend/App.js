import express from "express";
import dotenv from "dotenv";
import dataConnection from "./Connection/dataConnection.js";
import userRoutes from "./Routes/userRoutes.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
const app = express();
dotenv.config();

const port = process.env.port;

app.use(cors());
app.use(express.json());

dataConnection();
app.use(fileUpload());
const __dirName = fileURLToPath(import.meta.url);
console.log(__dirName, "dir name");
const __filename = path.dirname(__dirName);
console.log(__filename, "filename");
app.use("/image", express.static(path.join(__filename, "public/image")));

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
