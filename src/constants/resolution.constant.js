// const RESOLUTION_144_P = {
//   width: 256,
//   height: 144,
//   fps: 30,
//   bit_rate: {
//     min: "80K",
//     max: "100K",
//   },
// };

const RESOLUTION_240_P = {
  width: 426,
  height: 240,
  fps: 30,
  bit_rate: {
    min: "300K",
    max: "700K",
  },
  ar: 48000,
  "b:a": "64k",
  "b:v": "300k",
  maxrate: "700k",
  // bufsize: "1000k",
  bufsize: "1400K",
};

const RESOLUTION_360_P = {
  width: 640,
  height: 360,
  fps: 30,
  bit_rate: {
    min: "400K",
    max: "1000K",
  },
  ar: 48000,
  "b:a": "96k",
  "b:v": "800k",
  maxrate: "1200K",
  bufsize: "2400K",
  // maxrate: "856k",
  // bufsize: "1200k",
};

const RESOLUTION_480_P = {
  width: 842,
  height: 480,
  fps: 30,
  bit_rate: {
    min: "500K",
    max: "2000K",
  },
  ar: 48000,
  "b:a": "128k",
  "b:v": "1400k",
  maxrate: "2000K",
  bufsize: "4000K",
  // maxrate: "1498k",
  // bufsize: "2100k",
};

const RESOLUTION_720_P = {
  width: 1280,
  height: 720,
  fps: 30,
  bit_rate: {
    min: "1500K",
    max: "6000K",
  },
  ar: 48000,
  "b:a": "192k",
  // "b:a": "128k",
  "b:v": "2800k",
  maxrate: "4000K",
  bufsize: "8000K",
  // maxrate: "2996k",
  // bufsize: "4200k",
};

const RESOLUTION_1080_P = {
  width: 1920,
  height: 1080,
  fps: 30,
  bit_rate: {
    min: "3000K",
    max: "9000K",
  },
  ar: 48000,
  "b:a": "192k",
  // "b:a": "152k",
  "b:v": "6000k",
  maxrate: "8000K",
  bufsize: "16000K",
  // maxrate: "8000k",
  // bufsize: "8000k",
};

const RESOLUTION_2160_P = {
  width: 3840,
  height: 2160,
  fps: 30,
  bit_rate: {
    min: "13000K",
    max: "51000K",
  },
  ar: 48000,
  "b:a": "192k",
  // "b:a": "152k",
  "b:v": "6000k",
  maxrate: "20000K",
  bufsize: "40000K",
  // maxrate: "8000k",
  // bufsize: "8000k",
};

module.exports = {
  RESOLUTION_1080_P,
  RESOLUTION_2160_P,
  RESOLUTION_240_P,
  RESOLUTION_360_P,
  RESOLUTION_480_P,
  RESOLUTION_720_P,
};
