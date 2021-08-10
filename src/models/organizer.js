const db = require("../configs/mySQL");
const path = require("path");
const fs = require("fs");

module.exports = {
  createOrganizer: (body) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO organizers SET ?";
      db.query(qs, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Create Organizer Sukses",
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
  getOrganizer: () => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM organizers";
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: `organizer found ${data.length}`,
              data: data,
            });
          } else {
            reject({
              status: 204,
              message: "organizer not found",
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
  updateOrganizer: (req) => {
    const { id } = req.params;
    const { body } = req;

    let newBody;

    if (req.files.OrganizerLogo || req.files.OrganizerCover) {
      const imgLogo = JSON.stringify(req.files.OrganizerLogo.map((e) => `/images/organizerlogo/${e.filename}`));
      const imgCover = JSON.stringify(req.files.OrganizerCover.map((e) => `/images/organizerCover/${e.filename}`));
      newBody = {
        ...body,
        OrganizerLogo: JSON.parse(imgLogo)[0],
        OrganizerCover: JSON.parse(imgCover)[0],
        OrganizerModifiedAt: new Date(Date.now()),
      };
    } else {
      newBody = {
        ...body,
        OrganizerModifiedAt: new Date(Date.now()),
      };
    }
    return new Promise((resolve, reject) => {
      const qs = "SELECT * from organizers WHERE OrganizerID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          const imgLogo = data[0].OrganizerLogo;
          const imgCover = data[0].OrganizerCover;
          if (req.files.OrganizerLogo && req.files.OrganizerCover) {
            removeImage(imgLogo);
            removeImage(imgCover);
          } else if (req.files.OrganizerLogo) {
            removeImage(imgLogo);
          } else if (req.files.OrganizerCover) {
            removeImage(imgCover);
          }

          const qs = "UPDATE organizers SET ? WHERE OrganizerID = ?";
          db.query(qs, [newBody, id], (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Organizer berhasil diupdate",
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
  deleteOrganizer: (req) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      const qs = "SELECT * from organizers WHERE OrganizerID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          const imgLogo = data[0].OrganizerLogo;
          const imgCover = data[0].OrganizerCover;
          removeImage(imgLogo);
          removeImage(imgCover);
          const qs = "DELETE FROM organizers WHERE OrganizerID = ?";
          db.query(qs, id, (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Organizer Berhasil Dihapus",
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
        } else {
          reject({
            status: 500,
            message: "Server Error",
          });
        }
      });
    });
  },
};

const removeImage = (filepath) => {
  fs.unlink(`./public${filepath}`, (err) => console.log(err));
};
