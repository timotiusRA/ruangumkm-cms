const eventUsahaModel = require("../models/eventpekanusaha");

module.exports = {
  postEventUsaha: (req, res) => {
    const { body } = req;
    eventUsahaModel
      .postEventUsaha()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getEventUsaha: (req, res) => {},
  putEventUsaha: (req, res) => {},
  deleteEventUsaha: (req, res) => {},
};
