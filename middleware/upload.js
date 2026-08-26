import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve("upload", "doctor");
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Upload directory:", uploadDir);
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
