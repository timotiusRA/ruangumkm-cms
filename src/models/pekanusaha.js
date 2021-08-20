const db = require("../configs/mySQL");
const nodemailer = require("nodemailer");
module.exports = {
  postPekanusaha: (req) => {
    const id = req.decodedToken.UserID;
    const userEmail = req.decodedToken.UserEmail;
    const userName = req.decodedToken.UserName;
    const { body } = req;
    let informasiUsaha;
    const file = JSON.stringify(req.files.PekanUsahaFile.map((e) => `files/pekanUsahaFile/${e.filename}`));
    if (req.files.BusinessKTPFile && req.files.BusinessNPWPFile) {
      const imgKTP = JSON.stringify(req.files.BusinessKTPFile.map((e) => `images/businessKtpFile/${e.filename}`));
      const imgNPWP = JSON.stringify(req.files.BusinessNPWPFile.map((e) => `images/businessNPWPFile/${e.filename}`));
      informasiUsaha = {
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
    } else {
      informasiUsaha = {
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
    }

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
                  let transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      user: process.env.USER_EMAIL,
                      pass: process.env.PASS_EMAIL,
                    },
                  });
                  let emailActivation = {
                    from: "Ruang UMKM <noreply.fachrighiffary@ruangalternative.com>",
                    replyTo: "noreply.fachrighiffary@ruangalternative.com",
                    to: userEmail,
                    subject: "Ruang UMKM PekanUsaha",
                    html: `
                    <center>
                    <h2 style={{color: 'purple'}}> Hello, ${userName} </h2>
                    <h3>Terimakasih telah mendaftar pekan usaha, semua data kamu sudah kami terima dan akan kami proses. </h3>
                    <br></br>
                    </center>
                    `,
                  };
                  transporter.sendMail(emailActivation, (err, data) => {
                    if (err) {
                      console.log("its error: ", err);
                    } else {
                      console.log(`Sent to ${UserEmail} Success!!!`);
                      resolve({
                        status: 200,
                        message: "Email berhasil dikirim",
                      });
                    }
                  });
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
  getByRegPekanusaha: (req) => {
    const id = req.decodedToken.UserID;
    return new Promise((resolve, reject) => {
      const qs = `SELECT * FROM business as a INNER join pekanusaha as b on a.BusinessID = b.BusinessID where b.PekanUsahaCreatedBy = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Pekan usaha found",
              data: data,
            });
          } else {
            reject({
              status: 200,
              message: "Pekan usaha not found",
              data: err,
            });
          }
        } else {
          reject({
            status: 200,
            message: "Internal server error",
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
