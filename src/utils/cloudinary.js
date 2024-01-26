import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs"
import { fileURLToPath } from "url";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null 
        //upload the file on cloudinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has bee uploaded successfully
        console.log("file uploded successful on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload opration got failed
        return null;
    }
}


export {uploadOnCloudinary}