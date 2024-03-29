import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
// import { body } from "express-validator";

const router = Router();
// router
//   .route("/register")
//   .post(
//     [body("email").notEmpty(), body("password","password lenght must be between 5 to 10").isLength({ min: 5, max: 10 })],
//     registerUser
//   );
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
