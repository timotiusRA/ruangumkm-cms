const tiketModel = require("../models/tiket");

module.exports = {
  addTiket: (req, res) => {
    const { body } = req;
    const newBody = {
      ...body,
      TicketCreatedAt: new Date(Date.now()),
      TicketModifiedAt: new Date(Date.now()),
    };
    tiketModel
      .addTiket(newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getTiket: (req, res) => {
    tiketModel
      .getTiket()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateTiket: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const newBody = {
      ...body,
      TicketModifiedAt: new Date(Date.now()),
    };
    tiketModel
      .updateTiket(newBody, id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(err);
      });
  },
  deleteTiket: (req, res) => {
    const { id } = req.params;
    tiketModel
      .deleteTiket(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
