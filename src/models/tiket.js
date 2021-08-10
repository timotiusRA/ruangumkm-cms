const db = require("../configs/mySQL");

module.exports = {
  addTiket: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO tickets SET ?";
      db.query(qs, newBody, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Create Tikets Sukses",
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
  getTiket: () => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM tickets";
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: `Tikets found ${data.length}`,
              data,
            });
          } else {
            reject({
              status: 204,
              message: "Tikets not found",
              data: err,
            });
          }
        } else {
          reject({
            status: 500,
            message: "Server Errror",
            data: err,
          });
        }
      });
    });
  },
  updateTiket: (newBody, id) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE tickets SET ? WHERE TicketID = ?";
      db.query(qs, [newBody, id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Tiket Berhasil Diupdate",
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
  deleteTiket: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "DELETE FROM tickets WHERE TicketID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Tikets berhasil dihapus",
            data: data,
          });
        } else {
          reject({
            status: 500,
            message: "Server error",
            data: err,
          });
        }
      });
    });
  },
};
