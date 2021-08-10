const db = require("../configs/mySQL");

module.exports = {
  postBusiness: (req) => {
    const id = req.decodedToken.UserID;
    const { body } = req;
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
              const idmax = data[0].BusinessID + 1;
              const newBody = {
                ...body,
                BusinessCode: "B000" + (data[0].BusinessID + 1).toString(),
                BusinessMonthStand: Number(body.BusinessMonthStand),
                BusinessYearStand: Number(body.BusinessYearStand),
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
      const qs = `SELECT a.BusinessID,a.BusinessCode, b.UserName, a.BusinessLegalName, a.BusinessBrandName,a.BusinessType, a.BusinessCategory,a.BusinessStatusBusiness,a.BusinessSector FROM business as a INNER JOIN users as b ON a.BusinessCreatedBy = b.UserID`;
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
    });
  },

  updateBusiness: (req) => {
    const userId = req.decodedToken.UserID;
    const { id } = req.params;
    const { body } = req;

    const newBody = {
      ...body,
      BusinessModifiedBy: userId,
      BusinessModifiedAt: new Date(Date.now()),
    };

    return new Promise((resolve, reject) => {
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
    });
  },
};
