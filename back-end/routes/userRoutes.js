import { Router } from "express";
import {
  getMe,
  getUser,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Middleware to protect all the routes after this line
router.use(protect);

router.patch("/updateMyPassword/", updatePassword);

router.get("/me", getMe, getUser);

// Image uploads - add upload middleware
router.patch("/updateMe/", uploadUserPhoto, resizeUserPhoto, updateMe);

router.delete("/deleteMe/", deleteMe);

// Middleware to restrict the following methods to admins only
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
