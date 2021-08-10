const db = require("../configs/mySQL");

module.exports = {
  addEventtag: (body) => {
    return new Promise((resolve, reject) => {
      const queryTagID = JSON.parse(body.TagID);
      // console.log(queryTagID);
      for (let i = 0; i < queryTagID.length; i++) {
        console.log(queryTagID[i]);
        const newBody = {
          EventID: body.EventID,
          TagID: queryTagID[i],
        };
        const qs = "INSERT INTO events_tags SET ?";
        db.query(qs, newBody, (err, data) => {
          if (!err) {
            resolve({
              status: 200,
              message: "Create Events Tags Berhasil",
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
      }
    });
  },
  getEventtag: () => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM events_tags";
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: `Events tags found ${data.length}`,
              data: data,
            });
          } else {
            reject({
              status: 204,
              message: "Events Tags is Empty",
              data: err,
            });
          }
        } else {
          reject({
            status: 500,
            message: "Internal Server error",
            data: err,
          });
        }
      });
    });
  },
  updateEventtag: (body, id) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE events_tags SET ? WHERE ID = ?";
      db.query(qs, [body, id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Events Tags berhasil diupdate",
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
  deleteEventtag: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "DELETE FROM events_tags WHERE ID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Delete Event tag Sukses",
            data: data,
          });
        } else {
          reject({
            status: 500,
            message: "Internal Server error",
            data: err,
          });
        }
      });
    });
  },
  getEventTagById: (id) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT a.TagID, a.TagTitle FROM tags AS a INNER JOIN events_tags as b ON a.TagID = b.TagID WHERE b.EventID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Tags Event found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "tag not found",
              data: err,
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
};
