const fs = require("fs");

const deleteFiles = (files) => {
  if (files?.video?.[0]?.path && fs.existsSync(files?.video?.[0]?.path)) {
    fs.unlinkSync(files?.video?.[0]?.path);
  }

  if (
    files?.thumbnail?.[0]?.path &&
    fs.existsSync(files?.thumbnail?.[0]?.path)
  ) {
    fs.unlinkSync(files?.thumbnail?.[0]?.path);
  }
};

module.exports = deleteFiles;
