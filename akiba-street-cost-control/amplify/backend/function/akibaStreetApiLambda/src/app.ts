import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import * as db from "./config/db";

import * as CategoryRoutes from "./routes/category";
import * as SalesRoutes from "./routes/sales";
import * as UploadRoutes from "./routes/upload";
import * as ProductRoutes from "./routes/product";
import * as EventRoutes from "./routes/events";

import * as dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
// declare a new express app
const app: express.Application = express();
const port: number | string = process.env.SERVER_PORT || 3000;
// const router = express.Router();

db();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
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

app.listen(port, () => {
  console.log(process.env);
  console.log("App started 2");
});

// Export the app object. When executing the application locally, this does nothing. However,
// to port it to AWS Lambda, we will create a wrapper that will load the app from this file
export default app;
