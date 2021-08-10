const eventModel = require("../models/event");

module.exports = {
  addEvent: (req, res) => {
    const { body } = req;
    const imgBanner = JSON.stringify(req.files.EventBanner.map((e) => `/images/EventBanner/${e.filename}`));

    const newBody = {
      ...body,
      EventBanner: JSON.parse(imgBanner)[0],
      EventCreatedAt: new Date(Date.now()),
      EventPublishedAt: new Date(Date.now()),
      EventModifiedAt: new Date(Date.now()),
    };
    eventModel
      .addEvent(newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getEvent: (req, res) => {
    eventModel
      .getEvent()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getAllEvent: (req, res) => {
    eventModel
      .getAllEvent(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateEvent: (req, res) => {
    eventModel
      .updateEvent(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteEvent: (req, res) => {
    const { id } = req.params;
    eventModel
      .deleteEvent(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getEventByIdUser: (req, res) => {
    const id = req.decodedToken.UserID;
    eventModel
      .getEventByIdUser(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getEventById: (req, res) => {
    const { id } = req.params;
    eventModel
      .getEventById(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
