const express = require("express");
const uploadController = require("../controllers/upload.controller");
const uploadMiddleware = require("../middlewares/upload.middleware");

const router = express.Router();

router.post(
  "/upload",
  uploadMiddleware.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadController
);

module.exports = router;
