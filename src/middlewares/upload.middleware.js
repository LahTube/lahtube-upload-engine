const multer = require("multer");
const uploadVideoHelper = require("../helpers/upload.helper");

const upload = multer({
  storage: uploadVideoHelper,
  fileFilter: (req, file, cb) => {
    const { fieldname, mimetype } = file;

    if (fieldname === "video") {
      if (mimetype === "video/gif") {
        filetype = "gif";
        cb(null, true);
      }
      if (mimetype === "video/mp4") {
        filetype = "mp4";
        cb(null, true);
      }
      if (mimetype === "video/ogg") {
        filetype = "ogg";
        cb(null, true);
      }
      if (mimetype === "video/wmv") {
        filetype = "wmv";
        cb(null, true);
      }
      if (mimetype === "video/x-flv") {
        //filetype = mime.getExtension('video/flv');
        filetype = "flv";
        cb(null, true);
      }
      if (mimetype === "video/avi") {
        filetype = "avi";
        cb(null, true);
      }
      if (mimetype === "video/webm") {
        filetype = "webm";
        cb(null, true);
      }
      if (mimetype === "video/mkv") {
        filetype = "mkv";
        cb(null, true);
      }
      if (mimetype === "video/avchd") {
        filetype = "avchd";
        cb(null, true);
      }
      if (mimetype === "video/mov") {
        filetype = "mov";
        cb(null, true);
      }
      if (mimetype === "video/mpeg") {
        filetype = "mpeg";
        cb(null, true);
      }
    }

    if (fieldname === "thumbnail") {
      const allowedExtentions = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedExtentions.includes(mimetype)) {
        cb(null, true);
      } else {
        const err = new Error("Extentions doesn't support");
        cb(err, false);
      }
    }
  },
});

module.exports = upload;
