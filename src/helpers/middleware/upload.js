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
    } else if (file.fieldname === "BusinessKTPFile") {
      cb(null, "./public/images/BusinessNPWPFile");
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
    { name: "BusinessKTPFile", maxCount: 1 },
    { name: "BusinessNPWPFile", maxCount: 1 },
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
