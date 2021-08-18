const multer = require("multer");
const path = require("path");
const form = require("../form");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "OrganizerLogo") {
      cb(null, "./public/images/organizerlogo");
    } else if (file.fieldname === "OrganizerCover") {
      cb(null, "./public/images/organizercover");
    } else if (file.fieldname === "EventBanner") {
      cb(null, "./public/images/EventBanner");
    } else if (file.fieldname === "BusinessKTPFile") {
      cb(null, "./public/images/businessKtpFile");
    } else if (file.fieldname === "BusinessNPWPFile") {
      cb(null, "./public/images/businessNPWPFile");
    } else if (file.fieldname === "BusinessMatchBanner") {
      cb(null, "./public/images/businessMatchBanner");
    } else if (file.fieldname === "PekanUsahaFile") {
      cb(null, "./public/files/pekanUsahaFile");
    } else if (file.fieldname === "PekanRayaKTPFile") {
      cb(null, "./public/files/pekanRayaFile/file");
    } else if (file.fieldname === "PekanRayaInformasiSingkat") {
      cb(null, "./public/files/pekanRayaFile/file");
    }
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage: storage,
  limits: 5 * 1000 * 1000,
});

const multiUpload = (req, res, next) => {
  const dataUpload = upload.fields([
    { name: "OrganizerLogo", maxCount: 1 },
    { name: "OrganizerCover", maxCount: 1 },
    { name: "EventBanner", maxCount: 1 },
    { name: "BusinessMatchBanner", maxCount: 1 },
    { name: "BusinessKTPFile", maxCount: 1 },
    { name: "BusinessNPWPFile", maxCount: 1 },
    { name: "PekanUsahaFile", maxCount: 1 },
    { name: "PekanRayaKTPFile", maxCount: 1 },
    { name: "PekanRayaInformasiSingkat", maxCount: 1 },
  ]);
  dataUpload(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer Error",
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = multiUpload;
