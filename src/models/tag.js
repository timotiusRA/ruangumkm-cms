const db = require("../configs/mySQL");

module.exports = {
  addTag: (body) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO tags set ?";
      db.query(qs, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Success Create Tag",
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
  getAllTag: () => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM tags";
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: `Tag found ${data.length}`,
              data: data,
            });
          } else {
            reject({
              status: 400,
              message: "Tag Not Found",
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
  updateTag: (id, updateBody) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE tags SET ? WHERE TagID = ?";
      db.query(qs, [updateBody, id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Tag Berhasil Diupdate",
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
  deletetag: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "DELETE FROM tags WHERE TagID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Tag Berhasil Dihapus",
            data: data,
          });
        } else {
          reject({
            status: 500,
            message: "Server Error",
            detail: err,
          });
        }
      });
    });
  },
};
