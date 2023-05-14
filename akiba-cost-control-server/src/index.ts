import express from "express";
import bodyParser from "body-parser";
import db from "./config/db";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import cors from "cors";
import CategoryRoutes from "./routes/category";
import SalesRoutes from "./routes/sales";
import UploadRoutes from "./routes/upload";
import ProductRoutes from "./routes/product";
import EventRoutes from "./routes/events";

const app: express.Application = express();
const port: number | string = process.env.SERVER_PORT || 8000;
const router = express.Router();

db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors({ origin: true }));

app.use("/category", CategoryRoutes);
app.use("/sales", SalesRoutes);
app.use("/upload", UploadRoutes);
app.use("/product", ProductRoutes);
app.use("/event", EventRoutes);

app.listen(port);
