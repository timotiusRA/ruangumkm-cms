const pekanusahaModel = require("../models/pekanusaha");

module.exports = {
  postPekanusaha: (req, res) => {
    pekanusahaModel
      .postPekanusaha(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getPekanusaha: (req, res) => {
    pekanusahaModel
      .getPekanusaha()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deletePekanusaha: (req, res) => {
    const { id } = req.params;
    pekanusahaModel
      .deletePekanusaha(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updatePekanusaha: (req, res) => {
    pekanusahaModel
      .updatePekanusaha(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getByIdPekanusaha: (req, res) => {
    const { id } = req.params;
    pekanusahaModel
      .getByIdPekanusaha(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
