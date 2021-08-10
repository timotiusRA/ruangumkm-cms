const eventtagModel = require("../models/eventtag");

module.exports = {
  addEventtag: (req, res) => {
    const { body } = req;
    eventtagModel
      .addEventtag(body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getEventtag: (req, res) => {
    eventtagModel
      .getEventtag()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateEventtag: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    eventtagModel
      .updateEventtag(body, id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteEventtag: (req, res) => {
    const { id } = req.params;
    eventtagModel
      .deleteEventtag(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getEventTagById: (req, res) => {
    const { id } = req.params;
    eventtagModel
      .getEventTagById(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
