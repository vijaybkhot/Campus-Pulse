import { Router } from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Middleware to protect all the routes after this line
router.use(authController.protect);

router.patch("/updateMyPassword/", authController.updatePassword);

router.get("/me", userController.getMe, userController.getUser);

// Image uploads - add upload middleware
router.patch(
  "/updateMe/",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.delete("/deleteMe/", userController.deleteMe);

// Middleware to restrict the following methods to admins only
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
