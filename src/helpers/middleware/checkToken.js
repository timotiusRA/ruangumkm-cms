const jwt = require("jsonwebtoken");
const db = require("../../configs/mySQL");
const form = require("../form");

module.exports = {
  isRegistered: (req, res, next) => {
    const { UserEmail, UserName } = req.body;
    new Promise((resolve, reject) => {
      const qs = `SELECT UserEmail FROM users WHERE UserEmail = ? `;
      db.query(qs, UserEmail, (err, data) => {
        if (!err) {
          if (!data[0]) {
            const qs = `SELECT UserName FROM users WHERE Username = ?`;
            db.query(qs, UserName, (err, data) => {
              if (!err) {
                if (!data[0]) {
                  resolve({
                    status: 200,
                    msg: `success`,
                    detail: data,
                  });
                } else {
                  reject({
                    status: 500,
                    msg: `Username telah digunakan!`,
                    details: err,
                  });
                }
              }
            });
          } else {
            reject({
              status: 500,
              msg: `email telah digunakan!`,
              details: err,
            });
          }
        } else {
          reject({
            msg: `SQLquery ERROR!`,
            details: err,
          });
        }
      });
    })
      .then((result) => {
        next();
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  login: (req, res, next) => {
    const bearerToken = req.header("x-access-token");

    //jika tidak ada bearer token
    if (!bearerToken) {
      form.error(res, {
        msg: "PLease Login First",
        status: 401,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.decodedToken = decodedToken;
      next();
    }
  },
};
