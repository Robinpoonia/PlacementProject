const multer = require("multer");
const cloudinary = require("./cloudinary");

const {
 CloudinaryStorage
} = require(
 "multer-storage-cloudinary"
);

const storage =
new CloudinaryStorage({
 cloudinary,
 params:{
   folder:"resumes",
   resource_type:"raw"
 }
});

module.exports =
multer({
 storage
});