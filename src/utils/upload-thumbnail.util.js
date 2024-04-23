const fs = require("fs");

const uploadThumbnail = (imageData, folderPath, imageName) => {
  const imagePath = `${folderPath}/${imageName}`;

  fs.writeFile(imagePath, imageData, "base64", (err) => {
    if (err) {
      console.error("Error saving thumbnail:", err);
      return;
    }
    console.log("Thumbnail saved successfully!");
  });
};

module.exports = uploadThumbnail;
