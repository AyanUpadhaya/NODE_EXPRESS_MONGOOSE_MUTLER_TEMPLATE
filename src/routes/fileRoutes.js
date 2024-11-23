const express = require("express");
const router = express.Router();

const {
  viewFiles,
  downloadFile,
  deleteFile,
} = require("../controllers/fileControllers");
router.get("/api/files", viewFiles);
router.get("/api/files/download/:fileId", downloadFile);
router.delete("/api/files/:fileId", deleteFile);

module.exports = router;
