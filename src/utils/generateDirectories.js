const path = require("path");
const fs = require("fs");

const createSubfolder = (folderPath) => {
  const subDir = folderPath;
  fs.mkdirSync(subDir, { recursive: true });
};

const generateDirectories = () => {
  const dirs = [
    {
      name: "uploads",
      path: "uploads/",
      childern: [
        {
          name: "imgs",
          path: "uploads/imgs/",
        },
        {
          name: "videos",
          path: "uploads/videos/",
        },
        {
          name: "docs",
          path: "uploads/docs/",
        },
        {
          name: "others",
          path: "uploads/others/",
        },
      ],
    },
  ];
  dirs.forEach((dir, index) => {
    const uploadDir = dir.path;
    if (!fs.existsSync(uploadDir)) {
      console.log(`Creating uploads and sub directories`);
      fs.mkdirSync(uploadDir, { recursive: true });
      if(dir.childern.length>0){
        dir.childern.forEach((folder) => createSubfolder(folder.path));
      }
      console.log("Directories are created")
    } 
  });
};

module.exports = { generateDirectories };

