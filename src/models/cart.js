const db = require("../configs/mySQL");

module.exports = {
  addCart: (body, id) => {
    const eventId = body.EventID;
    return new Promise((resolve, reject) => {
      const qs = "SELECT EventID FROM carts_items WHERE EventID = ?";
      db.query(qs, eventId, (err, data) => {
        if (!err) {
          if (data.length < 1) {
            const qs = "INSERT INTO carts SET ?";
            db.query(qs, id, (err, data) => {
              if (!err) {
                const newBody = {
                  ...body,
                  CartID: data.insertId,
                };
                const qs = "INSERT INTO carts_items SET ?";
                db.query(qs, newBody, (err, data) => {
                  if (!err) {
                    resolve({
                      status: 200,
                      message: "Event berhasil dimasukkan kedalam cart",
                      data: data,
                    });
                  } else {
                    reject({
                      status: 500,
                      message: "Gagal memasukkan event kedalam cart",
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
          } else {
            reject({
              status: 500,
              message: "Event sudah masuk kedalam Cart",
              data: err,
            });
          }
        } else {
          rejeect({
            status: 500,
            message: "Server Error",
            data: err,
          });
        }
      });
    });
  },
  deleteCart: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "DELETE FROM carts WHERE CartID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          const qs = "DELETE FROM carts_items WHERE CartID = ?";
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
                message: "Cart gagal dihapus",
                data: data,
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

  getCart: (idUser) => {},

  getCartById: (id) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT a.EventID, a.EventTitle, a.EventBanner, b.CategoryTitle, a.EventDate, f.TicketStartDate, f.TicketEndDate
      from events AS a  
          INNER JOIN categories as b ON a.EventCategoryID = b.CategoryID 
          INNER JOIN carts_items as g ON a.EventID = g.EventID
          INNER JOIN tickets as f on a.EventID = f.EventID
          INNER JOIN carts as h  ON  g.CartID = h.CartID
          
          WHERE h.UserID = ?`;
      db.query(qs, id, (err, data) => {
        if (!err) {
          if (data.length > 0) {
            resolve({
              status: 200,
              message: "cart found",
              data: data,
            });
          } else {
            reject({
              status: 500,
              message: "cart not found",
              data: err,
            });
          }
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
