import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  softDeleteUser,
  findDeletedUser,
  restoreDeletedUser,
} from "../controllers/userController.js";

import exportUser from "../controllers/exportUserController.js";
import { check } from "express-validator";
import { protect } from "../middleware/authMiddleware.js";
import apiLimiter from "../utils/apiLimit.js";
import upload from "./uploadRoutes.js";

// check('email', 'Please include a valid email').isEmail(),
//   check('password', 'Password is required').exists(),
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   return res.status(400).json({ errors: errors.array() });
// }

router
  .route("/")
  .post(check("email", "Please include a valid email").isEmail(), registerUser)
  .get(apiLimiter, protect, getUsers);
router.route("/createUser").post(protect, upload.single("avatar"), createUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/exportUser").get(protect, exportUser);

//soft-delete

router.route("/deletedUser").get(protect, findDeletedUser);
router.route("/restore/:id", protect).get(protect, restoreDeletedUser);

router.route("/softDelete/:id").delete(protect, softDeleteUser);

router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, upload.single("avatar"), updateUser);

export default router;
