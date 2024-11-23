const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { determineUploadDir } = require("../utils/determineUploadDir");

const initializeMulter = (app) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = determineUploadDir(file);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 100MB max per file
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpg|jpeg|png|pdf|doc|csv|mp4|mkv/;
      const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype);

      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error(`File type not allowed: ${file.mimetype}`));
      }
    },
  });

  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else {
      next(err);
    }
  });

  app.use(
    upload.fields([
      { name: "file", maxCount: 1 },
      { name: "multiple", maxCount: 10 },
    ])
  );
};

module.exports = { initializeMulter };
