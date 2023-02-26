import express from "express";
import {
  createPurchase,
  getPurchases,
  invoiceNumber,
  getPurchaseById
} from "../controllers/purchaseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();




router.route(`/`).get(protect,getPurchases).post(protect, createPurchase);

router.get('/invoiceNumber',protect,invoiceNumber)

router.route('/:id').get(protect,getPurchaseById)

export default router;
