const organizerModel = require("../models/organizer");

module.exports = {
  createOrganizer: (req, res) => {
    const { body } = req;
    const imgLogo = JSON.stringify(req.files.OrganizerLogo.map((e) => `/images/organizerlogo/${e.filename}`));
    const imgCover = JSON.stringify(req.files.OrganizerCover.map((e) => `/images/organizerCover/${e.filename}`));

    const newBody = {
      ...body,
      OrganizerLogo: JSON.parse(imgLogo)[0],
      OrganizerCover: JSON.parse(imgCover)[0],
      OrganizerCreatedAt: new Date(Date.now()),
      OrganizerModifiedAt: new Date(Date.now()),
    };

    console.log("Data yang di upload", newBody);
    organizerModel
      .createOrganizer(newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getOrganizer: (req, res) => {
    organizerModel
      .getOrganizer()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateOrganizer: (req, res) => {
    organizerModel
      .updateOrganizer(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteOrganizer: (req, res) => {
    organizerModel
      .deleteOrganizer(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
