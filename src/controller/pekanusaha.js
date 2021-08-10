const pekanusahaModel = require("../models/pekanusaha");

module.exports = {
  postPekanusaha: (req, res) => {
    const id = req.decodedToken.UserID;
    const { body } = req;
    const newBody = {
      ...body,
      PekanUsahaCreatedAt: new Date(Date.now()),
      PekanUsahaCreatedBy: id,
      PekanUsahaModifiedAt: new Date(Date.now()),
      PekanUsahaStatus: 1,
    };
    pekanusahaModel
      .postPekanusaha(newBody)
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
    const idUser = req.decodedToken.UserID;
    const { id } = req.params;
    const { body } = req;
    const newBody = {
      ...body,
      PekanUsahaModifiedAt: new Date(Date.now()),
      PekanUsahaModifiedBy: idUser,
    };
    pekanusahaModel
      .updatePekanusaha(id, newBody)
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
