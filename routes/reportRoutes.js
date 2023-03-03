import express from "express";
import {
  getPurchaseReport,
  getPurchaseDetailBySupplierReport,
  getPurchaseSummaryBySupplierReport,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/purchaseDetailBySupplier")
  .post(protect, getPurchaseDetailBySupplierReport);
router.route("/purchase").post(protect, getPurchaseReport);
router.post(
  "/purchaseSummaryBySupplier",
  protect,
  getPurchaseSummaryBySupplierReport
);
export default router;
