const fs = require("fs");
const multer = require("multer");
const path = require("path");
const generateCodeId = require("../utils/generate-code-id.util");

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fieldname } = file;

    if (fieldname === "video") {
      const videoPathFolder = path.join("temp", "upload", "video");
      if (!fs.existsSync(videoPathFolder)) {
        fs.mkdirSync(videoPathFolder, { recursive: true });
      }
      cb(null, videoPathFolder);
    }

    if (fieldname === "thumbnail") {
      if (!fs.existsSync('./thumbnail')) {
        fs.mkdirSync('./thumbnail', { recursive: true });
      }

      cb(null, "./thumbnail");
    }
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}`;
    const { fieldname } = file;

    if (fieldname === "video") {
      const videoname = `video-${suffix}${path.extname(file.originalname)}`;
      req.videoname = videoname;
      cb(null, videoname);
    }

    if (fieldname === "thumbnail") {
      const thumbnailname = `thumbnail-${generateCodeId(
        10
      )}-${suffix}${path?.extname(file?.originalname)}`;
      req.thumbnailname = thumbnailname;
      cb(null, thumbnailname);
    }
  },
});

module.exports = upload;
