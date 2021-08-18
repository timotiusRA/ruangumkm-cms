const pekanrayaModel = require("../models/pekanraya");

module.exports = {
  postPekanraya: (req, res) => {
    pekanrayaModel
      .postPekanraya(req)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
  getPekanraya: (req, res) => {},
  updatePekanraya: (req, res) => {},
  deletePekanraya: (req, res) => {},
};
