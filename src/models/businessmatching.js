const db = require("../configs/mySQL");
const fs = require("fs");

module.exports = {
  postBusinessMatch: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO business_matching SET ?";
      db.query(qs, newBody, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Create Pekan Usaha Sukses",
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
  },
  getBusinessMatch: () => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT * FROM business_matching WHERE BusinessMatchID = (SELECT MAX(BusinessMatchID) FROM business_matching)`;
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Pekan usaha found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "Pekan usaha tidak ada",
              data: err,
            });
          }
        } else {
          reject({
            status: 500,
            message: "Internal server error",
            data: err,
          });
        }
      });
    });
  },
  updateBusinessMatch: (req) => {
    const idUser = req.decodedToken.UserID;
    const { id } = req.params;
    const { body } = req;
    let newBody;
    if (req.files.BusinessMatchBanner) {
      const imgBaner = JSON.stringify(req.files.BusinessMatchBanner.map((e) => `/images/businessMatchBanner/${e.filename}`));
      newBody = {
        ...body,
        BusinessMatchBanner: JSON.parse(imgBaner),
        BusinessMatchModifiedAt: new Date(Date.now()),
        BusinessMatchModifiedBy: idUser,
      };
    } else {
      newBody = {
        ...body,
        BusinessMatchModifiedAt: new Date(Date.now()),
        BusinessMatchModifiedBy: idUser,
      };
    }
    return new Promise((resolve, reject) => {
      const qs = `SELECT * FROM business_matching WHERE BusinessMatchID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data[0].BusinessMatchBanner != "") {
            if (req.files.BusinessMatchBanner) {
              const imgBanner = data[0].BusinessMatchBanner;
              removeImage(imgBanner);
            }
          }

          const qs = `UPDATE business_matching SET ? WHERE BusinessMatchID = ?`;
          db.query(qs, [newBody, id], (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "business matching berhasil diupdate",
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
  deleteBusinessMatch: (req) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      const qs = `SELECT * FROM business_matching WHERE BusinessMatchID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data[0].BusinessMatchBanner != "") {
            const imgBanner = data[0].BusinessMatchBanner;
            removeImage(imgBanner);
          }

          const qs = `DELETE FROM business_matching WHERE BusinessMatchID = ?`;
          db.query(qs, id, (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "business matching berhasil dihapus",
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
  getBusinessMatchJoin: (idUser) => {
    return new Promise((resolve, reject) => {
      const qs =
        "SELECT a.BusinessMatchID ,a.BusinessMatchTitle,a.BusinessMatchBanner,c.CategoryTitle, a.BusinessMatchDate  FROM business_matching as a INNER JOIN business as b ON a.BusinessMatchID = b.BusinessMatchID INNER JOIN categories as c on c.CategoryID = a.CategoryID WHERE b.BusinessCreatedBy = ?";
      db.query(qs, idUser, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Business Match Join found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "Business Match Join not found",
              data: err,
            });
          }
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
  getBusinessMatchById: (req) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      const qs = `SELECT a.BusinessMatchTitle, a.BusinessMatchDescription, a.BusinessMatchBanner, a.BusinessMatchStart, a.BusinessMatchEnd, a.BusinessMatchDate , b.CategoryTitle FROM business_matching as a INNER JOIN categories as b on a.CategoryID = b.CategoryID WHERE BusinessMatchID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "detail pekan usaha found",
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
  },
};

const removeImage = (filepath) => {
  fs.unlink(`./public${filepath}`, (err) => console.log(err));
};
