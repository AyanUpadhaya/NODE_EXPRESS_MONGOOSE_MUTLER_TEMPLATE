const express = require("express");
const router = express.Router();
const {
  singleFileUploader,
  multiFileUploader,
} = require("../controllers/uploadCotrollers");

router.post("/api/upload-single", singleFileUploader);
router.post("/api/upload-multiple", multiFileUploader);

module.exports = router;
