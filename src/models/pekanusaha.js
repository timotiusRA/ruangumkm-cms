const db = require("../configs/mySQL");

module.exports = {
  postPekanusaha: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = `INSERT INTO pekanusaha SET ? `;
      db.query(qs, newBody, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Berhasil menambahkan ke pekanusaha",
            data: data,
          });
        } else {
          reject({
            status: 500,
            message: "Gagal menambahkan data ke pekan usaha",
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
    });
  },
  updatePekanusaha: (id, newBody) => {
    return new Promise((resolve, reject) => {
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
