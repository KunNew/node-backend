import express from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  fetchSuppliers
} from "../controllers/supplierController.js";

const router = express.Router();

router.route("/").get(getSuppliers).post(createSupplier);

router.get("/getAll", fetchSuppliers);

router
  .route("/:id")
  .get(getSupplierById)
  .put(updateSupplier)
  .delete(deleteSupplier);

export default router;
