const db = require("../configs/mySQL");

module.exports = {
  addCategories: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO categories SET ?";
      db.query(qs, newBody, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Categories Berhasil Ditambahkan",
            data: data,
          });
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
  getCategories: () => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM categories";
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: `categories founds ${data.length}`,
              data: data,
            });
          } else {
            reject({
              status: 204,
              message: "categories is empty",
              data: data,
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
  updateCategories: (newBody, id) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE categories SET ? WHERE CategoryID = ?";
      db.query(qs, [newBody, id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "udpate categories success",
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
  deleteCategories: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "DELETE FROM categories WHERE CategoryID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Delete categories sukese",
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
