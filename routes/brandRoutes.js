import express from "express";
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = express.Router();

router.route("/").get(getBrands).post(createBrand);
router.route("/:id").get(getBrandById).put(updateBrand).delete(deleteBrand);

export default router;
