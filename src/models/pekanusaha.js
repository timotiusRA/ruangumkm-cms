const db = require("../configs/mySQL");

module.exports = {
  postPekanusaha: (req) => {
    const id = req.decodedToken.UserID;
    const { body } = req;
    const imgKTP = JSON.stringify(req.files.BusinessKTPFile.map((e) => `images/businessKtpFile/${e.filename}`));
    const imgNPWP = JSON.stringify(req.files.BusinessNPWPFile.map((e) => `images/businessNPWPFile/${e.filename}`));
    const file = JSON.stringify(req.files.PekanUsahaFile.map((e) => `files/pekanUsahaFile/${e.filename}`));

    const informasiUsaha = {
      BusinessMatchID: body.BusinessMatchID,
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
      BusinessKTPFile: JSON.parse(imgKTP)[0],
      BusinessNPWPFile: JSON.parse(imgNPWP)[0],
      BusinessWebsite: body.BusinessWebsite,
      BusinessInstagram: body.BusinessInstagram,
      BusinessCreatedAt: new Date(Date.now()),
      BusinessCreatedBy: id,
      BusinessModifiedAt: new Date(Date.now()),
      BusinessStatus: 1,
    };

    const informasikelompok = {
      PekanUsahaMemberName1: body.PekanUsahaMemberName1,
      PekanUsahaMemberGender1: body.PekanUsahaMemberGender1,
      PekanUsahaBirthPlace1: body.PekanUsahaBirthPlace1,
      PekanUsahaMemberBirthDate1: body.PekanUsahaMemberBirthDate1,
      PekanUsahaMemberNIK1: body.PekanUsahaMemberNIK1,
      PekanUsahaMemberEmail1: body.PekanUsahaMemberEmail1,
      PekanUsahaMemberMobile1: body.PekanUsahaMemberMobile1,
      PekanUsahaMemberName2: body.PekanUsahaMemberName2,
      PekanUsahaMemberGender2: body.PekanUsahaMemberGender2,
      PekanUsahaBirthPlace2: body.PekanUsahaBirthPlace2,
      PekanUsahaMemberBirthDate2: body.PekanUsahaMemberBirthDate2,
      PekanUsahaMemberNIK2: body.PekanUsahaMemberNIK2,
      PekanUsahaMemberEmail2: body.PekanUsahaMemberEmail2,
      PekanUsahaMemberMobile2: body.PekanUsahaMemberMobile2,
      PekanUsahaFile: JSON.parse(file)[0],
      PekanUsahaCreatedAt: new Date(Date.now()),
      PekanUsahaCreatedBy: id,
      PekanUsahaModifiedAt: new Date(Date.now()),
      PekanUsahaStatus: 1,
    };

    console.log("ini dari informasi usaha", informasiUsaha);
    console.log("ini dari informasi kelompok ", informasikelompok);

    return new Promise((resolve, reject) => {
      //generateBusinessCode
      const qs = `SELECT BusinessID FROM business
      WHERE BusinessID = (
          SELECT MAX(BusinessID) FROM business)`;
      db.query(qs, (err, data) => {
        console.log(data[0].BusinessID);
        if (!err) {
          const newInformasiUsaha = {
            ...informasiUsaha,
            BusinessCode: "B000" + data[0].BusinessID,
          };

          const qs = `INSERT INTO business SET ? `;
          db.query(qs, newInformasiUsaha, (err, data) => {
            if (!err) {
              const newInformasiKelompok = {
                ...informasikelompok,
                BusinessID: data.insertId,
              };
              const qs = `INSERT INTO pekanusaha SET ?`;
              db.query(qs, newInformasiKelompok, (err, data) => {
                if (!err) {
                  resolve({
                    status: 200,
                    message: "Berhasil mendaftar pekan usaha",
                    data: data,
                  });
                } else {
                  reject({
                    status: 500,
                    message: "Gagal Mendaftarkan Pekan usaha",
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
  getPekanusaha: () => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM pekanusaha";
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Pekan usaha Found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "Pekan usaha not found",
              data: err,
            });
          }
        } else {
          reject({
            status: 500,
            messagae: "Server Error",
            data: err,
          });
        }
      });
    });
  },
  deletePekanusaha: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM pekanusaha WHERE PekanUsahaID = ?";
      db.query(qs, id, (err, res) => {
        if (!err) {
          if (res[0].PekanUsahaFile != "") {
            if (req.files.PekanUsahaFile) {
              const pekanusahafile = req[0].PekanUsahaFile;
              removeImage(pekanusahafile);
            }
          }
          const qs = `DELETE FROM pekanusaha WHERE PekanUsahaID = ?`;
          db.query(qs, id, (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Pekan usaha berhasil dihapus",
                data: data,
              });
            } else {
              reject({
                status: 500,
                message: `pekan usaha gagal dihapus Server Error`,
                data: err,
              });
            }
          });
        } else {
          reject({
            status: 500,
            message: `pekan usaha gagal dihapus Server Error`,
            data: err,
          });
        }
      });
    });
  },
  updatePekanusaha: (req) => {
    const idUser = req.decodedToken.UserID;
    const { id } = req.params;
    const { body } = req;
    let newBody;

    if (req.files.PekanUsahaFile) {
      const pekanusahafile = JSON.stringify(req.files.PekanUsahaFile.map((e) => `/files/pekanUsahaFile/${e.filename}`));
      newBody = {
        ...body,
        PekanUsahaFile: JSON.parse(pekanusahafile),
        PekanUsahaModifiedAt: new Date(Date.now()),
        PekanUsahaModifiedBy: idUser,
      };
    } else {
      newBody = {
        ...body,
        PekanUsahaModifiedAt: new Date(Date.now()),
        PekanUsahaModifiedBy: idUser,
      };
    }

    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM pekanusaha WHERE PekanUsahaID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data[0].PekanUsahaFile != "") {
            if (req.files.PekanUsahaFile) {
              const pekanusahafile = data[0].PekanUsahaFile;
              removeImage(pekanusahafile);
            }
          }
          const qs = "UPDATE pekanusaha SET ? WHERE PekanUsahaID = ?";
          db.query(qs, [newBody, id], (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Pekan usaha berhasil diubah",
                data: data,
              });
            } else {
              reject({
                status: 500,
                message: "Pekann usaha Gagal diubah",
                data: err,
              });
            }
          });
        }
      });
    });
  },
  getByIdPekanusaha: (id) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT * FROM pekanusaha WHERE PekanUsahaID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Pekan Usaha Found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "Data Not Found",
              data: err,
            });
          }
        } else {
          reject({
            status: 500,
            message: "Internal Server Error",
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
