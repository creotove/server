import { v2 } from "cloudinary";
import dotenv from "dotenv";
import { unLinkFile } from "./unLinkFile.js";
dotenv.config();
const cloudinary = v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return result;

    // Respond with the Cloudinary URL or any other desired information
  } catch (error) {
    await unLinkFile(localFilePath)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
    return null;
  }
};
const deleteOnCloudinary = async (path) => {
  try {
    const fileName = path.split("/");
    const fileToBeDelted = fileName[fileName.length - 1].split(".")[0];
    console.log("file name  :", fileToBeDelted);
    const result = await cloudinary.uploader.destroy(fileToBeDelted);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export { deleteOnCloudinary };
export default uploadOnCloudinary;
