import express from "express";
import path from "path";
import dotenv from "dotenv";
import color from "colors";
import morgan from "morgan";

import cron from "node-cron";

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import menuRoutes from "./routes/MenuRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import User from "./models/userModel.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.get(`/`, (req, res) => {
  res.send(`Hello Express`);
});

// schedule
cron.schedule("* * * * *", async () => {
  console.log("running a task every minute");
  const queryObject = { isDeleted: true };
  await User.deleteMany(queryObject);
});

// app.use(express.static('public'));


app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/colors", colorRoutes);
app.use(`/api/models`, modelRoutes);
app.use(`/api/products`, productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/menus", menuRoutes);
app.use(`/api/suppliers`, supplierRoutes);
app.use(`/api/purchases`, purchaseRoutes);
// app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "/public")));

//customer-error
app.use(notFound);
app.use(errorHandler);

// listen on port 5000
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
