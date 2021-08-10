const businessModel = require("../models/business");

module.exports = {
  postBusiness: (req, res) => {
    businessModel
      .postBusiness(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getAllBusiness: (req, res) => {
    businessModel
      .getAllBusiness()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getBusinessById: (req, res) => {
    businessModel
      .getBusinessById(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteBusiness: (req, res) => {
    businessModel
      .deleteBusiness(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateBusiness: (req, res) => {
    businessModel
      .updateBusiness(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
