const db = require("../configs/mySQL");

module.exports = {
  postPekanraya: (req) => {
    const id = req.decodedToken.UserID;
    const { body } = req;
    const ktpfile = JSON.stringify(req.files.PekanRayaKTPFile.map((e) => `files/pekanRayaFile/file/${e.filename}`));
    const businessfile = JSON.stringify(req.files.PekanRayaInformasiSingkat.map((e) => `files/pekanRayaFile/file/${e.filename}`));
    const informasiUsaha = {
      BusinessOwnProduct: body.BusinessOwnProduct,
      BusinessAverageOmset: body.BusinessAverageOmset,
      BusinessLegalName: body.BusinessLegalName,
      BusinessBrandName: body.BusinessBrandName,
      BusinessMonthStand: body.BusinessMonthStand,
      BusinessYearStand: body.BusinessYearStand,
      BusinessType: body.BusinessType,
      BusinessCategory: body.BusinessCategory,
      BusinessStatusBusiness: body.BusinessStatusBusiness,
      BusinessSector: body.BusinessSector,
      BusinessNIB: body.BusinessNIB,
      BusinessTaxNumber: body.BusinessTaxNumber,
      BusinessDirectorName: body.BusinessDirectorName,
      BusinessDirectorNIK: body.BusinessDirectorNIK,
      BusinessDirectorTaxNumber: body.BusinessDirectorTaxNumber,
      BusinessWebsite: body.BusinessWebsite,
      BusinessInstagram: body.BusinessInstagram,
      BusinessCreatedAt: new Date(Date.now()),
      BusinessCreatedBy: id,
      BusinessModifiedAt: new Date(Date.now()),
      BusinessStatus: 1,
    };
    const pekanraya = {
      PekanRayaKTPFile: JSON.parse(ktpfile)[0],
      PekanRayaInformasiSingkat: JSON.parse(businessfile)[0],
      PekanRayaCreatedAt: new Date(Date.now()),
      PekanRayaCreatedBy: id,
      PekanRayaModifiedAt: new Date(Date.now()),
      PekanRayaStatus: 0,
    };
    return new Promise((resolve, reject) => {
      //generateBusinessCode
      const qs = `SELECT BusinessID FROM business
        WHERE BusinessID = (
            SELECT MAX(BusinessID) FROM business)`;
      db.query(qs, (err, res) => {
        if (!err) {
          let codebisnis;
          if (res.length > 0) {
            codebisnis = "B000" + res[0].BusinessID;
          } else {
            codebisnis = "B0001";
          }
          const newInformasiUsaha = {
            ...informasiUsaha,
            BusinessCode: codebisnis,
          };
          const qs = `INSERT INTO business SET ?`;
          db.query(qs, newInformasiUsaha, (err, data) => {
            if (!err) {
              const newBody = {
                ...pekanraya,
                BusinessID: data.insertId,
              };
              const qs = `INSERT INTO pekanraya SET ?`;
              db.query(qs, newBody, (err, data) => {
                if (!err) {
                  resolve({
                    status: 200,
                    message: "Berhasil mendaftar pekanraya",
                    data: data,
                  });
                } else {
                  reject({
                    status: 500,
                    message: "Gagal mendaftar pekanraya",
                    data: err,
                  });
                }
              });
            } else {
              reject({
                status: 500,
                message: "internal server error",
                data: err,
              });
            }
          });
        } else {
          reject({
            status: 500,
            message: "internal server error",
            data: err,
          });
        }
      });
    });
  },
  getPekanraya: () => {},
  updatePekanraya: () => {},
  deletePekanraya: () => {},
};
