const File = require("../models/fileModel");
const sendResponse = require("../utils/sendResponse");
const path = require("path");
const fs = require("fs");

// Controller to view all files
const viewFiles = async (req, res) => {
  try {
    const files = await File.find();
    return sendResponse(res, 200, files);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving files",
      error: error.message,
    });
  }
};

// Function to determine the directory based on file extension
const determineUploadDir = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    return "uploads/imgs/";
  } else if ([".pdf", ".doc", ".docx", ".csv"].includes(ext)) {
    return "uploads/docs/";
  } else if ([".mp4", ".mkv"].includes(ext)) {
    return "uploads/videos/";
  } else {
    return "uploads/others/";
  }
};

// Controller to download a single file
const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({
        message: "File not found!",
      });
    }

    // Determine the directory based on the file extension
    const uploadDir = determineUploadDir(file.filename);

    // Construct the file path
    const filePath = path.join(__dirname, "..", "..", uploadDir, file.filename);
    console.log("File path:", filePath); // Log the file path

    // Check if the file exists before attempting to download
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File does not exist on the server.",
      });
    }

    // Download the file
    res.download(filePath);
  } catch (error) {
    res.status(500).json({
      message: "Error downloading file",
      error: error.message,
    });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Find the file in the database
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({
        message: "File not found!",
      });
    }

    // Determine the file's path on the server
    // Determine the directory based on the file extension
    const uploadDir = determineUploadDir(file.filename);

    // Construct the file path
    const filePath = path.join(__dirname, "..", "..", uploadDir, file.filename);

    // Delete the file from the filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          return res.status(404).json({
            message: "File not found on the server!",
          });
        }
        return res.status(500).json({
          message: "Error deleting the file from the server",
          error: err.message,
        });
      }

      // Remove the file record from the database
      await File.findByIdAndDelete(fileId);

      return res.status(200).json({
        message: "File deleted successfully!",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting file",
      error: error.message,
    });
  }
};


module.exports = {
  viewFiles,
  downloadFile,
  deleteFile,
};
