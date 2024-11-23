const File = require("../models/fileModel");
const fs = require("fs");
const { determineUploadDir } = require("../utils/determineUploadDir");
const path = require("path");

const singleFileUploader = async (req, res) => {
  try {
    if (!req.files || !req.files.file || req.files.file.length === 0) {
      return res.status(400).json({
        message: "No file provided!",
      });
    }

    // const uploadDir = "uploads/";
    const uploadedFile = req.files.file[0]; // Access the first file in 'file'

    // Construct file path
    const filePath = `/${determineUploadDir(uploadedFile)}${
      uploadedFile.filename
    }`;

    // Save file information to the database
    const file = new File({
      filename: uploadedFile.filename,
      url: filePath,
    });

    await file.save();

    // Respond with success
    res.status(200).json({
      message: "File uploaded and saved successfully!",
      file: file,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving file to database",
      error: error.message,
    });
  }
};

const multiFileUploader = async (req, res) => {
  try {
    // Check if the 'multiple' field exists and contains files
    if (req.files.multiple.length === 0) {
      return res.status(400).json({
        message: "No files provided!",
      });
    }

    const uploadedFiles = req.files.multiple; // Access the uploaded files
    const savedFiles = [];

    for (const uploadedFile of uploadedFiles) {
      const filePath = `/${determineUploadDir(uploadedFile)}${
        uploadedFile.filename
      }`;

      const file = new File({
        filename: uploadedFile.filename,
        url: filePath,
      });
      await file.save();
      savedFiles.push(file);
    }

    res.status(200).json({
      message: "Files uploaded and saved successfully!",
      files: savedFiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving files to database",
      error: error.message,
    });
  }
};


module.exports = { singleFileUploader, multiFileUploader };
