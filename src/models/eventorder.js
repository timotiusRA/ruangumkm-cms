const db = require("../configs/mySQL");

module.exports = {
  addeventorder: (newBody, id) => {
    console.log("INI ADA DI MODEL", id);
    const eventId = newBody.EventID;
    return new Promise((resolve, reject) => {
      const qs = "SELECT b.EventID, a.UserID FROM  events_orders as a INNER JOIN events_orders_items as b ON a.OrdersID = b.OrderID  WHERE EventID = ? AND UserID = ?";
      db.query(qs, [eventId, id.UserID], (err, data) => {
        if (!err) {
          if (data.length < 1) {
            const qs = "INSERT INTO events_orders SET ?";
            db.query(qs, id, (err, data) => {
              if (!err) {
                const Body = {
                  ...newBody,
                  OrderID: data.insertId,
                };
                const qs = "INSERT INTO events_orders_items SET ?";
                db.query(qs, Body, (err, data) => {
                  if (!err) {
                    const qs = `SELECT * FROM carts_items WHERE EventID = ? `;
                    db.query(qs, eventId, (err, res) => {
                      if (!err) {
                        if (res.length > 0) {
                          const id = res[0].CartID;
                          const qs = "DELETE FROM carts WHERE CartID = ? ";
                          db.query(qs, id, (err, data) => {
                            if (!err) {
                              const qs = `DELETE FROM carts_items WHERE CartID = ?`;
                              db.query(qs, id, (err, data) => {
                                if (!err) {
                                  resolve({
                                    status: 200,
                                    message: "Order Berhasil",
                                    data: data,
                                  });
                                } else {
                                  reject({
                                    status: 500,
                                    message: "gagal order event",
                                    data: err,
                                  });
                                }
                              });
                            } else {
                              reject({
                                status: 500,
                                message: "gagal order event",
                                data: err,
                              });
                            }
                          });
                        } else {
                          resolve({
                            status: 200,
                            message: "Order Berhasil",
                            data: data,
                          });
                        }
                      } else {
                        reject({
                          status: 500,
                          message: "gagal order event",
                          data: err,
                        });
                      }
                    });
                  } else {
                    reject({
                      status: 500,
                      message: "gagal order event",
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
          } else {
            reject({
              status: 500,
              message: "Anda sudah melakukan Order event ini",
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

  geteventorder: (id, query) => {
    return new Promise((resolve, reject) => {
      const limit = Number(query.lim) || 15;

      let qs = `SELECT a.EventID, a.EventTitle, a.EventBanner, b.CategoryTitle, a.EventDate,c.TicketStartDate, c.TicketEndDate
      from events AS a 
          INNER JOIN categories as b ON a.EventCategoryID = b.CategoryID
          INNER JOIN tickets as c ON a.EventID = c.EventID
          INNER JOIN events_orders_items as g ON a.EventID = g.EventID
          INNER JOIN events_orders as h  ON  g.OrderID = h.OrdersID
          WHERE h.UserID = ?`;
      if (query.lim != null) {
        qs += " LIMIT ?";
      }
      db.query(qs, [id, limit], (err, data) => {
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

  deleteeventorder: (newBody, id) => {
    return new Promise((resolve, reject) => {
      const qs = `UPDATE events_orders_items SET ? WHERE EventID = ?`;
      db.query(qs, [newBody, id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: "Event Order Berhasil dihapus",
            data: data,
          });
        } else {
          reject({
            status: 500,
            message: "Internal server Error",
            data: err,
          });
        }
      });
    });
  },
};
