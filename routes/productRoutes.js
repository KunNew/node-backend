import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route(`/`).get(getProducts).post(createProduct);
router.route(`/:id`).get(getProductById).put(updateProduct).delete(deleteProduct);
export default router;
