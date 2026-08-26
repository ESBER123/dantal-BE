import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // المسار المطلق لمجلد الصور
    const uploadDir = path.resolve("upload", "doctor");

    // إنشاء المجلد تلقائيًا إذا لم يكن موجودًا
    fs.mkdirSync(uploadDir, { recursive: true });

    console.log("Upload directory:", uploadDir);

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

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
