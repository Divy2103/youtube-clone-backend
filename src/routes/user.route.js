import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

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

router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(VerifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(VerifyJWT, changeCurrentPassword);
router.route("/current-user").get(VerifyJWT, getCurrentUser);
router.route("/update-accout").patch(VerifyJWT, updateAccountDetails);

router
  .route("/update-avatar")
  .patch(VerifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/update-cover-image")
  .patch(VerifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(VerifyJWT, getUserChannelProfile);
router.route("/watch-history").get(VerifyJWT, getWatchHistory);

export default router;
