import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { check } from "express-validator";
const router = express.Router();

router.route("/").get(getCategories).post(check('name','Category is required'),createCategory);

// router.route("/findDeletedCategory").get(findDeletedCategory)

router.get("/getAll", fetchCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
