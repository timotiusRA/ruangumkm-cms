const db = require("../configs/mySQL");
const fs = require("fs");
module.exports = {
  addEvent: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = "INSERT INTO events SET ?";
      db.query(qs, newBody, (err, data) => {
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
  getEvent: () => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT a.EventID, a.EventTitle, a.EventBanner,a.EventCompany, b.CategoryTitle, a.EventDate
      from events AS a 
      INNER JOIN categories as b ON a.EventCategoryID = b.CategoryID`;
      db.query(qs, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: `Events found ${data.length}`,
              data: data,
            });
          } else {
            reject({
              status: 204,
              message: "Event not found",
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
  getAllEvent: (req) => {
    return new Promise((resolve, reject) => {
      const { query } = req;
      const limit = Number(query.lim) || 15;
      let qs = `SELECT a.EventID, a.EventTitle, a.EventBanner,a.EventCompany, b.CategoryTitle, a.EventDate
      from events AS a 
      INNER JOIN categories as b ON a.EventCategoryID = b.CategoryID`;
      if (query.lim != null) {
        qs += " LIMIT ?";
      }
      db.query(qs, limit, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "Event found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "event is empty",
              data: err,
            });
          }
        } else {
          reject({
            status: 500,
            message: " Server Error",
            data: err,
          });
        }
      });
    });
  },
  updateEvent: (req) => {
    const { id } = req.params;
    const { body } = req;

    let newBody;
    if (req.files.EventBanner) {
      const imgBanner = JSON.stringify(req.files.EventBanner.map((e) => `/images/EventBanner/${e.filename}`));
      newBody = {
        ...body,
        EventBanner: JSON.parse(imgBanner),
        EventModifiedAt: new Date(Date.now()),
      };
    } else {
      newBody = {
        ...body,
        EventModifiedAt: new Date(Date.now()),
      };
    }
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM events WHERE EventID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data[0].EventBanner != "") {
            if (req.files.EventBanner) {
              const imgBanner = data[0].EventBanner;
              removeImage(imgBanner);
            }
          }

          const qs = "UPDATE events SET ? WHERE EventID =  ? ";
          db.query(qs, [newBody, id], (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Event Berhasil Diupdate",
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
            status: 200,
            message: "Server error",
            data: err,
          });
        }
      });
    });
  },
  deleteEvent: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM events WHERE EventID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          const imgBanner = data[0].EventBanner;
          console.log(imgBanner);
          removeImage(imgBanner);
          const qs = "DELETE FROM events WHERE EventID = ?";
          db.query(qs, id, (err, data) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Event berhasil dihapus",
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
        }
      });
    });
  },
  getEventById: (id) => {
    console.log("ini ada di model", id);
    return new Promise((resolve, reject) => {
      let qs = `SELECT a.EventID, a.EventTitle, a.EventBanner,a.EventCompany, b.CategoryTitle, a.EventDate
          from events AS a  
              INNER JOIN categories as b ON a.EventCategoryID = b.CategoryID 
              INNER JOIN organizers as c ON a.OrganizerID = c.OrganizerID
              INNER JOIN tickets as d ON a.EventID = d.EventID
              WHERE a.EventID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          let qs = `SELECT a.TagID, b.TagTitle FROM events_tags as a INNER JOIN tags as b on a.TagID = b.TagID WHERE a.EventID = ?`;
          db.query(qs, id, (err, res) => {
            if (!err) {
              resolve({
                status: 200,
                message: "Event detail found",
                data: {
                  data,
                  tag: res,
                },
              });
            } else {
              reject({
                status: 500,
                message: "Query Error",
                data: err,
              });
            }
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
};

const removeImage = (filepath) => {
  fs.unlink(`./public${filepath}`, (err) => console.log(err));
};
