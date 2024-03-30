import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import fs from "fs";
// import { validationResult } from "express-validator";

const registerUser = AsyncHandler(async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  // get user details from front-end
  const { fullName, email, username, password } = req.body;
  console.log(email);

  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // validation - not empty
  if (
    [fullName, email, username, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    if (avatarLocalPath) fs.unlinkSync(avatarLocalPath);
    if (coverImageLocalPath) fs.unlinkSync(coverImageLocalPath);
    throw new ApiError(400, "All fields are required");
  }

  // check if user is alredy exists: username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    // remove the locally saved temperary file
    if (avatarLocalPath) fs.unlinkSync(avatarLocalPath);
    if (coverImageLocalPath) fs.unlinkSync(coverImageLocalPath);
    throw new ApiError(409, "user with this email or username alredy exists");
  }

  //  check for avatar and coverImage

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatarLocalpath is required");
  }

  // upload them to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar after upload is required");
  }

  //   create user object - create entry in db
  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  //   remove password and refreshToken from field
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }
  // return res
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user created successfully"));
});

export { registerUser };
