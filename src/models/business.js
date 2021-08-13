const db = require("../configs/mySQL");
const fs = require("fs");

module.exports = {
  postBusiness: (req) => {
    const id = req.decodedToken.UserID;
    const { body } = req;
    const imgKTP = JSON.stringify(req.files.BusinessKTPFile.map((e) => `images/businessKtpFile/${e.filename}`));
    const imgNPWP = JSON.stringify(req.files.BusinessNPWPFile.map((e) => `images/businessNPWPFile/${e.filename}`));

    return new Promise((resolve, reject) => {
      const qs = "SELECT BusinessCreatedBy FROM business WHERE BusinessCreatedBy = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            reject({
              status: 500,
              message: "Anda Hanya dapat mendaftar sekali",
            });
          } else {
            const qs = "SELECT MAX(BusinessID) as BusinessID FROM business";
            db.query(qs, (err, data) => {
              const newBody = {
                ...body,
                BusinessCode: "B000" + (data[0].BusinessID + 1).toString(),
                BusinessMonthStand: Number(body.BusinessMonthStand),
                BusinessYearStand: Number(body.BusinessYearStand),
                BusinessKTPFile: JSON.parse(imgKTP)[0],
                BusinessNPWPFile: JSON.parse(imgNPWP)[0],
                BusinessCreatedAt: new Date(Date.now()),
                BusinessCreatedBy: id,
                BusinessModifiedAt: new Date(Date.now()),
                BusinessStatus: 1,
              };
              console.log(newBody);
              const qs = "INSERT INTO business SET ?";
              db.query(qs, newBody, (err, data) => {
                if (!err) {
                  resolve({
                    status: 200,
                    message: "Business berhasil dibuat",
                    data: data,
                  });
                } else {
                  reject({
                    status: 500,
                    message: "Server Error",
                    data: err,
                  });
                }
              });
            });
          }
        }
      });
    });
  },

  getAllBusiness: () => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT a.BusinessID,a.BusinessCode, b.UserName, a.BusinessLegalName, a.BusinessBrandName ,a.BusinessType, a.BusinessCategory,a.BusinessStatusBusiness,a.BusinessSector FROM business as a INNER JOIN users as b ON a.BusinessCreatedBy = b.UserID`;
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Data Business Found ",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "Business Not Found",
              data: err,
            });
          }
        } else {
          rejeect({
            status: 500,
            message: "Server Error",
            data: err,
          });
        }
      });
    });
  },

  getBusinessById: (req) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM business WHERE businessID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Data business Found",
            data: data,
          });
        } else {
          reject({
            status: 200,
            message: "Server Error",
            data: err,
          });
        }
      });
    });
  },

  deleteBusiness: (req) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      const qs = `SELECT BusinessKTPFile, BusinessNPWPFile FROM business WHERE BusinessID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          const imgKTP = data[0].BusinessKTPFile;
          const imgNPWP = data[0].BusinessNPWPFile;
          removeImage(imgKTP);
          removeImage(imgNPWP);
          const qs = "DELETE FROM business WHERE BusinessID = ?";
          db.query(qs, id, (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "business berhasil dihapus",
                data: data,
              });
            } else {
              reject({
                status: 500,
                message: "server error",
                data: err,
              });
            }
          });
        } else {
          reject({
            status: 500,
            message: "server error",
            data: err,
          });
        }
      });
    });
  },

  updateBusiness: (req) => {
    const userId = req.decodedToken.UserID;
    const { id } = req.params;
    const { body } = req;

    let newBody;
    if (req.files.BusinessKTPFile && req.files.BusinessNPWPFile) {
      const imgKTP = JSON.stringify(req.files.BusinessKTPFile.map((e) => `/images/businessKtpFile/${e.filename}`));
      const imgNPWP = JSON.stringify(req.files.BusinessNPWPFile.map((e) => `/images/businessNPWPFile/${e.filename}`));
      newBody = {
        ...body,
        BusinessKTPFile: JSON.parse(imgKTP)[0],
        BusinessNPWPFile: JSON.parse(imgNPWP)[0],
        BusinessModifiedBy: userId,
        BusinessModifiedAt: new Date(Date.now()),
      };
    } else if (req.files.BusinessKTPFile) {
      const imgKTP = JSON.stringify(req.files.BusinessKTPFile.map((e) => `/images/businessKtpFile/${e.filename}`));
      newBody = {
        ...body,
        BusinessKTPFile: JSON.parse(imgKTP)[0],
        BusinessModifiedBy: userId,
        BusinessModifiedAt: new Date(Date.now()),
      };
    } else if (req.files.BusinessNPWPFile) {
      const imgNPWP = JSON.stringify(req.files.BusinessNPWPFile.map((e) => `/images/businessNPWPFile/${e.filename}`));
      newBody = {
        ...body,
        BusinessNPWPFile: JSON.parse(imgNPWP)[0],
        BusinessModifiedBy: userId,
        BusinessModifiedAt: new Date(Date.now()),
      };
    } else {
      newBody = {
        ...body,
        BusinessModifiedBy: userId,
        BusinessModifiedAt: new Date(Date.now()),
      };
    }

    return new Promise((resolve, reject) => {
      const qs = `SELECT BusinessKTPFile, BusinessNPWPFile FROM business WHERE BusinessID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          const imgKTP = data[0].BusinessKTPFile;
          const imgNPWP = data[0].BusinessNPWPFile;
          if (req.files.BusinessKTPFile && req.files.BusinessNPWPFile) {
            removeImage(imgKTP);
            removeImage(imgNPWP);
          } else if (req.files.BusinessKTPFile) {
            removeImage(imgKTP);
          } else if (req.files.BusinessNPWPFile) {
            removeImage(imgNPWP);
          }

          const qs = `UPDATE business SET ? WHERE BusinessID = ?`;
          db.query(qs, [newBody, id], (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Update berhasil",
                data: data,
              });
            } else {
              reject({
                status: 500,
                message: "Server Error",
                data: err,
              });
            }
          });
        } else {
          reject({
            status: 500,
            message: "Server Error",
            data: err,
          });
        }
      });
    });
  },
};

const removeImage = (filepath) => {
  fs.unlink(`./public${filepath}`, (err) => console.log(err));
};
