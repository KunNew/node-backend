import express from "express";
import { getTotalCategories,getTotalMenus } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/category", protect, getTotalCategories);
router.get("/menu", protect, getTotalMenus);

export default router;
