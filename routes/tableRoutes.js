import express from "express";
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  fetchTables,
} from "../controllers/tableController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTables).post(protect, createTable);
router.get("/getAllTable", protect, fetchTables);
router
  .route("/:id")
  .get(protect, getTableById)
  .put(protect, updateTable)
  .delete(protect, deleteTable);

export default router;
