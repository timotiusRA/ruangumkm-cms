const businessmatchModel = require("../models/businessmatching");

module.exports = {
  postBusinessMatch: (req, res) => {
    const { body } = req;
    const idUser = req.decodedToken.UserID;
    const imgBaner = JSON.stringify(req.files.BusinessMatchBanner.map((e) => `/images/businessMatchBanner/${e.filename}`));
    const newBody = {
      ...body,
      BusinessMatchBanner: JSON.parse(imgBaner)[0],
      BusinessMatchCreatedAt: new Date(Date.now()),
      BusinessMatchCreatedBy: idUser,
      BusinessMatchModifiedAt: new Date(Date.now()),
      status: 1,
    };

    businessmatchModel
      .postBusinessMatch(newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getBusinessMatch: (req, res) => {
    businessmatchModel
      .getBusinessMatch()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateBusinessMatch: (req, res) => {
    businessmatchModel
      .updateBusinessMatch(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteBusinessMatch: (req, res) => {
    businessmatchModel
      .deleteBusinessMatch(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getBusinessMatchJoin: (req, res) => {
    const idUser = req.decodedToken.UserID;
    businessmatchModel
      .getBusinessMatchJoin(idUser)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getBusinessMatchById: (req, res) => {
    businessmatchModel
      .getBusinessMatchById(req)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};
