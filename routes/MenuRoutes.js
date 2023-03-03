import express from "express";
const router = express.Router();
import {
  createMenu,
  getMenus,
  getMenuById,
  deleteMenu,
  updateMenu,
  fetchMenus
} from "../controllers/menuController.js";

// import exportUser from "../controllers/exportUserController.js";
// import { check } from "express-validator";
import { protect } from "../middleware/authMiddleware.js";
import apiLimiter from "../utils/apiLimit.js";
import path from 'path'
// import upload from "./uploadRoutes.js";

// check('email', 'Please include a valid email').isEmail(),
//   check('password', 'Password is required').exists(),
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   return res.status(400).json({ errors: errors.array() });
// }


import multer from 'multer'



const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/menu')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    // cb('Images only!')
    cb(new Error(`Image Only`))
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})








router.route("/").get(apiLimiter, protect, getMenus);
router.route("/createMenu").post(protect, upload.single("image"), createMenu);

router.get("/getAll", fetchMenus);

// router.route("/exportUser").get(protect, exportUser);

router
  .route("/:id")
  .delete(protect, deleteMenu)
  .get(protect, getMenuById)
  .put(protect, upload.single("image"), updateMenu);

export default router;
