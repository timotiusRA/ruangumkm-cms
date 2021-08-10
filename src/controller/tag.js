const tagModel = require("../models/tag");

module.exports = {
  addTag: (req, res) => {
    const { body } = req;
    const newBody = {
      ...body,
      TagCreatedAt: new Date(Date.now()),
      TagModifiedAt: new Date(Date.now()),
    };
    tagModel
      .addTag(newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getAllTag: (req, res) => {
    tagModel
      .getAllTag()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateTag: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updateBody = {
      ...body,
      TagModifiedAt: new Date(Date.now()),
    };
    tagModel
      .updateTag(id, updateBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deletetag: (req, res) => {
    const { id } = req.params;
    tagModel
      .deletetag(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
