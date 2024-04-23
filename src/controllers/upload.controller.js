const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("ffprobe-static");
const fs = require("fs");
const ffmpegConverter = require("../helpers/ffmpeg-converter.helper");
const path = require("path");
const { title } = require("process");
const deleteFiles = require("../utils/delete-files.util");

ffmpeg.setFfmpegPath(process.env.FFMPEG_ENGINE_PATH || ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobe.path);

const upload = async (req, res) => {
  if (!fs.existsSync(`converted`)) {
    fs.mkdirSync("converted");
  }
  if (!fs.existsSync(`gif`)) {
    fs.mkdirSync("gif");
  }

  try {
    if (req.files?.video) {
      const transformPath = req.files?.video?.[0]?.filename?.split(".")[0];
      ffmpeg.ffprobe(req.files?.video?.[0]?.path, (err, data) => {
        if (err) {
          console.log({ errFFPROBE: err });
        } else {
          console.log({ transformPath });
          const { duration, size } = data.format;
          const { width, height } = data.streams[0];
          ffmpegConverter(
            ffmpeg,
            { width, height, duration, size },
            transformPath,
            req,
            res,
            () => fs.unlinkSync(req.files?.video?.[0]?.path)
          );
        }
      });
    } else {
      deleteFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "No file selected for transform",
      });
    }
  } catch (error) {
    console.log({ errorUpload: error });
    deleteFiles(req.files);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = upload;
