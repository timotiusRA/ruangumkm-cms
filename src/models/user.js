const db = require("../configs/mySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      const saltRound = Math.floor(Math.random() * 10 + 1);
      //Hashing Password
      bcrypt.hash(body.UserPassword, saltRound, (err, hashedPassword) => {
        const newUser = { ...body, UserPassword: hashedPassword };
        const qs = "INSERT INTO users SET ?";
        db.query(qs, newUser, (err, data) => {
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
              to: body.UserEmail,
              subject: "Activation Email",
              html: `
              <center>
              <h1> Activation Link Ruang UMKM Team </h1>
              <h2> Hello, ${body.UserName} </h2>
              <h3>Click link dibawah ini untuk aktivasi email anda</h3>
              <br></br>
              <a href="${process.env.DASHBOARD_URL}/suksesRegister/activation">Aktivasi akun<a>
              <p> Use it to Activate Account </p>
              </center>
              `,
            };
            transporter.sendMail(emailActivation, (err, data) => {
              if (err) {
                console.log("its error: ", err);
              } else {
                console.log(`Sent to ${body.UserEmail} Success!!!`);
                resolve({
                  status: 200,
                  message: "Email Aktivasi berhasil dikirim",
                });
              }
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
    return new Promise((resolve, reject) => {
      const { UserEmail, UserPassword } = body;
      const qs = "SELECT UserID, UserName, UserEmail, UserPassword, UserEmailVerified from users WHERE UserEmail =?";
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
          if (data[0].UserEmailVerified === 0) {
            reject({
              status: 200,
              message: "Akun anda belum diaktivasi, Periksa Email anda !",
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

  activationUser: (UserEmail) => {
    const statusUser = {
      UserEmailVerified: 1,
    };
    return new Promise((resolve, reject) => {
      const qs = "SELECT 	UserEmailVerified FROM users WHERE UserEmail = ?";
      db.query(qs, UserEmail, (err, result) => {
        if (!err) {
          if (result[0].UserEmailVerified === 1) {
            resolve({
              status: 500,
              message: "Akun anda sudah diaktivasi",
            });
          } else {
            const qs = "SELECT UserName, UserEmail from users WHERE UserEmail = ?";
            db.query(qs, UserEmail, (err, data) => {
              if (!err) {
                if (data.length > 0) {
                  const qs = "UPDATE users SET ? WHERE UserEmail = ?";
                  db.query(qs, [statusUser, UserEmail], (err, res) => {
                    if (!err) {
                      let transporter = nodemailer.createTransport({
                        service: "gmail",
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: true,
                        auth: {
                          user: process.env.USER_EMAIL,
                          pass: process.env.PASS_EMAIL,
                        },
                      });
                      let emailActivation = {
                        from: "Ruang UMKM <ruangumkm@mmail.com>",
                        to: UserEmail,
                        subject: "Activation RuangUMKM",
                        html: `
                        <center>
                        <h1> Activation from RuangUMKM Team </h1>
                        <h2> Halo, ${data[0].UserName} </h2>
                        <h3>Selamat Akun anda berhasil diaktivasi</h3>
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
                            message: "Email Aktivasi berhasil dikirim",
                          });
                        }
                      });
                      resolve({
                        status: 200,
                        message: "Akun Berhasil diaktivasi",
                      });
                    } else {
                      reject({
                        status: 500,
                        message: "Akun gagal diaktivasi",
                        data: err,
                      });
                    }
                  });
                } else {
                  reject({
                    status: 500,
                    message: "Internal server error",
                    data: err,
                  });
                }
              } else {
                reject({
                  status: 500,
                  message: "Internal serverError",
                  data: err,
                });
              }
            });
          }
        }
      });
    });
  },

  resetPassword: (newBody) => {
    return new Promise((resolve, reject) => {
      const saltRounds = Math.floor(Math.random() * 10 + 1);
      bcrypt.hash(newBody.UserPassword, saltRounds, (err, hashedPassword) => {
        if (!err) {
          const newPassword = {
            ...newBody,
            StatusResetPassword: 0,
            UserPassword: hashedPassword,
          };
          const email = newBody.UserEmail;
          const qs = `UPDATE users SET ? WHERE UserEmail = ?`;
          db.query(qs, [newPassword, email], (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Password Berhasil dirubah",
              });
            } else {
              reject({
                status: 500,
                message: "Internal server Error",
                data: err,
              });
            }
          });
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

  linkResetPassword: (UserEmail) => {
    const statusReset = {
      StatusResetPassword: 1,
    };
    return new Promise((resolve, reject) => {
      const qs = "SELECT StatusResetPassword, UserName FROM users WHERE UserEmail = ?";
      db.query(qs, UserEmail, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            if (data[0].StatusResetPassword === 1) {
              reject({
                status: 500,
                message: "Link Reset Password Sudah dikirim ke email anda, Silahkan periksa kembali email anda",
              });
            } else {
              const qs = "UPDATE users SET ? Where UserEmail = ?";
              db.query(qs, [statusReset, UserEmail], (err, response) => {
                if (!err) {
                  let transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: true,
                    auth: {
                      user: process.env.USER_EMAIL,
                      pass: process.env.PASS_EMAIL,
                    },
                  });
                  let emailActivation = {
                    from: "Ruang UMKM <ruangumkm@mmail.com>",
                    to: UserEmail,
                    subject: "Reset Password RuangUMKM",
                    html: `
                    <center>
                    <h1> Reset Password from RuangUMKM Team </h1>
                    <h2> Halo, ${data[0].UserName} </h2>
                    <h3>Click link dibawah ini untuk reset password akun anda</h3>
                    <a href="${process.env.RESET_URL}">RESET PASSWORD</a>
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
                        message: "Email Reset Password berhasil dikirim",
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
            }
          } else {
            reject({
              status: 500,
              message: "internal server error",
              data: err,
            });
          }
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

  getUserById: (idUser) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT * FROM users WHERE UserID = ?`;
      db.query(qs, idUser, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Users Found",
            data: data,
          });
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
};
