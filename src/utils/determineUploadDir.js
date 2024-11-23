const path = require("path");

const determineUploadDir = (file) => {
  const mimeToDirMap = {
    "image/jpg": "uploads/imgs/",
    "image/jpeg": "uploads/imgs/",
    "image/png": "uploads/imgs/",
    "application/pdf": "uploads/docs/",
    "application/msword": "uploads/docs/",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "uploads/docs/",
    "application/csv": "uploads/docs/",
    "video/mp4": "uploads/videos/",
    "video/x-matroska": "uploads/videos/",
  };

  return mimeToDirMap[file.mimetype] || "uploads/others/";
};

module.exports = { determineUploadDir };
