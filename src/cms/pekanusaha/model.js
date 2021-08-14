const db = require("../../configs/mySQL");

module.exports = {
  getAlllData: (limit, offset, keywords, sort) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pekanusaha WHERE PekanUsahaMemberNIK1 LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [keywords, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getDataCount: (keywords) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM pekanusaha WHERE PekanUsahaMemberNIK1 LIKE ?",
        keywords,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },

  getBusinessById: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM business WHERE BusinessID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
