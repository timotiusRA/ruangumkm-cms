const eventorderModel = require("../models/eventorder");

module.exports = {
  addeventorder: (req, res) => {
    const idUser = req.decodedToken.UserID;
    const id = {
      UserID: idUser,
    };
    const { body } = req;
    const newBody = {
      ...body,
      OrderStatus: 1,
    };
    eventorderModel
      .addeventorder(newBody, id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteeventorder: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const newBody = {
      ...body,
      OrderStatus: 0,
    };

    eventorderModel
      .deleteeventorder(id, newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  geteventorder: (req, res) => {
    const id = req.decodedToken.UserID;
    const { query } = req;
    eventorderModel
      .geteventorder(id, query)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
