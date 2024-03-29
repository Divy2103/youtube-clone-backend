import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: ` ${process.env.CLOUDINARY_API_SECRET}`,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      // if no file, return an error
      throw new Error("No local file path provided");
    }

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfull
    console.log("File uploaded successfully on cloudinary", response.url);

    // remove the locally saved temperary file as the upload on operation got successfull
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // remove the locally saved temperary file as the upload on operation got failed
    fs.unlinkSync(localFilePath);
    return error;
  }
};

export { uploadOnCloudinary };
