const fs = require("fs");
// const { io } = require("socket.io-client");

const {
  RESOLUTION_240_P,
  RESOLUTION_360_P,
  RESOLUTION_480_P,
  RESOLUTION_720_P,
  RESOLUTION_1080_P,
  RESOLUTION_2160_P,
} = require("../constants/resolution.constant");
const hlsVideos = require("../models/hls-videos.model");
const formatDuration = require("../utils/format-duration.util");
const generateCodeId = require("../utils/generate-code-id.util");

const ffmpegConverter = async (
  ffmpeg,
  metadata,
  transformPath,
  req,
  res,
  callback
) => {
  try {
    const { height, width, size, duration } = metadata;
    const resolutionArr = [];
    const fileVideo = req.files?.video?.[0];

    const body = {
      user_id: req.body?.user_id,
      title: req.body?.title,
      description: req.body?.description,
      thumbnail: req?.files?.thumbnail?.[0]?.path,
      tags: req.body?.tags || 'other',
      category_id: req.body?.category_id || 9,
      videoType: 0,
      duration: formatDuration(duration),
      size,
      video_id: generateCodeId(20),
      short_id: generateCodeId(6),
      is_stock: 0,
      age_restriction: 1,
      privacy: 0,
      is_short: 0,
      time: Math.floor(Date.now() / 1000),
    };

    const newVideo = await hlsVideos.create({
      ...body,
      video_status: "prepare",
      video_location: `hls/videos/converted/${240}p-${transformPath}/index.m3u8`,
    });

    // const socket = io(process.env.CORE_API_HOST);
    // let body;
    // if (req.body.data_video) {
    //   body = JSON.parse(req.body.data_video);
    // }
    // if (body?.roomNameUpload) {
    // socket.emit("join_convert_room_video", {
    //   room_name: body.roomNameUpload,
    // });
    // }

    let isLandscape = true;
    if (width < height) {
      isLandscape = false;
    } else {
      isLandscape = true;
    }

    if (height < RESOLUTION_360_P.height) {
      resolutionArr.push(RESOLUTION_240_P.height);
    } else if (height < RESOLUTION_480_P.height) {
      resolutionArr.push(RESOLUTION_240_P.height, RESOLUTION_360_P.height);
    } else if (height < RESOLUTION_720_P.height) {
      resolutionArr.push(
        RESOLUTION_240_P.height,
        RESOLUTION_360_P.height,
        RESOLUTION_480_P.height
      );
    } else if (height < RESOLUTION_1080_P.height) {
      resolutionArr.push(
        RESOLUTION_240_P.height,
        RESOLUTION_360_P.height,
        RESOLUTION_480_P.height,
        RESOLUTION_720_P.height
      );
    } else if (height < RESOLUTION_2160_P.height) {
      resolutionArr.push(
        RESOLUTION_240_P.height,
        RESOLUTION_360_P.height,
        RESOLUTION_480_P.height,
        RESOLUTION_720_P.height,
        RESOLUTION_1080_P.height
      );
    } else {
      resolutionArr.push(
        RESOLUTION_240_P.height,
        RESOLUTION_360_P.height,
        RESOLUTION_480_P.height,
        RESOLUTION_720_P.height,
        RESOLUTION_1080_P.height,
        RESOLUTION_2160_P.height
      );
    }
    if (fileVideo) {
      ffmpeg(fileVideo.path)
        .inputFormat("mp4")
        .inputOptions(["-t 3"])
        .videoCodec("gif")
        .fps(10)
        .size("320x?")
        .output(`gif/${transformPath}.gif`)
        .on("end", async () => {
          console.log(
            "gif convert finished. Converted output: ",
            `gif/${transformPath}.gif`
          );

          await newVideo.update({
            video_status: "progress",
            gif: `hls/videos/gif/${transformPath}.gif`,
          });

          res.status(200).json({
            success: true,
            message: "Converted Complate. Mission success.",
            data: {
              new_path_url: `hls/videos/converted/${240}p-${transformPath}/index.m3u8`,
              gif_path_url: `hls/videos/gif/${transformPath}.gif`,
              max_resolution: resolutionArr[resolutionArr.length - 1] + "p",
            },
          });
        })
        .on("error", (err) => {
          fs.unlinkSync(`gif/${transformPath}.gif`);
          console.error("Error create gif:", err);
        })
        .run();

      ffmpeg()
        .input(fileVideo.path)
        .on("start", () => fs.mkdirSync(`converted/${240}p-${transformPath}`))
        .addOptions([
          "-profile:v main",
          "-vf scale=-2:240",
          "-max_muxing_queue_size 1024",
          "-c:a aac",
          `-ar ${RESOLUTION_240_P.ar}`,
          `-b:a ${RESOLUTION_240_P["b:a"]}`,
          "-c:v h264",
          "-crf 20",
          "-g 30",
          "-keyint_min 20",
          "-sc_threshold 0",
          `-b:v ${RESOLUTION_240_P["b:v"]}`,
          `-maxrate ${RESOLUTION_240_P.maxrate}`,
          `-bufsize ${RESOLUTION_240_P.bufsize}`,
          "-hls_time 6",
          `-hls_segment_filename converted/${240}p-${transformPath}/index%3d.ts`,
          "-hls_playlist_type vod",
          "-f hls",
        ])
        .on("progress", (progress) => {
          if (progress.percent) {
            // if (body?.roomNameUpload) {
            // socket.emit("conversion-progress", {
            //   room_name: body?.roomNameUpload,
            //   percent: progress.percent,
            //   resolution: 240,
            //   video_id: body?.video_id,
            //   short_id: body?.short_id,
            // });
            // }
            console.log(`Processing: ${Math.floor(progress.percent)}% done`);
          }
        })
        .output(`converted/${240}p-${transformPath}/index.m3u8`)
        .on("error", (err, stdout, stderr) => {
          console.error("Error: ", { err, stdout, stderr });
          fs.unlinkSync(`converted/${240}p-${transformPath}/index.m3u8`);
          // socket.disconnect();
          res.status(500).json({
            success: false,
            message: "Internal Server Error.",
          });
        })
        .on("end", async () => {
          await newVideo.update({
            "240p": 1,
          });

          // socket.disconnect();
          resolutionArr.length &&
            resolutionArr?.forEach(async (resolutionSize, index) => {
              if (resolutionSize !== 240) {
                ffmpeg()
                  .input(fileVideo.path)
                  .on("start", () =>
                    fs.mkdirSync(
                      `converted/${resolutionSize}p-${transformPath}`
                    )
                  )
                  .addOptions([
                    "-profile:v main",
                    `-vf scale=-2:${
                      resolutionSize === RESOLUTION_360_P.height
                        ? RESOLUTION_360_P.height
                        : resolutionSize === RESOLUTION_480_P.height
                        ? RESOLUTION_480_P.height
                        : resolutionSize === RESOLUTION_720_P.height
                        ? RESOLUTION_720_P.height
                        : resolutionSize === RESOLUTION_1080_P.height
                        ? RESOLUTION_1080_P.height
                        : RESOLUTION_2160_P.height
                    }`,
                    "-c:a aac",
                    `-ar ${
                      resolutionSize === RESOLUTION_360_P.height
                        ? RESOLUTION_360_P.ar
                        : resolutionSize === RESOLUTION_480_P.height
                        ? RESOLUTION_480_P.ar
                        : resolutionSize === RESOLUTION_720_P.height
                        ? RESOLUTION_720_P.ar
                        : resolutionSize === RESOLUTION_1080_P.height
                        ? RESOLUTION_1080_P.ar
                        : RESOLUTION_2160_P.ar
                    }`,
                    `-b:a ${
                      resolutionSize === RESOLUTION_360_P.height
                        ? RESOLUTION_360_P["b:a"]
                        : resolutionSize === RESOLUTION_480_P.height
                        ? RESOLUTION_480_P["b:a"]
                        : resolutionSize === RESOLUTION_720_P.height
                        ? RESOLUTION_720_P["b:a"]
                        : resolutionSize === RESOLUTION_1080_P.height
                        ? RESOLUTION_1080_P["b:a"]
                        : RESOLUTION_2160_P["b:a"]
                    }`,
                    "-c:v h264",
                    "-crf 20",
                    "-g 30",
                    "-keyint_min 20",
                    "-sc_threshold 0",
                    `-b:v ${
                      resolutionSize === RESOLUTION_360_P.height
                        ? RESOLUTION_360_P["b:v"]
                        : resolutionSize === RESOLUTION_480_P.height
                        ? RESOLUTION_480_P["b:v"]
                        : resolutionSize === RESOLUTION_720_P.height
                        ? RESOLUTION_720_P["b:v"]
                        : resolutionSize === RESOLUTION_1080_P.height
                        ? RESOLUTION_1080_P["b:v"]
                        : RESOLUTION_2160_P["b:v"]
                    }`,
                    `-maxrate ${
                      resolutionSize === RESOLUTION_360_P.height
                        ? RESOLUTION_360_P.maxrate
                        : resolutionSize === RESOLUTION_480_P.height
                        ? RESOLUTION_480_P.maxrate
                        : resolutionSize === RESOLUTION_720_P.height
                        ? RESOLUTION_720_P.maxrate
                        : resolutionSize === RESOLUTION_1080_P.height
                        ? RESOLUTION_1080_P.maxrate
                        : RESOLUTION_2160_P.maxrate
                    }`,
                    `-bufsize ${
                      resolutionSize === RESOLUTION_360_P.height
                        ? RESOLUTION_360_P.bufsize
                        : resolutionSize === RESOLUTION_480_P.height
                        ? RESOLUTION_480_P.bufsize
                        : resolutionSize === RESOLUTION_720_P.height
                        ? RESOLUTION_720_P.bufsize
                        : resolutionSize === RESOLUTION_1080_P.height
                        ? RESOLUTION_1080_P.bufsize
                        : RESOLUTION_2160_P.bufsize
                    }`,
                    "-max_muxing_queue_size 1024",
                    "-hls_time 6",
                    `-hls_segment_filename converted/${resolutionSize}p-${transformPath}/index%3d.ts`,
                    "-hls_playlist_type vod",
                    "-f hls",
                  ])
                  .output(
                    `converted/${resolutionSize}p-${transformPath}/index.m3u8`
                  )
                  .on("progress", (progress) => {
                    if (progress.percent) {
                      if (index === resolutionArr?.length - 1) {
                        // if (body?.roomNameUpload) {
                        // socket.emit("conversion-progress", {
                        //   room_name: body.roomNameUpload,
                        //   percent: progress.percent,
                        //   resolution: resolutionSize,
                        //   video_id: body?.video_id,
                        //   short_id: body?.short_id,
                        // });
                        // }

                        console.log(
                          `Processing: ${Math.floor(progress.percent)}% done`
                        );
                      }
                    }
                  })
                  .on("error", (err, stdout, stderr) => {
                    console.error("Error: ", { err, stdout, stderr });
                    fs.unlinkSync(
                      `converted/${resolutionSize}p-${transformPath}`
                    );
                    // socket.disconnect();
                    res.status(500).json({
                      success: false,
                      message: "Internal Server Error.",
                    });
                  })
                  .on("end", async () => {
                    await newVideo.update({
                      [`${resolutionSize}p`]: 1,
                    });
                    if (index === resolutionArr?.length - 1) {
                      // socket.disconnect();
                      await newVideo.update({
                        video_status: "ready",
                      });
                      callback();
                    }
                  })
                  .run();
              }
              if (
                resolutionSize === 240 &&
                index === resolutionArr?.length - 1
              ) {
                await newVideo.update({
                  video_status: "ready",
                });

                callback();
              }
            });
        })
        .run();
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = ffmpegConverter;
