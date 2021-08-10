const db = require("../configs/mySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      // console.log(body);
      const saltRound = Math.floor(Math.random() * 10 + 1);
      //Hashing Password
      bcrypt.hash(body.UserPassword, saltRound, (err, hashedPassword) => {
        const newUser = { ...body, UserPassword: hashedPassword };

        const qs = "INSERT INTO users SET ?";
        db.query(qs, newUser, (err, data) => {
          if (!err) {
            resolve({
              status: 200,
              message: "Registrasi Berhasil",
              details: data,
            });
          } else {
            reject({
              status: 500,
              message: `Internal Server Error`,
              details: err,
            });
          }
        });
      });
    });
  },
  login: (body) => {
    console.log(body);
    return new Promise((resolve, reject) => {
      const { UserEmail, UserPassword } = body;
      const qs = "SELECT UserID, UserName,  UserEmail, UserPassword from users WHERE UserEmail =?";
      db.query(qs, UserEmail, (err, data) => {
        if (err) {
          reject({
            status: 500,
            message: "Error SQL",
          });
        }
        if (!data[0]) {
          reject({
            status: 404,
            message: "User Not Found",
          });
        } else {
          bcrypt.compare(UserPassword, data[0].UserPassword, (err, result) => {
            if (err) {
              reject({
                status: 500,
                message: "Hash Error",
                details: err,
              });
            }
            if (!result) {
              reject({
                status: 401,
                message: "Wrong Password",
              });
            } else {
              const payload = {
                UserID: data[0].UserID,
                UserName: data[0].UserName,
                UserEmail,
                RoleID: data[0].RoleID,
              };
              const secret = process.env.SECRET_KEY;
              const token = jwt.sign(payload, secret);
              resolve({
                UserID: data[0].UserID,
                UserName: data[0].UserName,
                UserEmail: data[0].UserEmail,
                token,
              });
            }
          });
        }
      });
    });
  },
  updateUser: (id, newBody) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE users SET ? WHERE UserID = ?";
      db.query(qs, [newBody, id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Update Users berhasil",
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
